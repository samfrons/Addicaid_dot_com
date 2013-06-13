'use strict';

angular.module('addicaidSiteApp')
  .controller('MainCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.useMobile = $location.path() === '/mobile';
    console.log('MainCtrl useMobile='+$scope.useMobile, $location.path());
  }]);
