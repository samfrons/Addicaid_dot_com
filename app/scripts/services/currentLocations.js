'use strict';

angular.module('addicaidSiteApp')
  .factory('currentLocations', ['$rootScope', 'geolocation', function($rootScope, geolocation) {

    var serviceAPI = {
      geolocationChangedEvent: 'currentLocations_geolocationChanged'
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
        geocodedResponse: null,
        mapCenter: null
      }
    };


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
      if (!areGeolocationPositionsEqual(geolocationObj.position, locations.geolocation.position)) {
        console.log('currentLocations service: updating geolocation');
        locations.geolocation.position = geolocationObj.position;
        locations.geolocation.latLng = geolocationObj.latLng;
        $rootScope.$broadcast(serviceAPI.geolocationChangedEvent, locations.geolocation);
      }
    };





    return angular.extend(serviceAPI, {

      getGeolocation: function() {
        return locations.geolocation;
      },
      updateGeolocation: function() {
        geolocation.getCurrentGeolocation()
          .then(function(geolocationObj) {
            changeGeolocation(geolocationObj);
          });
      },


      setMapCenter: function(latLng) {
        locations.map.center = latLng;
      }
    });
  }]);
