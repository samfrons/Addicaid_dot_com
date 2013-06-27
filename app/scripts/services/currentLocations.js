'use strict';

angular.module('addicaidSiteApp')
  .factory('currentLocations', ['$rootScope', 'geolocation', 'googleGeocoder', function($rootScope, geolocation, geocoder) {

    var serviceAPI = {
      geolocationChangedEvent: 'currentLocations_geolocationChanged',
      manualMapCenterChangedEvent: 'currentLocations_manualMapCenterChanged',
      locationChangedEvent: 'currentLocations_locationChanged'
    };

    var locations = {
      geolocation: {
        position: null,
//        {
//          coords: {
//          accuracy: 150,
//            altitude: null,
//            altitudeAccuracy: null,
//            heading: null,
//            latitude: 34.536107,
//            longitude: -117.291156,
//            speed: null
//          },
//          timestamp: null
//        },
        latLng: null // new google.maps.LatLng
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
