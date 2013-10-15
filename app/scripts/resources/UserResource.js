'use strict';

angular.module('addicaidSiteApp')
  .factory('UserResource', ['$resource', '$log', function($resource, $log) {
    var apiRoot = 'http://127.0.0.1\\:1337/';
    return $resource(
      apiRoot + 'api/:action', {
        action: '@action'
      }, {
        register: {
          method: 'POST',
          params: { action: 'register' }
        },
        login: {
          method: 'POST',
          params: { action: 'login' }
        },
        logout: {
          method: 'GET',
          params: { action: 'logout' }
        },
        checkLogin: {
          method: 'GET',
          params: { action: 'checkLogin' }
        }
      });
  }]);
