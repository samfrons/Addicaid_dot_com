'use strict';

angular.module('addicaidSiteApp')
  .controller('BrowserCheckCtrl', ['$scope', '$location', 'browserDetection', function($scope, $location, browserDetection) {
    console.log('BrowserCheckCtrl isMobile=' + browserDetection.isMobile());

    if (browserDetection.isMobile()) {
      $location.path('/mobile/main');
    } else {
      $location.path('/main');
    }
  }]);
