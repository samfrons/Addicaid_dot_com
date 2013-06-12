'use strict';

angular.module('addicaidSiteApp')
  .controller('MapMobileCtrl', ['$scope', 'mobileViewToggle', function ($scope, mobileViewToggle) {
    console.log('setIsMobileView(true) in MapMobileCtrl');
    mobileViewToggle.setIsMobileView(true);

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
