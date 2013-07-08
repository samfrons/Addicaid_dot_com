'use strict';

angular.module('addicaidSiteApp')
  .factory('filterService', ['$rootScope', '$filter', 'filterModuleInterface', function($rootScope, $filter, filterModuleInterface) {

    var serviceAPI = {

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
    var locationFilter = {
      useGeolocation: true,
      customAddress: ''
    };


    serviceAPI = angular.extend(serviceAPI, {
      setDayFilter: function(newDayFilter) {
        dayFilter = newDayFilter;
        filterModuleInterface.filterChanged();
      },
      setFellowshipFilter: function(newFellowshipFilter) {
        fellowshipFilter = newFellowshipFilter;
        filterModuleInterface.filterChanged();
      },
      setTimeFilter: function(newTimeFilter) {
        timeFilter = newTimeFilter;
        filterModuleInterface.filterChanged();
      },

      setLocationFilter: function(newLocationFilter) {
        var success = filterModuleInterface.processLocationFilter(newLocationFilter);
        console.log('setLocationFilter ', success);
        locationFilter = newLocationFilter;
        filterModuleInterface.locationFilterChanged();
      },
      getLocationFilter: function() {
        return locationFilter;
      },

      doSearch: function() {
        // TODO: implement interface, broadcast event?
        filterModuleInterface.searchButtonClicked();
      },
      filter: function(unfiltered) {
        var filtered = unfiltered;
        filtered = $filter('filter')(filtered, dayFilter);
        filtered = $filter('filter')(filtered, fellowshipFilter);
        filtered = $filter('filter')(filtered, timeFilter);
        return filtered;
        // return: filtered array
      }
    });

    return serviceAPI;
  }]);
