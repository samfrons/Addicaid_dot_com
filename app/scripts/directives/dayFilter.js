'use strict';

angular.module('addicaidSiteApp')
  .directive('dayFilter', ['$filter', 'meetingCache', function ($filter, meetingCache) {
    return {
      template: '' +
        '<button ng-repeat="item in filterItems" ' +
        '        ng-click="toggle(item)" ' +
        '        ng-class="item.ngClass" ' +
        '        ui-show="item.selected">' +
        '  {{item.display}}' +
        '</button>',
      replace: true,
      restrict: 'E',
//      controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
//
//      }],
      link: function postLink(scope, element, attrs) {
        var defaultFilterItems = [{
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



        var selectedFilters = [];
        var setSelectedFilters = function() {
          selectedFilters = [];
          angular.forEach(scope.filterItems, function(item) {
            if (item.selected) {
              selectedFilters.push(item.filter);
            }
          });
          if (selectedFilters.length === 0) { // if no filters are selected, no filtering necessary
            angular.forEach(scope.filterItems, function(item) {
              selectedFilters.push(item.filter);
            });
          }
          console.log('setSelectedFilters', selectedFilters); // TODO: clean
          return selectedFilters;
        };

        var filterFunction = function(item) {
          return $filter('filter')(selectedFilters, item.schedule.dayAbbrev).length > 0;
        };

        scope.toggle = function(item) {
          item.selected = !item.selected;
          setSelectedFilters();
          meetingCache.filterChanged();
        };

        scope.resetAll = function() {
          scope.filterItems = angular.copy(defaultFilterItems);
          setSelectedFilters();
          meetingCache.filterChanged();
        };


        // functions to run on init
        scope.resetAll();
        meetingCache.setDayFilter(filterFunction);
      }
    };
  }]);
