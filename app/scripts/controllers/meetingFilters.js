'use strict';

angular.module('addicaidSiteApp')
  .controller('MeetingFiltersCtrl', ['$scope', 'meetingCache', 'geolocation', '$filter', function ($scope, meetingCache, geolocation, $filter) {

    $scope.customAddress = '';

    $scope.findMeetings = function() {
      if ($scope.customAddress !== '') {
        // do custom address
      } else {
        // use geolocation
      }
      meetingCache.getMeetings();
    };

    $scope.clickGeolocation = function() {
      geolocation.getLocation();
//        .then(function(pos) {
//          console.log(pos);
//        });
    };




    // filters
    $scope.dayFilterItems = [{
      display: 'm',
      selected: false,
      filter: 'MO'
    }, {
      display: 't',
      selected: false,
      filter: 'TU'
    }, {
      display: 'w',
      selected: false,
      filter: 'WE'
    }, {
      display: 't',
      selected: false,
      filter: 'TH'
    }, {
      display: 'f',
      selected: false,
      filter: 'FR'
    }, {
      display: 's',
      selected: false,
      ngClass: 'weekend',
      filter: 'SA'
    }, {
      display: 's',
      selected: false,
      ngClass: 'weekend',
      filter: 'SU'
    }];

    $scope.onDayFilterChanged = function(selectedFilters) {
      console.log('onDayFilterChanged in MeetingFiltersCtrl', selectedFilters);

      var filterFunction = function(item) {
        return $filter('filter')(selectedFilters, item.schedule.dayAbbrev).length > 0;
      };

      meetingCache.setDayFilter(filterFunction);
      meetingCache.filterChanged();
    };

    $scope.fellowshipFilterItems = [{
      display: 'Narcotics Anonymous',
      selected: false,
      filter: 'NA'
    }, {
      display: 'Alcoholics Anonymous',
      selected: false,
      filter: 'AA'
    }];

    $scope.onFellowshipFilterChanged = function(selectedFilters) {
      console.log('onFellowshipFilterChanged in MeetingFiltersCtrl', selectedFilters);

      var filterFunction = function(item) {
        return $filter('filter')(selectedFilters, item.fellowship.abbrevName).length > 0;
      };

      meetingCache.setFellowshipFilter(filterFunction);
      meetingCache.filterChanged();
    };


    $scope.timeFilterItems = [{
      display: 'morning',
      filter: {start: 600, end: 1200 },
      selected: false
    },{
      display: 'afternoon',
      filter: { start: 1200, end: 1700 },
      selected: false
    },{
      display: 'evening',
      filter: { start: 1700, end: 2000 },
      selected: false
    },{
      display: 'night',
      filter: { start: 2000, end: 600 },
      selected: false
    }];

    var isTimeBetween = function(timeAsNumber, start, end) {
      if (end < start) {
        return isTimeBetween(timeAsNumber, start, 2399) || isTimeBetween(timeAsNumber, 0, end);
      }
      return start <= timeAsNumber && timeAsNumber <= end;
    };

    $scope.onTimeFilterChanged = function(selectedTimeFilters) {
      console.log('onTimeFilterChanged in MeetingFiltersCtrl', selectedTimeFilters);
      var filterFunction = function(item) {
        var isValidTime = false;
        angular.forEach(selectedTimeFilters, function(timeFilter) {
//          console.log(item.schedule.timeAsNumber, timeFilter.start, timeFilter.end, isTimeBetween(item.schedule.timeAsNumber, timeFilter.start, timeFilter.end))
          if (isTimeBetween(item.schedule.timeAsNumber, timeFilter.start, timeFilter.end)) {
            isValidTime = true;
          }
        });
        return isValidTime;
      };

      meetingCache.setTimeFilter(filterFunction);
      meetingCache.filterChanged();
    };
  }]);
