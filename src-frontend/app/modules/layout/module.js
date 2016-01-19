/* global angular */

(function() {
  'use strict';

  angular
    .module('demo.layout', [])
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('root', {
        url: '',
        abstract: true,
        views: {
          '@': {
            templateUrl: 'modules/layout/template.html',
            controller: 'RootCtrl'
          },
          'header@root': {
            templateUrl: 'modules/layout/components/header/template.html',
          }  
        }
      });
  }

})();