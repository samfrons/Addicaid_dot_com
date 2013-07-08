'use strict';

angular.module('addicaidSiteApp')
  .factory('pagedListModuleInterface', ['eventService', 'meetingCache', function(eventService, meetingCache) {

    var serviceAPI = {
    };

    serviceAPI = angular.extend(serviceAPI, {
      addListenerToItems: function(loadingFunction) {
        eventService.registerRootEventHandler(eventService.dataCacheRefreshedEvent, loadingFunction);
      },
      getItems: function(callingFunction) {
        return meetingCache.getMeetingsFromCache(callingFunction+' --> (app)pagedListModuleInterface');
      }
    });

    return serviceAPI;
  }]);


