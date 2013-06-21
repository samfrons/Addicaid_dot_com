'use strict';

angular.module('addicaidSiteApp')
  .controller('TestMapCtrl', ['$scope', 'meetings', '$resource', '$http', function($scope, meetings, $resource, $http) {


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
      $scope.currentMarker = meeting.marker;
      $scope.currentMarkerLat = meeting.marker.getPosition().lat();
      $scope.currentMarkerLng = meeting.marker.getPosition().lng();

      $scope.currentMeeting = meeting;
      $scope.myInfoWindow.open($scope.map, meeting.marker, meeting);
    };






    $scope.mapOptions = {
//      center: new google.maps.LatLng(40.763562,-73.97140100000001),
      center: new google.maps.LatLng(42.25113,-73.791435),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };





//    var getParams = {
//      neLat: 50.605068,
//      neLong: -63.629084,
//      swLat: 30.584995,
//      swLong:-83.673372
//    };


//    console.log('start http');
//    var fullUrl = 'http://localhost:8080/meeting?swLat=30.584995&swLong=-83.673372&neLat=50.605068&neLong=-63.629084';
//    fullUrl = 'testfiles/meetings.json';
//    $http.get(fullUrl)
////    $http({
////      url: 'http://localhost\\:8080/meeting',
////      method: 'GET',
////      params: {neLat: 50.605068, neLong: -63.629084, swLat: 30.584995, swLong:-83.673372}
////    })
//      .success(function(data, status) {
//        console.log('success', data, status);
//      })
//      .error(function(data, status) {
//        console.log('error', data, status);
//      });




//    var meetingResource = $resource('http://localhost\\:8080/meeting', {
//      meeting: {
//        method: GET,
//        params: getParams
//      }
//    });
//    var meetings = meetingResource.query({
//      params: getParams
//    }, function(data) {
//      console.log('ngResource success');
//      console.log(data);
//    });


//    console.log('starting restangular call');
//    var baseMeetings= Restangular.all('meeting');
//    console.log(baseMeetings.getRestangularUrl(), baseMeetings.getList());
//    baseMeetings.customGET('meeting',getParams).then(function(data) {
//      console.log('Restangular then');
//      console.log(data[0]);
//    });
  }]);
