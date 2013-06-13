'use strict';

angular.module('addicaidSiteApp')
  .controller('MainCtrl', ['$scope', '$location', 'browserDetection', function($scope, $location, browserDetection) {
    $scope.useMobile = $location.path() === '/mobile';
    console.log('MainCtrl useMobile='+$scope.useMobile, $location.path());


  }]);
