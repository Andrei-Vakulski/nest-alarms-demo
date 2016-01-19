/* global angular, Firebase */

(function() {
  'use strict';

  angular
    .module('demo.services')
    .factory('$firebase', DemoFirebase);

  DemoFirebase.$inject = ['$rootScope', 'Auth'];

  function DemoFirebase($rootScope, Auth) {

    function FB(token) {
      this.token = token;
      this._instance = new Firebase('wss://developer-api.nest.com');
    }

    FB.prototype.init = function() {
      this._instance.auth(this.token);

      this.currentStructure = null;

      this._instance.on('value', this.onValue.bind(this));

      $rootScope.$on('nest.away.change', this.onAwayChange.bind(this));
    };

    FB.prototype.onValue = function(snapshot) {
      var self = this,
          data = snapshot.val(),
          alarms = this.getAlarms(data),
          awayWatcherPath;
      
      if (!this.currentStructure) {
        this.currentStructure = this.firstChild(data.structures);

        awayWatcherPath = 'structures/' + this.currentStructure.structure_id + '/away';

        snapshot.child(awayWatcherPath).ref().on('value', function(state) {
          self.currentStructure.away = state.val();
          $rootScope.$broadcast('nest.structures.away.changed', state.val());
        });
      }

      if (alarms) {
        $rootScope.$broadcast('nest.alarms.changes', alarms);
      }
    };

    FB.prototype.setHome = function() {
      this._instance.child('structures/' + this.currentStructure.structure_id + '/away').set('home');
    };

    FB.prototype.setAway = function() {
      this._instance.child('structures/' + this.currentStructure.structure_id + '/away').set('away');
    };

    FB.prototype.getAlarms = function(data) {
      return data.devices.smoke_co_alarms;
    };

    FB.prototype.onAwayChange = function(event, data) {
      this.currentStructure.away === 'home' ?  this.setAway() : this.setHome(); //jshint ignore:line
    };

    FB.prototype.firstChild = function (object) {
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          return object[key];
        }
      }
    };

    function factory(options) {
      return new FB(options);
    }

    return factory;

  }

})();
