'use strict';

angular.module('addicaidSiteApp')
  .controller('MainCtrl', ['$scope', '$location', 'browserDetection', '$rootScope', function($scope, $location, browserDetection, $rootScope) {
    $rootScope.useMobileHeaderFooter = $location.path().slice(0,7) === '/mobile';


  }]);
