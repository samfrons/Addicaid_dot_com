'use strict';

angular.module('addicaidSiteApp')
  .factory('geolocation', ['$q', '$rootScope', '$timeout', '$window', 'timeInterval', function($q, $rootScope, $timeout, $window, timeInterval) {
    var serviceAPI = {
      locationChangedEvent: 'locationChanged'
    };



    var convertCoordsToLatLng = function(coords) {
      return new google.maps.LatLng(coords.latitude, coords.longitude);
    };

    var arePositionsEqual = function(a, b) {
      if (angular.isDefined(a) && angular.isDefined(b)) {
        if (a.coords.latitude === b.coords.latitude
          && a.coords.longitude === b.coords.longitude
          && a.coords.accuracy === b.coords.accuracy) {
          return true;
        }
      }

      return false;
    };

    var changeLocation = function(position) {
      if (!arePositionsEqual(position, $rootScope.geolocationPosition)) {
        console.log('updating geolocation');
        $rootScope.geolocationLatLng = convertCoordsToLatLng(position.coords);
        $rootScope.geolocationPosition = position;
        $rootScope.$broadcast(serviceAPI.locationChangedEvent, {
          position: position,
          latLng: convertCoordsToLatLng(position.coords)
        });
      }
    };







    var getCurrentPosition = function() {
      /*  Structure of position from navigator.geolocation.getCurrentPosition
       coords.latitude         double          decimal degrees
       coords.longitude        double          decimal degrees
       coords.altitude	        double or null  meters above the reference ellipsoid
       coords.accuracy	        double          meters
       coords.altitudeAccuracy double or null  meters
       coords.heading	        double or null  degrees clockwise from true north
       coords.speed	          double or null  meters/second
       timestamp	              DOMTimeStamp    like a Date() object
       */
      var d = $q.defer();
      var geolocationSuccess = function(position) {
        changeLocation(position);
        d.resolve({
          position: position,
          latLng: convertCoordsToLatLng(position.coords)
        });
      };

      var geolocationError = function(error) {
        d.reject(error);
      };


      try {
        if ($window.navigator.geolocation) {
          $window.navigator.geolocation.getCurrentPosition(
            geolocationSuccess,
            geolocationError,
            {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 15000
            });
        }
        else {
          d.reject('location services not allowed');
        }
      }
      catch (err) {
        d.reject(err);
      }
      return d.promise;
    };



    // Public API here
    return angular.extend(serviceAPI, {
      startPolling: function(interval) {
        interval = interval || 5000; // default interval
        timeInterval.startPolling('geolocation', getCurrentPosition, interval);
      },
      stopPolling: function() {
        timeInterval.stopPolling('geolocation');
      },
      getLocation: function() {
        return getCurrentPosition();
      }
    });
  }]);
