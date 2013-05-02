'use strict';

angular.module('addicaidApp')
  .factory('geolocationBrowser', ['$q', '$rootScope', '$timeout', function($q, $rootScope, $timeout) {


//var defaultCoordinates = { // NYC
//    latitude : 40.763562,
//    longitude : -73.97140100000001
//};
    var defaultCoordinates = { // San Fran
      latitude: 37.771139,
      longitude: -122.403424
    };


    // Public API here
    return {
      events: {
        locationChanged: 'geolocationBrowser_locationChangedEvent'
      },
      changeLocation: function(coords) {
        // coords should have following relevant members: (from navigator.geolocation.getCurrentPosition)
        // double longitude
        // double latitude
        // double accuracy
        $rootScope.$broadcast(this.events.locationChanged, {
          coordinates: coords
        });
      },
      // current location
      getCurrentLocation: function() {
        var promise = this.getCurrentPosition()
          .then(function(value) {
            var location = {
              latitude: value.coords.latitude,
              longitude: value.coords.longitude
            };
            console.log('got location from within geolocationBrowser.getCurrentLocation');
            return location;
          }, function(error) {
            var location = {
              latitude: defaultCoordinates.latitude,
              longitude: defaultCoordinates.longitude
            };
            console.log('FAILED in geolocationBrowser.getCurrentLocation with error', error);
            return location;
          });

        console.log('geolocationBrowser.getCurrentLocation: returning result', promise);
        return promise;
      },
      getCurrentPosition: function() {
        console.log('geolocationBrowser.getCurrentPosition start');
        var deferred = $q.defer();
        try {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              console.log('geolocationBrowser.getCurrentPosition got position');
              deferred.resolve({
                coords: position.coords
              });
            });
          } else {
            console.log('geolocationBrowser.getCurrentPosition rejecting');
            deferred.reject('location services not allowed');
          }
        } catch(ex) {
          console.log('geolocationBrowser.getCurrentPosition exception');
          deferred.reject(ex);
        }
        console.log('geolocationBrowser.getCurrentPosition returning promise', deferred.promise);
        return deferred.promise;
      }
    };
  }]);
//      getCurrentPosition: function() {
//        $timeout(function() {
//          try {
//            if (navigator.geolocation) {
//              navigator.geolocation.getCurrentPosition(function(position) {
//                $rootScope.$apply(function() {
//                  // position.coords has following relevant members:
//                  // double longitude
//                  // double latitude
//                  // double accuracy
//                  this.changeLocation(position.coords);
//                  deferred.resolve({
//                    coords: position.coords
//                  });
//                });
//              }, function(error) {
//                deferred.reject(error);
//              });
//            } else {
//              deferred.reject('location services not allowed');
//            }
//          } catch(ex) {
//            deferred.reject(ex);
//          }
//        }, 1000);
//        return deferred.promise;
//      }
