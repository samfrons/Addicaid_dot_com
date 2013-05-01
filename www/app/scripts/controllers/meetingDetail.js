'use strict';

angular.module('addicaidApp')
  .controller('MeetingDetailCtrl', ['$scope', 'meetingSvc', function($scope, meetingSvc) {
    $scope.getImgSrc = meetingSvc.getImgSrc;
    $scope.getCssClass = meetingSvc.getCssClass;

    $scope.getImgStyle = function(filterObj) {
      var o = {
        'background-image' : 'url('+ meetingSvc.getImgSrc(filterObj) + ')'
      };
      return o;
    };
  }]);
