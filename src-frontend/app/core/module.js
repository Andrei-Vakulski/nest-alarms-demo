/* global angular */

(function() {
  'use strict';

  angular
    .module('demo.core', [
      'demo.layout',
      'demo.properties',
      'demo.login',
      'demo.services'
    ])
    .run(run)
    .config(config);

  function run() {

  }

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/properties');
  }

})();