
//var defaultCoordinates = { // NYC
//    latitude : 40.763562,
//    longitude : -73.97140100000001
//};
var defaultCoordinates = { // San Fran
    latitude : 37.777182,
    longitude : -122.416728
};
var defaultST_Point = function() {
    return "ST_Point(" + defaultCoordinates.longitude.toString() + ", " + defaultCoordinates.latitude.toString() + ")";
}
var defaultCartodbAccount = "bigmickey";
var defaultCartodbTable = "intherooms";
var defaultCartodbSql = "SELECT rooms.*, ST_Distance(ST_AsText(rooms.the_geom), ST_AsText("+defaultST_Point()+")) as dst from "+defaultCartodbTable+" rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText("+defaultST_Point()+")) as dst FROM "+defaultCartodbTable+" where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 100";
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-73.97140100000001, 40.763562))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-122.416728, 37.777182))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40










angular.module('addicaidApp')
    .factory('meetingsService', function($http, $rootScope) {
//    $http.get('testfiles/meetings-big.json').success(function(data) {
//        $scope.meetings = data;
//    });
        var meetingsService = {
            baseUrl: "http://addicaid.appspot.com/meetings/jsonp",
            testUrl: "http://addicaid.appspot.com/meetings/jsonp?daylist=MoTu&callback=JSON_CALLBACK",
            filters: {
                location: {
                    useCurrentLocation: "true"
                    // radius
                    // inputLocation
                },
                fellowships: [
                    {
                        text: "Alcoholics Anonymous",
                        cssClass: "AA",
                        selected: true
                    },
                    {
                        text: "Narcotics Anonymous",
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

            },
            isFilterDirty: true, // flag used to determine whether server needs to be called for new data

            meetingsCache: [], // latest list of meetings retrieved from server
            meetingsChangedEvent: "meetingsChanged"
        };

        var namify = function namify(filterObj, param) {
            var result = "";
            if (filterObj[param] !== undefined) {
                result = filterObj[param];
            } else {
                result = filterObj.text.replace(" ", "_");
            }
            return result;
        }
        meetingsService.getImgSrc = function(filterObj) {
            return "images/" + namify(filterObj, "imgFilename") + ".png";
        }
        meetingsService.getCssClass = function(filterObj) {
            return namify(filterObj, "cssClass");
        }

        meetingsService.getFilters = function() {
            return angular.copy(meetingsService.filters);
        }
        meetingsService.setFilters = function(filters) {
            meetingsService.filters = angular.copy(filters);
            meetingsService.isFilterDirty = true;
            meetingsService.getMeetingsFromServer();
        };

        meetingsService.getMeetingsFromServer = function() {
            log ("getMeetingsFromServer")
            // Retrieves meeting objects from server based on current filters
            if (meetingsService.isFilterDirty) {
                // populate meetings from server
                $http.jsonp(meetingsService.getUrl())
                    .success(function(data, status) {
                        meetingsService.meetingsCache = data.value;

                        // TODO: fake data
                        $http.jsonp('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK')
                            .success(function(data,status) {
//                                log('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK');
                                for (var i=0; i < meetingsService.meetingsCache.length; i++) {
                                    meetingsService.meetingsCache[i].latLon.latitude = data.rows[i].latitude;
                                    meetingsService.meetingsCache[i].latLon.longitude = data.rows[i].longitude;
                                    meetingsService.meetingsCache[i].isFavorite = Math.random()<.2 ? true : false;
                                }


                                meetingsService.isFilterDirty = false;
                                $rootScope.$broadcast(meetingsService.meetingsChangedEvent, [/* meetingsChangedArgs */]);
                            })

//                        meetingsService.isFilterDirty = false;
//                        $rootScope.$broadcast(meetingsService.meetingsChangedEvent, [/* meetingsChangedArgs */]);
                    })
                    .error(function(data,status) {
                        // TODO: error handling
                        log("FAILURE", data, status);
                    });
            }
        };

        // converts an array of day filter objects to a daylist query string parameter
        meetingsService.getQueryString_Days = function() {
            var queryString = "";
            for (var i=0; i < meetingsService.filters.days.length; i++) {
                if (meetingsService.filters.days[i].selected) {
                    queryString += meetingsService.filters.days[i].queryString;
                }
            }
            if (queryString != "") {
                queryString = "daylist=" + queryString;
            }
            return queryString;
        };

        meetingsService.getUrl = function() { // returns url for jsonp call
            var url = meetingsService.baseUrl;
            // TODO: complete function
//            testUrl: "http://addicaid.appspot.com/meetings/jsonp?daylist=MoTu&callback=JSON_CALLBACK",

            // add daylist filter
            url += "?";
            url += meetingsService.getQueryString_Days();
            url += "&callback=JSON_CALLBACK"; // needed for angular $http.jsonp() to work
//            url = meetingsService.testUrl;
            log("url",url)
            return url;
        };

        meetingsService.getMeetings = function() {
            log ("getMeetings - "+arguments[0])
            if (meetingsService.isFilterDirty) {
                meetingsService.getMeetingsFromServer();
            }

            // TODO: need promises here.  for now, returns the old meetingsCache and use broadcast to make change
            return meetingsService.meetingsCache;
            // return: array of meeting objects from server
        }

        meetingsService.getMeetingsFavoritesOnly = function() {
            log ("getMeetingsFavoritesOnly")
            var allMeetings = meetingsService.getMeetings("getMeetingsFavoritesOnly");
            var favorites = [];
            for (var i=0; i<allMeetings.length; i++) {
                if (allMeetings[i].isFavorite) {
                    favorites.push(allMeetings[i]);
                }
            }
            log("favorites",favorites, allMeetings);
            return favorites;
        }










        // FAKE DATA METHODS
        meetingsService.injectFakeLatLng = function() {

        };


        // get initial meeting list from database
//        meetingsService.getMeetingsFromServer();

        return meetingsService;
    });