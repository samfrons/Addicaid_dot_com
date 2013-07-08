'use strict';

angular.module('addicaidSiteApp')
  .factory('mapModuleInterface', ['$rootScope', 'eventService', 'meetingCache', function($rootScope, eventService, meetingCache) {

    var serviceAPI = {
    };

    serviceAPI = angular.extend(serviceAPI, {
      getDefaultMapOptions: function() {
        return {
          center: serviceAPI.getCurrentLocationLatLng(),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
      },
      getMarkerData: function(callingFunction) {
        return meetingCache.getMeetingsFromCache(callingFunction+' --> (app)mapModuleInterface');
      },
      getCurrentLocationLatLng: function() {
        // returns app state: user's current location
        return meetingCache.getCurrentLocationLatLng();
      },

      setMapBounds: function(mapBounds) {
        // allows map to send it's bounds data
        meetingCache.setMapBounds(mapBounds);
      },

      addListenerToLoadMarkerData: function(loadingFunc) {
        eventService.registerRootEventHandler(eventService.dataCacheRefreshedEvent, loadingFunc);
      },
      addListenerToChangeCurrentLocation: function(loadingFunc) {
        eventService.registerRootEventHandler(eventService.currentLocationChangedEvent, loadingFunc);
        eventService.registerRootEventHandler(eventService.locationFilterChangedEvent, loadingFunc);
      }

    });

    return serviceAPI;
  }]);