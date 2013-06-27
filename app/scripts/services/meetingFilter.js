'use strict';

angular.module('addicaidSiteApp')
  .factory('meetingFilter', ['$rootScope', 'meetingCache', '$filter', function($rootScope, meetingCache, $filter) {

    var serviceAPI = {
      meetingFilterChangedEvent: 'meetingFilter_meetingFilterChanged',
      refreshMeetingsEvent: 'meetingFilter_refreshMeetings'
    };

    var dayFilter = function(item) {
      return true;
    };
    var fellowshipFilter = function(item) {
      return true;
    };
    var timeFilter = function(item) {
      return true;
    };


    serviceAPI = angular.extend(serviceAPI, {
      filterChanged: function() {
        $rootScope.$broadcast(serviceAPI.meetingFilterChangedEvent);
      },
      setDayFilter: function(newDayFilter) {
        dayFilter = newDayFilter;
      },
      setFellowshipFilter: function(newFellowshipFilter) {
        fellowshipFilter = newFellowshipFilter;
      },
      setTimeFilter: function(newTimeFilter) {
        timeFilter = newTimeFilter;
      },

      sendRefreshEvent: function() {
        $rootScope.$broadcast(serviceAPI.refreshMeetingsEvent);
      },
      getFilteredMeetings: function(callingFuncName) {
        var filteredMeetings = meetingCache.getMeetingsFromCache(callingFuncName);
        filteredMeetings = $filter('filter')(filteredMeetings, dayFilter);
        filteredMeetings = $filter('filter')(filteredMeetings, fellowshipFilter);
        filteredMeetings = $filter('filter')(filteredMeetings, timeFilter);
        return filteredMeetings;
        // return: array of meeting objects from server
      }
    });

    $rootScope.$on(meetingCache.initSearchBoundsDefinedEvent, function() {
      serviceAPI.sendRefreshEvent();
    });
    return serviceAPI;
  }]);
