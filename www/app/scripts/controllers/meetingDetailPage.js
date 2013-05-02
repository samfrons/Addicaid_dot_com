'use strict';

angular.module('addicaidApp')
  .controller('MeetingDetailPageCtrl', ['$scope', '$rootScope', '$routeParams', 'meetingSvc', function ($scope, $rootScope, $routeParams, meetingSvc) {
    $rootScope.sharedVars.pageTitle = 'Meeting Title';

    // hack: disable comments if needed
    $scope.showComments = $routeParams.showComments;


    var addMarkerOptions = function(meeting) {
      var icon = L.Icon.Default;

      var fellowshipID = $scope.getFellowshipID(meeting.fellowship.name);
      var suffix;
      if (meetingSvc.isMeetingStartingSoon(meeting)) {
        suffix = 'soon';
      } else {
        suffix = 'map';
      }
      var iconUrl = 'images/' + fellowshipID + suffix + '.png';

      if (fellowshipID !== '') {
        icon = L.icon({ iconUrl: iconUrl });
      }
      var markerOptions = {
        icon: icon
      };
      angular.extend(meeting, { markerOptions: markerOptions });

      return meeting;
    };

    $scope.meeting = addMarkerOptions(meetingSvc.getMeetingByID($routeParams.meetingID));
    console.log('MeetingDetailPageCtrl', $routeParams.meetingID, $scope.meeting);

    // map options
    $scope.mapOptions = {
      center: L.latLng($scope.meeting.latLon.latitude, $scope.meeting.latLon.longitude),
      zoom: 12
    };
    console.log($scope.meeting);
  }]);
