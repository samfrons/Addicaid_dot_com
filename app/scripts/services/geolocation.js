'use strict';


// TODO: geolocation from ip: http://www.geoplugin.net/json.gp?ip=142.255.92.169&jsoncallback=h


angular.module('addicaidSiteApp')
  .factory('geolocation', ['$q', '$rootScope', '$timeout', '$window', 'timeInterval', function($q, $rootScope, $timeout, $window, timeInterval) {
    var serviceAPI = {
//      locationChangedEvent: 'geolocation_locationChanged'
      convertCoordsToLatLng: function(coords) { // todo: make private if no longer needed publicly
        return new google.maps.LatLng(coords.latitude, coords.longitude);
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
//        changeLocation(position);
        console.log('geolocationSuccess');

        d.resolve({
          position: position,
          latLng: serviceAPI.convertCoordsToLatLng(position.coords)
        });
      };

      var geolocationError = function(error) {
        console.error('geolocationError', error);
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
              maximumAge: 75000
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
      getCurrentGeolocation: function() { // returns promise
        return getCurrentPosition();
      }
    });
  }]);
