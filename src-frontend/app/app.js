/* global angular */

(function() {
  'use strict';

  angular.element(document).ready(onDocumentReady);

  angular
    .module('demo', [
      'ui.router',
      'ngCookies',
      'ngMaterial',
      'demo.core'
    ])
    .run(run)
    .config(config);

  function run($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState) {
      $state.previous = fromState;
    });
  }

  function config($urlRouterProvider, $compileProvider) {
    $compileProvider.debugInfoEnabled(false);
  }

  function onDocumentReady() {
    angular.bootstrap(document, ['demo']);
  }

})();