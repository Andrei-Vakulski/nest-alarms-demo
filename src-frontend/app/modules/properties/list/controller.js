/* global angular */

(function() {
  'use strict';

  angular
    .module('demo.properties')
    .controller('PropertiesListCtrl', PropertiesListCtrl);

  PropertiesListCtrl.$inject = ['$rootScope', '$scope'];

  function PropertiesListCtrl($rootScope, $scope) {
    
    angular.extend($scope, {
      alarms: null,
      state: {
        away: null,
        loaded: false,
        homeBool: false
      }
    });

    angular.extend($scope, {
      toggleHome: toggleHome
    });

    $scope.$on('nest.alarms.changes', onAlarmsChanges);
    $scope.$on('nest.structures.away.changed', onAwayChanged);

    function toggleHome() {
      $rootScope.$emit('nest.away.change');
    }

    function onAlarmsChanges(event, alarms) {
      if (!$scope.state.loaded) {
        $scope.state.loaded = true;
      }
      $scope.alarms = alarms;
      $scope.$$phase || $scope.$digest(); // jshint ignore:line
    }

    function onAwayChanged(event, data) {
      $scope.state.homeBool = (data === 'home' ? true : false);
      $scope.state.away = data;
    }

  }

})();