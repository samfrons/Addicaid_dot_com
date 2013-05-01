'use strict';

angular.module('addicaidApp')
  .controller('TestCtrl', ['$scope', '$navigate', function($scope, $navigate) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.$navigate = $navigate;
  }]);
