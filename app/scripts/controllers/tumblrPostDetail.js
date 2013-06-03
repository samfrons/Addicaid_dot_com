'use strict';
/* jshint -W106 */

angular.module('addicaidSiteApp')
  .controller('TumblrPostDetailCtrl', ['$scope', '$routeParams', 'tumblrAPI', function($scope, $routeParams, tumblrAPI) {
    $scope.id = $routeParams.id;

    tumblrAPI.blogAPI.get({ id: $scope.id }, function(json) {
      tumblrAPI.simplifyJSONProperties(json);
      $scope.post = json.response.posts[0];
      $scope.post.is_detail = true;
    });
  }]);
