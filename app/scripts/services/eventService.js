'use strict';

angular.module('addicaidSiteApp')
  .factory('eventService', ['$rootScope', function($rootScope) {
    var serviceAPI = {
      dataCacheRefreshedEvent: 'eventService__dataCacheRefreshed',
      currentLocationChangedEvent: 'eventService__currentLocationChanged',
      filterChangedEvent: 'eventService__filterChanged',
      locationFilterChangedEvent: 'eventService__locationFilterChanged',
      meetingSearchClickedEvent: 'eventService__meetingSearchClicked'
    };

    return angular.extend(serviceAPI, {
      broadcastRootEvent: function(eventname, args) {
        $rootScope.$broadcast(eventname, args);
      },
      broadcastEvent: function(scope, eventname, args) {
        scope.$broadcast(eventname, args);
      },
      registerEventHandler: function(scope, eventname, listener) {
        scope.$on(eventname, listener);
      },
      registerRootEventHandler: function(eventname, listener) {
        $rootScope.$on(eventname, listener);
      }
    });
  }]);