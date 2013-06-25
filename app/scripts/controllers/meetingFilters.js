'use strict';

angular.module('addicaidSiteApp')
  .controller('MeetingFiltersCtrl', ['$scope', 'meetingCache', 'geolocation', function ($scope, meetingCache, geolocation) {

    $scope.customAddress = '';

    $scope.findMeetings = function() {
      if ($scope.customAddress !== '') {
        // do custom address
      } else {
        // use geolocation
      }
      meetingCache.getMeetings();
    };

    $scope.getCurrentLocation = function() {
      geolocation.getLocation();
    };
  }]);
