'use strict';

angular.module('addicaidSiteApp')
  .controller('MapCtrl', ['$scope', 'eventService', 'meetingCache', '$resource', '$http', '$filter', '$rootScope', 'browserDetection', 'mapModuleInterface', '$q', function($scope, eventService, meetingCache, $resource, $http, $filter, $rootScope, browserDetection, mapModuleInterface, $q) {


    $rootScope.useMobileHeaderFooter = browserDetection.isMobile();

    // location polling
//    geolocation.startPolling();
//    $scope.$on('$destroy', function() {
//      geolocation.stopPolling();
//    });
//    geolocation.getLocation();



    // meetingCache
    $scope.meetings = [];
    var loadMarkerData = function() {
      // load latest filtered meetings from cache
      var meetingsList = mapModuleInterface.getMarkerData('MapCtrl.loadMarkerData');
      // clear markers
      angular.forEach($scope.meetings, function(meeting) {
        meeting.marker.setMap(null);
      });
      console.log('MapCtrl.loadMarkerData', meetingsList.length);

      angular.forEach(meetingsList, function(meeting) {
        var marker = new google.maps.Marker({
          map: $scope.map,
          position: new google.maps.LatLng(meeting.location.center.latitude, meeting.location.center.longitude),
          icon: {
            url: 'images/' + meeting.fellowship.abbrevName + 'pin' + (meeting.schedule.isSoon?'-soon':'') + '.png'
          },
          shadow: {
            url: 'images/' + meeting.fellowship.abbrevName + 'pin-shadow.png'
          }
        });
        angular.extend(meeting, { marker: marker });
      });
//      setMapCenter();

      $scope.meetings = meetingsList;

    };

    $scope.openMarkerInfo = function(meeting) {
      $scope.currentMeeting = meeting;
      $scope.myInfoWindow.open($scope.map, meeting.marker, meeting);
    };
    $scope.mapOptions = mapModuleInterface.getDefaultMapOptions();

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

    var waitingForMapBounds = false;

    var setMapCenter = function() {
      if (angular.isDefined(mapModuleInterface.getCurrentLocationLatLng())) {
        waitingForMapBounds = true;
        $scope.map.setCenter(mapModuleInterface.getCurrentLocationLatLng());
        setCurrentLocationMarker(mapModuleInterface.getCurrentLocationLatLng());
      }
    };



    $scope.updateMapBounds = function() {
//      console.log('update map bounds');
      mapModuleInterface.setMapBounds($scope.map.getBounds());
      if (waitingForMapBounds) {
        loadMarkerData();
        waitingForMapBounds = false;
      }
    };



    $scope.$watch('map', function() {
      if (angular.isDefined($scope.map)) {
        console.log('map ready');
        mapModuleInterface.addListenerToLoadMarkerData(loadMarkerData);
        mapModuleInterface.addListenerToChangeCurrentLocation(setMapCenter);

        $http.get('styles/special/mapStyle.json')
          .success(function(data, status) {
            $scope.map.setOptions({styles: data});
          })
          .error(function(data,status) {
            // TODO: error handling
            console.error('http mapStyle FAILURE', data, status);
          });
      }
    });


    // show/hide elements for mobile view
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




  }]);
