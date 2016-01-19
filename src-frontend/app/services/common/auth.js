/* global angular */

(function() {
  'use strict';

  angular
    .module('demo.services')
    .factory('Auth', Auth);

  Auth.$inject = ['$cookies', 'CONFIG'];

  function Auth($cookies, CONFIG) {
    var service = {
      isAuthenticated: isAuthenticated,
      isAllowed: isAllowed
    };
    
    return service;

    function isAllowed(e, authRequired) {
      if (!authRequired) {
        return true;
      }

      if (!$cookies.get(CONFIG.AUTH_TOKEN_COOKIE)) {
        e.preventDefault();
      }
    }

    function isAuthenticated() {
      return $cookies.get(CONFIG.AUTH_TOKEN_COOKIE);
    }

  }

})();
