'use strict';

angular.module('addicaidApp')
  .filter('selectedFiltersAnd', [function() {
    return function(filtersToCheck) {
      var result = {};
      angular.forEach(filtersToCheck, function(filter) {
        if (filter.selected) {
          angular.forEach(filter.filters, function(filterObject) {
            angular.extend(result, filterObject);
          });
        }
      });

      if (angular.equals(result, {})) { // if no filters were present
        result = undefined;
      } else {
        result = [result];
      }

      return result;
    };
  }]);
