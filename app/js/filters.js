'use strict';

/* Filters */

angular.module('addicaidApp.filters', [])
    .filter('meetingFilter', function($filter) {
        // meetings - array of meeting objects to filter
        // orFilters - array of array of filters to apply using OR
        return function(meetings, orFilters) {
            console.log("meetingFilter", orFilters)
            var filteredResults = [];
            angular.forEach(meetings, function(meeting) {
                var isValid = false;
                angular.forEach(orFilters, function(orFilter) {
                    angular.forEach(orFilter, function(andFilter) {
                        if ($filter('filter')([meeting],andFilter).length > 0)
                            isValid = true;
                    });
                });
                if (isValid
                    || orFilters.length == 0 // if there are no filters, we include every meeting
                    ) {
                    filteredResults.push(meeting);
                }
            });
            return filteredResults;
        }
    })



    .filter('selectedFilters', function() {
        return function(filtersToCheck) {
            var result = [];
            angular.forEach(filtersToCheck, function(filter) {
                angular.forEach(filter.filters, function(filterObject) {
                    if (filter.selected) {
                        result.push(filterObject);
                    }
                });
            });
            return result;
        }
    });
;