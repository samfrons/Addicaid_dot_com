'use strict';

angular.module('addicaidSiteApp')
  .controller('MainMobileCtrl', ['$scope', 'mobileViewToggle', function ($scope, mobileViewToggle) {
    console.log('setIsMobileView(true) in MainMobileCtrl');
    mobileViewToggle.setIsMobileView(true);

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
