'use strict';

angular.module('addicaidApp')
  .filter('andOrFilter', ['$filter', function($filter) {
    // array - array of objects to filter
    // andFilters - array of orFilters
    //    (an orFilter is an array of filter expressions)
    // An item in array is included in the results if and only if it
    // matches each andFilter, which passes if any of that andFilter's
    // orFilters pass
    return function(array, andFilters) {
      console.log('andOrFilter', andFilters);
      var filtered = [];
      angular.forEach(array, function(item) {
        var allAndFiltersPassed = true;
        angular.forEach(andFilters, function(andFilter) {
          var anyOrFilterPassed = false;
          angular.forEach(andFilter, function(orFilter) {
            if ($filter('filter')([item], orFilter).length > 0) {
              anyOrFilterPassed = true;
            }
          });
          allAndFiltersPassed = allAndFiltersPassed && anyOrFilterPassed;
        });
        if (allAndFiltersPassed) {
          filtered.push(item);
        }
      });

      return filtered;
    };
  }]);
