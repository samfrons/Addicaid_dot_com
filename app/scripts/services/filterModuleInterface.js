'use strict';

angular.module('addicaidSiteApp')
  .factory('filterModuleInterface', ['$rootScope', 'eventService', 'googleGeocoder', 'geolocation', function($rootScope, eventService, geocoder, geolocation) {

    var serviceAPI = {
    };

    var defaultCoordinates = new google.maps.LatLng(40.763562, -73.97140100000001);  // NYC
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

    serviceAPI = angular.extend(serviceAPI, {
      searchButtonClicked: function() {
        console.log('app interface: filterModuleInterface.searchButtonClicked()');
        eventService.broadcastRootEvent(eventService.meetingSearchClickedEvent);
      },
      processLocationFilter: function(newLocationFilter) {
        if (!newLocationFilter.useGeolocation) {
          // geocode customAddress
          var oldInput = locations.manual.input;
          locations.manual.input = newLocationFilter.customAddress;
          geocoder.geocode(locations.manual.input)
            .then(function(results) {
              console.log('geocode top 1 result', results[0]);
              locations.manual.geocodedResults = results;
              whichLocation = useManual;
              eventService.broadcastRootEvent(eventService.currentLocationChangedEvent);
              return results[0];
            }, function(reason) {
              console.error('geocode failed', reason);
              locations.manual.input = oldInput;
              return false;
            });
        } else {
          // use geolocation
          geolocation.getCurrentGeolocation()
            .then(function(geolocationObj) {
//              if (whichLocation === useManual || (!areGeolocationPositionsEqual(geolocationObj.position, locations.geolocation.position))) {
              console.log('filterModuleInterface service: updating geolocation');
              locations.geolocation.position = geolocationObj.position;
              locations.geolocation.latLng = geolocationObj.latLng;
              whichLocation = useGeolocation;
              eventService.broadcastRootEvent(eventService.currentLocationChangedEvent);
//              }
              return locations.geolocation.latLng;
            }, function(reason) {
              console.error('geolocation failed', reason);
              return false;
            });
        }
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
      },

      filterChanged: function() {
        eventService.broadcastRootEvent(eventService.filterChangedEvent);
      },
      locationFilterChanged: function() {
        eventService.broadcastRootEvent(eventService.locationFilterChangedEvent);
      }
    });

    return serviceAPI;
  }]);