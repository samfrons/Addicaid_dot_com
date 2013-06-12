'use strict';

angular.module('addicaidSiteApp')
  .controller('MeetingDetailSmallCtrl', ['$scope', function ($scope) {
    if (angular.isDefined($scope.currentMeeting)) {
      $scope.meeting = $scope.currentMeeting;
    }
  }]);
