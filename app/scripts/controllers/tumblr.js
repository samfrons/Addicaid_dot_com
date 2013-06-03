'use strict';
/* jshint -W106 */
/* jshint -W098 */

angular.module('addicaidSiteApp')
  .controller('TumblrCtrl', ['$scope', '$routeParams', 'tumblrAPI', function($scope, $routeParams, tumblrAPI) {
    $scope.currentPage = $routeParams.page || 1;
    $scope.postsPerPage = 5;

    tumblrAPI.blogAPI.get({offset: ($scope.currentPage - 1) * $scope.postsPerPage, limit: $scope.postsPerPage}, function(json) {
      tumblrAPI.simplifyJSONProperties(json);
      $scope.posts = tumblrAPI.posts = json.response.posts;
      console.log($scope.posts[0].template);
    });

    $scope.stepPageUrl = function(interval) {
      var page = parseInt($scope.currentPage,10) + parseInt(interval, 10);
      var url = '/tumblr/page/' + page;
      return url;
    };

    $scope.firstPage = function() {
      return $scope.currentPage === 1;
    };

    $scope.lastPage = function() {
      try {
        return tumblrAPI.posts < ($scope.currentPage * $scope.postsPerPage);
      } finally {
        return false;
      }
    };

    $scope.like = function(post) {
      var url = 'http://www.tumblr.com/like/' + post.reblog_key + '?id=' + post.id;
      post.liked = true;
      // TODO: fix this jQuery
      // jQuery('body').append('<iframe src="' + url + '" style="position:absolute;left:-9999em">');
    };
  }]);
