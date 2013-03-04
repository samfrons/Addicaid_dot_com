


angular.module('addicaidApp')
    .factory('filterSvc', function($http, $rootScope) {

        var filterSvc = {
            filters: angular.copy(defaultFiltersObject)
        };


//        meetingSvc.getFilters = function() {
//            return angular.copy(meetingSvc.filters);
//        }
//        meetingSvc.setFilters = function(filters) {
//            meetingSvc.filters = angular.copy(filters);
//            meetingSvc.isFilterDirty = true;
//            meetingSvc.getMeetingsFromServer();
//        };

        return filterSvc;
    });


var defaultFiltersObject = {
    location: {
        useCurrentLocation: "true"
        // radius
        // inputLocation
    },
    fellowships: [
        {
            text: "Alcoholics Anonymous",
            cssClass: "AA",
            imgSrc: "images/AAcircle.png",
            selected: true
        },
        {
            text: "Narcotics Anonymous",
            imgSrc: "images/NAcircle.png",
            cssClass: "NA",
            selected: true
        }
    ],
    days: [
        // days - array of 7 days, 0..6 = Mon..Sun
        // each day has display "text" and "selected" boolean
        {
            text: "MON",
            queryString: "Mo",
            selected: true
        },
        {
            text: "TUE",
            queryString: "Tu",
            selected: true
        },
        {
            text: "WED",
            queryString: "We",
            selected: true
        },
        {
            text: "THU",
            queryString: "Th",
            selected: true
        },
        {
            text: "FRI",
            queryString: "Fr",
            selected: true
        },
        {
            text: "SAT",
            queryString: "Sa",
            selected: true
        },
        {
            text: "SUN",
            queryString: "Su",
            selected: true
        }
    ],
    times: [
        {
            text1: "morning",
            text2: "6AM - 12PM",
            imgFilename: "clock",
            selected: true
        },
        {
            text1: "afternoon",
            text2: "12PM - 5PM",
            imgFilename: "clock",
            selected: true
        },
        {
            text1: "evening",
            text2: "5PM - 8PM",
            imgFilename: "clock",
            selected: true
        },
        {
            text1: "night",
            text2: "8PM AND ON",
            imgFilename: "clock",
            selected: true
        }
    ],
    ratings: [
        {
            text: "snacks",
            selected: true
        },
        {
            text: "young people",
            selected: true
        },
        {
            text: "large group",
            selected: true
        },
        {
            text: "lgbt",
            selected: true
        },
        {
            text: "meditation",
            selected: true
        },
        {
            text: "mens",
            selected: true
        },
        {
            text: "newcomer",
            selected: true
        },
        {
            text: "outsiders welcome",
            cssClass: "outsiders",
            imgFilename: "outsiders",
            selected: true
        },
        {
            text: "womens",
            selected: true
        },
        {
            text: "young people",
            selected: true
        },
        {
            text: "wheelchair",
            selected: true
        },
        {
            text: "pets allowed",
            cssClass: "pets",
            imgFilename: "pets",
            selected: true
        }
    ]
};