'use strict';

angular.module('addicaidSiteApp')
  .factory('currentLocations', ['$rootScope', 'geolocation', 'googleGeocoder', function($rootScope, geolocation, geocoder) {
    var defaultCoordinates = new google.maps.LatLng(40.763562, -73.97140100000001);  // NYC
//    var defaultCoordinates = new google.maps.LatLng(42.25113,-73.791435);  // upstate NY, for testfile
//    var defaultCoordinates = new google.maps.LatLng(37.771139, -122.403424);  // San Francisco
//    var defaultCoordinates = new google.maps.LatLng(34.536107,-117.291156);  // Victorville, CA

    var serviceAPI = {
      geolocationChangedEvent: 'currentLocations_geolocationChanged',
      manualMapCenterChangedEvent: 'currentLocations_manualMapCenterChanged',
      locationChangedEvent: 'currentLocations_locationChanged',
    };

    var locations = {
      geolocation: {
        position: {
          coords: {
            accuracy: 150,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: defaultCoordinates.lat(),
            longitude: defaultCoordinates.lng(),
            speed: null
          },
          timestamp: null
        },
        latLng: defaultCoordinates // new google.maps.LatLng
      },
      manual: {
        input: null,
        geocodedResults: null
      }
    };
    var useGeolocation = 'geolocation';
    var useManual = 'manual';
    var whichLocation = useGeolocation;


    var areGeolocationPositionsEqual = function(a, b) {
      if (a === null && b === null) {
        return true;
      } else if (a === null || b === null) {
        return false;
      } else if (a.coords === null && b.coords === null) {
        return true;
      } else if (a.coords === null || b.coords === null) {
        return false;
      } else {
        return a.coords.latitude === b.coords.latitude
          && a.coords.longitude === b.coords.longitude
          && a.coords.accuracy === b.coords.accuracy;
      }
    };

    var changeGeolocation = function(geolocationObj) {
      if (whichLocation === useManual || (!areGeolocationPositionsEqual(geolocationObj.position, locations.geolocation.position))) {
        console.log('currentLocations service: updating geolocation');
        locations.geolocation.position = geolocationObj.position;
        locations.geolocation.latLng = geolocationObj.latLng;
        whichLocation = useGeolocation;
        $rootScope.$broadcast(serviceAPI.geolocationChangedEvent, locations.geolocation);
        $rootScope.$broadcast(serviceAPI.locationChangedEvent, serviceAPI.getCurrentLocationLatLng());
      }
    };




    return angular.extend(serviceAPI, {

      updateGeolocation: function() {
        geolocation.getCurrentGeolocation()
          .then(function(geolocationObj) {
            changeGeolocation(geolocationObj);
          });
      },

      setManualInput: function(input) {
        var oldInput = locations.manual.input;
        locations.manual.input = input;
        geocoder.geocode(input)
          .then(function(results) {
            console.log('geocode top 1 result', results[0]);
            locations.manual.geocodedResults = results;
            whichLocation = useManual;
            $rootScope.$broadcast(serviceAPI.manualMapCenterChangedEvent);
            $rootScope.$broadcast(serviceAPI.locationChangedEvent, serviceAPI.getCurrentLocationLatLng());
          }, function(reason) {
            console.log('geocode failed', reason);
            locations.manual.input = oldInput;
          });
      },
      getCurrentLocationLatLng: function() {
        if (whichLocation === useManual) {
          if (locations.manual !== null && locations.manual.geocodedResults !== null && locations.manual.geocodedResults.length > 0) {
            return locations.manual.geocodedResults[0].geometry.location;
          } else {
            return null;
          }
        } else { // useGeolocation
          return locations.geolocation.latLng;
        }
      }


    });
  }]);
