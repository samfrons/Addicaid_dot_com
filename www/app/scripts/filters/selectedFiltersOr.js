'use strict';

angular.module('addicaidApp')
  .filter('selectedFiltersOr', [function() {
    return function(filtersToCheck) {
      var result = [];
      angular.forEach(filtersToCheck, function(filter) {
        if (filter.selected) {
          angular.forEach(filter.filters, function(filterObject) {
            result.push(filterObject);
          });
        }
      });
      if (result.length === 0) { // if no filters were present
        result = undefined;
      }
      return result;
    };
  }]);
