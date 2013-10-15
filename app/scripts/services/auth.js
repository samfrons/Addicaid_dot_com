'use strict';

angular.module('addicaidSiteApp')
  .factory('auth', ['$rootScope', '$resource', '$log', 'UserResource', function($rootScope, $resource, $log, UserResource) {    

    var serviceApi = {
      register: function(user, success, error) {
        console.log(user, " >>>>> ", UserResource);
        UserResource.register(user).$promise
          .then(function(response) {
            var newUser = {
              username: response.username,
              role: response.role,
              id: response.id,
              avatarId: response.avatarId
            };
            changeUser(newUser);
            if (success) success(newUser);
          })
          .catch(function(err) {
            $log.error('bad registration: ', err);
            if (error) error(err);
          });
      }
    };
    return serviceApi;
}]);
