


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
            selected: false
        },
        {
            text: "Narcotics Anonymous",
            imgSrc: "images/NAcircle.png",
            cssClass: "NA",
            selected: false
        }
    ],
    days: [
        // days - array of 7 days, 0..6 = Mon..Sun
        // each day has display "text" and "selected" boolean
        {
            text: "MON",
            queryString: "Mo",
            selected: false
        },
        {
            text: "TUE",
            queryString: "Tu",
            selected: false
        },
        {
            text: "WED",
            queryString: "We",
            selected: false
        },
        {
            text: "THU",
            queryString: "Th",
            selected: false
        },
        {
            text: "FRI",
            queryString: "Fr",
            selected: false
        },
        {
            text: "SAT",
            queryString: "Sa",
            selected: false
        },
        {
            text: "SUN",
            queryString: "Su",
            selected: false
        }
    ],
    times: [
        {
            text1: "morning",
            text2: "6AM - 12PM",
            imgFilename: "clock",
            selected: false
        },
        {
            text1: "afternoon",
            text2: "12PM - 5PM",
            imgFilename: "clock",
            selected: false
        },
        {
            text1: "evening",
            text2: "5PM - 8PM",
            imgFilename: "clock",
            selected: false
        },
        {
            text1: "night",
            text2: "8PM AND ON",
            imgFilename: "clock",
            selected: false
        }
    ],
    ratings: [
        {
            text: "snacks",
            selected: false
        },
        {
            text: "young people",
            selected: false
        },
        {
            text: "large group",
            selected: false
        },
        {
            text: "lgbt",
            selected: false
        },
        {
            text: "meditation",
            selected: false
        },
        {
            text: "mens",
            selected: false
        },
        {
            text: "newcomer",
            selected: false
        },
        {
            text: "outsiders welcome",
            cssClass: "outsiders",
            imgFilename: "outsiders",
            selected: false
        },
        {
            text: "womens",
            selected: false
        },
        {
            text: "young people",
            selected: false
        },
        {
            text: "wheelchair",
            selected: false
        },
        {
            text: "pets allowed",
            cssClass: "pets",
            imgFilename: "pets",
            selected: false
        }
    ]
};