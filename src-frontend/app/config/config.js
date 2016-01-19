/* global angular */

(function() {
  'use strict';

  angular
    .module('demo')
    .constant('CONFIG', {
      AUTH_TOKEN_COOKIE: 'nest_token'
    });

})();
