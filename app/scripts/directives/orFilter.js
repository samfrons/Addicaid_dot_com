'use strict';

angular.module('addicaidSiteApp')
  .directive('orFilter', ['$filter', 'meetingCache', function ($filter, meetingCache) {
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
      scope: {
//        filterItems: '=',
        defaultFilterItems: '=',
        onFilterChanged: '&'
      },
      link: function postLink(scope, element, attrs) {
        var getSelectedFilters = function() {
          var selectedFilters = [];
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
          return selectedFilters;
        };

        scope.toggle = function(item) {
          item.selected = !item.selected;
          scope.onFilterChanged({selectedFilters:getSelectedFilters()});
        };

        scope.resetAll = function() {
          scope.filterItems = angular.copy(scope.defaultFilterItems);
          scope.onFilterChanged({selectedFilters:getSelectedFilters()});
        };


        // functions to run on init
        scope.resetAll();
      }
    };
  }]);
