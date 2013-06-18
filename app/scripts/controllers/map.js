'use strict';

angular.module('addicaidSiteApp')
  .controller('MapCtrl', ['$scope', 'meetings', 'Restangular', '$resource', '$http', '$filter', '$rootScope', 'browserDetection', '$location', function($scope, meetings, Restangular, $resource, $http, $filter, $rootScope, browserDetection, $location) {

    $rootScope.useMobileHeaderFooter = browserDetection.isMobile();






    $scope.meetings = [];
    // meetings
    $scope.$on(meetings.meetingsChangedEvent, function(event, args) {
      console.log('MapCtrl#on_meetingsChanged', event, args);
//      $scope.meetings = $filter('andOrFilter')(meetings.getMeetings('map-on'), filterSvc.filtersToApply());
      var meetingsList = meetings.getMeetings('map-on');
      angular.forEach(meetingsList, function(meeting) {
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(meeting.location.center.latitude, meeting.location.center.longitude),
          icon: {
            url: 'images/' + meeting.fellowship.abbrevName + 'pin' + (meeting.schedule.isSoon?'-soon.gif':'.png')
//            scaledSize: new google.maps.Size(64,64)
          },
          shadow: {
            url: 'images/' + meeting.fellowship.abbrevName + 'pin-shadow.png'
          }
        });
        angular.extend(meeting, { marker: marker });
      });
      $scope.meetings = meetingsList;

    });


    $scope.openMarkerInfo = function(meeting) {
      $scope.currentMeeting = meeting;
      $scope.myInfoWindow.open($scope.map, meeting.marker, meeting);
    };


    $scope.mapOptions = {
//      center: new google.maps.LatLng(40.763562,-73.97140100000001),
//      center: new google.maps.LatLng(42.25113,-73.791435),
//      center: new google.maps.LatLng(42.633326 , -73.801232),
      center: meetings.defaultCoordinates,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $http.get('styles/special/mapStyle.json')
      .success(function(data, status) {
        $scope.map.setOptions({styles: data});
      })
      .error(function(data,status) {
        // TODO: error handling
        console.error('http mapStyle FAILURE', data, status);
      });


    $scope.updateMapBounds = function() {
      console.log('update map bounds', $scope.map.getBounds());
      meetings.setMapBounds($scope.map.getBounds());
      meetings.getMeetings('updateMapBounds');
    };

    $scope.updateCurrentLocationFromMapCenter = function() {
      console.log('updateCurrentLocationFromMapCenter');
      meetings.setCurrentLocation($scope.map.getCenter());
      meetings.getMeetings('updateCurrentLocationFromMapCenter');
    };






    $scope.$watch('map', function(mapObj) {
      console.log('watch map function');
      $scope.updateCurrentLocationFromMapCenter();
    });


    $scope.show = {
      filter: true,
      list: true,
      map: true
    };
    $scope.showOnly = function(element) {
      var newShow = {};
      angular.forEach($scope.show, function(value, key) {
        console.log(value, key);
        if (key === element) {
          newShow[key] = true;
        } else {
          newShow[key] = false;
        }
      });
      $scope.show = newShow;
    };



//    meetings.setLimitTo(10);
    // PAGINATION
    $scope.currentPage = 0;
    $scope.pageSize = 6;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.meetings.length/$scope.pageSize);
    };
  }]);


// TODO: move filter to another file
angular.module('addicaidSiteApp')
  .filter('startFrom', function() {
    return function(input, start) {
      start = +start; //parse to int
      return input.slice(start);
    }
  });