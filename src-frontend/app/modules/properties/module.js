/* global angular */

(function() {
  'use strict';

  angular
    .module('demo.properties', [])
    .config(config);

    function config($stateProvider) {
      $stateProvider
        .state('root.properties', {
          url: '/properties',
          views: {
            'content': {
              templateUrl: 'modules/properties/list/template.html',
              controller: 'PropertiesListCtrl'
            }
          },
          data: {
            authRequired: true
          }
        });
    }

})();