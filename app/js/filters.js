'use strict';

/* Filters */

angular.module('addicaidApp.filters', [])
    .filter('andOrFilter', function($filter) {
        // array - array of objects to filter
        // andFilters - array of orFilters
        //    (an orFilter is an array of filter expressions)
        // An item in array is included in the results if and only if it
        // matches each andFilter, which passes if any of that andFilter's
        // orFilters pass
        return function(array, andFilters) {
            console.log("andOrFilter", andFilters)
            var filtered = [];
            angular.forEach(array, function(item) {
                var allAndFiltersPassed = true;
                angular.forEach(andFilters, function(andFilter) {
                    var anyOrFilterPassed = false;
                    angular.forEach(andFilter, function(orFilter) {
                        if ($filter('filter')([item],orFilter).length > 0)
                            anyOrFilterPassed = true;
                    });
                    allAndFiltersPassed = allAndFiltersPassed && anyOrFilterPassed;
                });
                if (allAndFiltersPassed)
                    filtered.push(item);
            });

            return filtered;
        }
    })
    .filter('selectedFiltersOr', function() {
        return function(filtersToCheck) {
            var result = [];
            angular.forEach(filtersToCheck, function(filter) {
                if (filter.selected) {
                    angular.forEach(filter.filters, function(filterObject) {
                        result.push(filterObject);
                    });
                }
            });
            if (result.length == 0) // if no filters were present
                result = undefined;
            return result;
        }
    })
    .filter('selectedFiltersAnd', function() {
        return function(filtersToCheck) {
            var result = {};
            angular.forEach(filtersToCheck, function(filter) {
                if (filter.selected) {
                    angular.forEach(filter.filters, function(filterObject) {
                        angular.extend(result, filterObject);
                    });
                }
            });

            if (angular.equals(result,{})) // if no filters were present
                result = undefined;
            else
                result = [ result ];
            return result;
        }
    })









    .filter('meetingFilter1', function($filter) {
        // meetings - array of meeting objects to filter
        // orFilters - array of array of filters to apply using OR
        return function(meetings, andFilterArray) {
            console.log("meetingFilter", andFilterArray)
            var filteredResults = [];
            angular.forEach(meetings, function(meeting) {
                var isValid = true;
                angular.forEach(andFilterArray, function(andFilter) {
//                    console.log("andFilter", $filter('filter')([meeting],{'rating.forYoungPeople':true, 'rating.isLgbt':true}).length, meeting)
//                    console.log("andFilter", [$filter('filter')([meeting],andFilter).length, andFilter, meeting])
                    if ($filter('filter')([meeting],andFilter).length == 0) {

                    }
                    angular.forEach(andFilter, function(orFilter) {
//                        console.log("andFilter", $filter('filter')([meeting],orFilter).length, orFilter, meeting)
                        if ($filter('filter')([meeting],orFilter).length > 0)
                            isValid = true;
                    });
                });
                if (isValid
                    || andFilterArray.length == 0 // if there are no filters, we include every meeting
                    ) {
                    filteredResults.push(meeting);
                }
            });
            return filteredResults;
        }
    })
    .filter('selectedFilters1', function() {
        return function(filtersToCheck) {
            var result = {};
            angular.forEach(filtersToCheck, function(filter) {
                if (filter.selected) {
                    angular.forEach(filter.filters, function(filterObject) {
                        angular.extend(result, filterObject);
                    });
                }
            });

            if (angular.equals(result,{})) // if no filters were present
                result = undefined;
            return result;
        }
    })

    .filter('meetingFilterBroken', function($filter) {
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


    .filter('selectedFiltersBroken', function() {
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
    })