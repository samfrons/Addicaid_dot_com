'use strict';

angular.module('addicaidSiteApp')
  .controller('MapCtrl', ['$scope', 'meetingCache', 'meetingFilter', '$resource', '$http', '$filter', '$rootScope', 'browserDetection', 'currentLocations', function($scope, meetingCache, meetingFilter, $resource, $http, $filter, $rootScope, browserDetection, currentLocations) {


    $rootScope.useMobileHeaderFooter = browserDetection.isMobile();

    // location polling
//    geolocation.startPolling();
//    $scope.$on('$destroy', function() {
//      geolocation.stopPolling();
//    });
//    geolocation.getLocation();



    // meetingCache
    $scope.meetings = [];
    var loadCachedMeetings = function() {
      // load latest filtered meetings from cache
      var meetingsList = meetingFilter.getFilteredMeetings('MapCtrl.loadCachedMeetings');
      // clear markers
      angular.forEach($scope.meetings, function(meeting) {
        meeting.marker.setMap(null);
      });

      angular.forEach(meetingsList, function(meeting) {
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(meeting.location.center.latitude, meeting.location.center.longitude),
          icon: {
            url: 'images/' + meeting.fellowship.abbrevName + 'pin' + (meeting.schedule.isSoon?'-soon.png':'.png')
          },
          shadow: {
            url: 'images/' + meeting.fellowship.abbrevName + 'pin-shadow.png'
          }
        });
        angular.extend(meeting, { marker: marker });
      });
      $scope.meetings = meetingsList;

    };

    $rootScope.$on(meetingCache.meetingsProcessedEvent, function(event, args) {
      loadCachedMeetings();
    });
    $rootScope.$on(meetingFilter.meetingFilterChangedEvent, function(event, args) {
      loadCachedMeetings();
    });
    $rootScope.$on(meetingFilter.refreshMeetingsEvent, function() {
      loadCachedMeetings();
    });


    $scope.openMarkerInfo = function(meeting) {
      $scope.currentMeeting = meeting;
      $scope.myInfoWindow.open($scope.map, meeting.marker, meeting);
    };






    $scope.mapOptions = {
      center: currentLocations.getCurrentLocationLatLng(),
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var setCurrentLocationMarker = function(latLng) {
      if (angular.isDefined($scope.currentLocationMarker)) {
        // delete old location
        $scope.currentLocationMarker.setMap(null);
        $scope.currentLocationMarker = null;
      }
      $scope.currentLocationMarker = new google.maps.Marker({
        map: $scope.map,
        position: latLng,
        icon: 'http://www.google.com/mapfiles/marker.png',
        shadow: 'http://www.google.com/mapfiles/shadow50.png'
      });
    };

    $scope.$on(currentLocations.locationChangedEvent, function(latLng) {
      console.log('2222222222222222maps ctrl location changed event')
      if (angular.isDefined(currentLocations.getCurrentLocationLatLng())) {
        console.log('map.$scope.$on(locationChangedEvent)');
        $scope.map.setCenter(currentLocations.getCurrentLocationLatLng());
//        meetingCache.setCurrentLocation(currentLocations.getCurrentLocationLatLng());
        setCurrentLocationMarker(currentLocations.getCurrentLocationLatLng());
      }
    });


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
      meetingCache.setMapBounds($scope.map.getBounds());
    };



    $scope.$watch('map', function(mapObj) {
    });


    $scope.show = {
      filter: true,
      list: true,
      map: true
    };
    $scope.showOnly = function(element) {
      var newShow = {};
      angular.forEach($scope.show, function(value, key) {
        if (key === element) {
          newShow[key] = true;
        } else {
          newShow[key] = false;
        }
      });
      $scope.show = newShow;
    };



//    meetingCache.setLimitTo(10);
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