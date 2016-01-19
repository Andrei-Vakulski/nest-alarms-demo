/* global angular */

(function() {
  'use strict';

  angular
    .module('demo.layout')
    .controller('RootCtrl', RootCtrl);

  RootCtrl.$inject = ['$state', '$scope', 'Auth', '$firebase'];

  function RootCtrl($state, $scope, Auth, $firebase) {
    var firebase;

    angular.extend($scope, {
      isAuthenticated: Auth.isAuthenticated()
    });

    if ($scope.isAuthenticated) {
      firebase = $firebase($scope.isAuthenticated);
      firebase.init();
    } else {
      $state.go('root.login');
    }

  }

})();