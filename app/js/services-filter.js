


angular.module('addicaidApp')
    .factory('filterSvc', function($http, $rootScope, $filter) {

        var filterSvc = {};

        filterSvc.resetFilters = function() {
            filterSvc.filters = angular.copy(defaultFiltersObject);
            log("reset")
        }
        filterSvc.resetFilters();

        filterSvc.filtersToApply = function() {
            var filters = [];
            var fellowshipFilters = $filter('selectedFiltersOr')(filterSvc.filters.fellowships);
            if (angular.isDefined(fellowshipFilters)) filters.push(fellowshipFilters);

            var dayFilters = $filter('selectedFiltersOr')(filterSvc.filters.days);
            if (angular.isDefined(dayFilters)) filters.push(dayFilters);

//            var timeFilters = $filter('selectedFilters')(filterSvc.filters.times);
//            if (timeFilters.length > 0) filters.push(timeFilters);

            var ratingFilters = $filter('selectedFiltersAnd')(filterSvc.filters.ratings);
            if (angular.isDefined(ratingFilters)) filters.push(ratingFilters);

            return filters;
        };


        return filterSvc;
    });


var defaultFiltersObject = {
    location: {
        useCurrentLocation: "true",
        radius: null,
        zip: null
    },
    fellowships: [
        {
            text: "Alcoholics Anonymous",
            cssClass: "AA",
            imgSrc: "images/AAcircle.png",
            filters: [ { "fellowship.name" : "AlcoholicsAnonymous" } ],
            selected: false
        },
        {
            text: "Narcotics Anonymous",
            imgSrc: "images/NAcircle.png",
            cssClass: "NA",
            filters: [ { "fellowship.name" : "NarcoticsAnonymous" } ],
            selected: false
        },

        {
            text: "SMART Recovery",
            imgSrc: "images/NAcircle.png",
            cssClass: "NA",
            filters: [ { "fellowship.name" : "SMARTRecovery" } ],
            selected: false
        }
    ],
    days: [
        // days - array of 7 days, 0..6 = Mon..Sun
        // each day has display "text" and "selected" boolean
        {
            text: "MON",
            queryString: "Mo",
            filters: [ { "day" : "MONDAY" } ],
            selected: false
        },
        {
            text: "TUE",
            queryString: "Tu",
            filters: [ { "day" : "TUESDAY" } ],
            selected: false
        },
        {
            text: "WED",
            queryString: "We",
            filters: [ { "day" : "WEDNESDAY" } ],
            selected: false
        },
        {
            text: "THU",
            queryString: "Th",
            filters: [ { "day" : "THURSDAY" } ],
            selected: false
        },
        {
            text: "FRI",
            queryString: "Fr",
            filters: [ { "day" : "FRIDAY" } ],
            selected: false
        },
        {
            text: "SAT",
            queryString: "Sa",
            filters: [ { "day" : "SATURDAY" } ],
            selected: false
        },
        {
            text: "SUN",
            queryString: "Su",
            filters: [ { "day" : "SUNDAY" } ],
            selected: false
        }
    ],
    times: [
        {
            text1: "morning",
            text2: "6AM - 12PM",
            imgFilename: "clock",
            filters: [ { name: "between", key: "timeAsNumber", start: 6, end: 12 } ],
            selected: false
        },
        {
            text1: "afternoon",
            text2: "12PM - 5PM",
            imgFilename: "clock",
            filters: [ { name: "between", key: "timeAsNumber", start: 12, end: 17 } ],
            selected: false
        },
        {
            text1: "evening",
            text2: "5PM - 8PM",
            imgFilename: "clock",
            filters: [ { name: "between", key: "timeAsNumber", start: 17, end: 20 } ],
            selected: false
        },
        {
            text1: "night",
            text2: "8PM...?",
            imgFilename: "clock",
            filters: [
                { name: "between", key: "timeAsNumber", start: 20, end: 24 },
                { name: "between", key: "timeAsNumber", start: 0, end: 6 }
            ],
            selected: false
        }
    ],
    ratings: [
        {
            text: "young people",
            filters: [ { "rating.forYoungPeople" : "true" } ],
            selected: false
        },
        {
            text: "snacks",
            filters: [ { "rating.isHasSnacks" : "true" } ],
            selected: false
        },
        {
            text: "fellowship",
            filters: [ { "rating.forFellowship" : "true" } ],
            selected: false
        },
        {
            text: "cool venue?",
            filters: [ { "rating.isCoolVenue" : "true" } ],
            selected: false
        }
       /* {
            text: "lgbt",
            filters: [ { "rating.isLgbt" : "true" } ],
            selected: false
        },
        {
            text: "newcomer",
            filters: [ { "rating.forNewcomer" : "true" } ],
            selected: false
        },
        {
            text: "outsiders welcome",
            cssClass: "outsiders",
            imgFilename: "outsiders",
            filters: [ { "rating.outsidersWelcome" : "true" } ],
            selected: false
        },
        {
            text: "wheelchair",
            filters: [ { "rating.hasWheelchairAccess" : "true" } ],
            selected: false
        },
        {
            text: "pets allowed",
            cssClass: "pets",
            imgFilename: "pets",
            filters: [ { "rating.petsAllowed" : "true" } ],
            selected: false
        },
        {
            text: "snacks",
            filters: [ { "rating.isHasSnacks" : "true" } ],
            selected: false
        },
        {
            text: "large group",
            filters: [ { "rating.isLargeGroup" : "true" } ],
            selected: false
        },
        {
            text: "coffee",
            filters: [ { "rating.hasCoffee" : "true" } ],
            selected: false
        } */
    ]
};