/* global angular */

(function() {
  'use strict';

  angular
    .module('demo.login', [])
    .config(config);

    function config($stateProvider) {
      $stateProvider
        .state('root.login', {
          url: '/login',
          views: {
            'content': {
              templateUrl: 'modules/login/template.html'
            }
          }
        });
    }

})();