'use strict';

angular.module('addicaidSiteApp')
  .controller('MapCtrl', ['$scope', 'meetings', 'Restangular', '$resource', '$http', function($scope, meetings, Restangular, $resource, $http) {


    $scope.myMarkers = [];

    // meetings
    $scope.$on(meetings.meetingsChangedEvent, function(event, args) {
      console.log('MapCtrl#on_meetingsChanged', event, args);
//      $scope.meetings = $filter('andOrFilter')(meetings.getMeetings('map-on'), filterSvc.filtersToApply());
      var meetingsList = meetings.getMeetings('map-on');
      angular.forEach(meetingsList, function(meeting) {
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(meeting.location.center.latitude, meeting.location.center.longitude)
        });
        $scope.myMarkers.push(marker);
        angular.extend(meeting, { marker: marker });
      });
      $scope.meetings = meetingsList;

    });
//    $scope.meetings = $filter('andOrFilter')(meetingSvc.getMeetings('map-init'), filterSvc.filtersToApply());
    $scope.meetings = meetings.getMeetings('map-init');


    $scope.openMarkerInfo = function(meeting) {
      $scope.currentMeeting = meeting;
      $scope.myInfoWindow.open($scope.map, meeting.marker, meeting);
    };






    $scope.mapOptions = {
//      center: new google.maps.LatLng(40.763562,-73.97140100000001),
      center: new google.maps.LatLng(42.25113,-73.791435),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $http.get('styles/mapStyle.json')
      .success(function(data, status) {
        console.log('success', data, status);
        $scope.map.setOptions({styles: data});
      })
      .error(function(data,status) {
        // TODO: error handling
        console.error('FAILURE', data, status);
      });
  }]);
