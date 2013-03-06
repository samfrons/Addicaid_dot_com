
//var defaultCoordinates = { // NYC
//    latitude : 40.763562,
//    longitude : -73.97140100000001
//};
var defaultCoordinates = { // San Fran
    latitude : 37.771139,
    longitude : -122.403424
};
var defaultST_Point = function() {
    return "ST_Point(" + defaultCoordinates.longitude.toString() + ", " + defaultCoordinates.latitude.toString() + ")";
}
var defaultCartodbAccount = "bigmickey";
var defaultCartodbTable = "intherooms";
var defaultCartodbSql = "SELECT rooms.*, ST_Distance(ST_AsText(rooms.the_geom), ST_AsText("+defaultST_Point()+")) as dst from "+defaultCartodbTable+" rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText("+defaultST_Point()+")) as dst FROM "+defaultCartodbTable+" where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 100";
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-73.97140100000001, 40.763562))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-122.416728, 37.777182))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40










angular.module('addicaidApp')
    .factory('meetingSvc', function($http, $rootScope, filterSvc) {
//    $http.get('testfiles/meetings-big.json').success(function(data) {
//        $scope.meetings = data;
//    });
        var meetingSvc = {
            baseUrl: "http://addicaid.appspot.com/meetings/jsonp",
            testUrl: "http://addicaid.appspot.com/meetings/jsonp?daylist=MoTu&callback=JSON_CALLBACK",

            isFilterDirty: true, // flag used to determine whether server needs to be called for new data
            waitingForServerResults: false, // flag to make sure only one server request at a time

            meetingsCache: [], // latest list of meetings retrieved from server
            meetingsChangedEvent: "meetingsChanged"
        };

        // current location
        meetingSvc.getCurrentLocation = function() {
            return {
                latitude: defaultCoordinates.latitude,
                longitude: defaultCoordinates.longitude
            };
        };


        // helper css string functions
        var namify = function namify(filterObj, param) {
            var result = "";
            if (filterObj[param] !== undefined) {
                result = filterObj[param];
            } else {
                result = filterObj.text.replace(" ", "_");
            }
            return result;
        }
        meetingSvc.getImgSrc = function(filterObj) {
            return "images/" + namify(filterObj, "imgFilename") + ".png";
        }
        meetingSvc.getCssClass = function(filterObj) {
            return namify(filterObj, "cssClass");
        }


        meetingSvc.getMeetingsFromServer = function() {
            log ("getMeetingsFromServer")
            // Retrieves meeting objects from server based on current filters
            if (meetingSvc.isFilterDirty && !meetingSvc.waitingForServerResults) {
                // populate meetings from server
                meetingSvc.waitingForServerResults = true;
               // $http.jsonp(meetingSvc.getUrl())
                $http.get("testfiles/meetings-demo.json")// TODO: HACK using local json file
                    .success(function(data, status) {
                        meetingSvc.meetingsCache = data.value;

//                        // TODO: fake data-carto
//                        $http.jsonp('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK')
//                            .success(function(data,status) {
//                                log('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK');
//                                for (var i=0; i < meetingSvc.meetingsCache.length; i++) {
//                                    meetingSvc.meetingsCache[i].latLon.latitude = data.rows[i].latitude;
//                                    meetingSvc.meetingsCache[i].latLon.longitude = data.rows[i].longitude;
//                                }
//
//
//                                meetingSvc.isFilterDirty = false;
//                                $rootScope.$broadcast(meetingSvc.meetingsChangedEvent, [/* meetingsChangedArgs */]);
//                            })

//                        // TODO: fake data-favorites
//                        for (var i=0; i < meetingSvc.meetingsCache.length; i++) {
//                            meetingSvc.meetingsCache[i].isFavorite = Math.random()<.2 ? true : false;
//                        }

                        // TODO: fake data-ratings
//                        for (var i=0; i < meetingSvc.meetingsCache.length; i++) {
//                            meetingSvc.meetingsCache[i].rating = getFakeRating(meetingSvc.meetingsCache[i]);
//                        }

                        // TODO: single meeting
//                        meetingSvc.meetingsCache = [ meetingSvc.meetingsCache[0] ];

                        // PROCESS MEETINGS CACHE
                        angular.forEach(meetingSvc.meetingsCache, function(meeting) {
                            // clean up ratings object
                            var newRatings = {};
                            angular.forEach(meeting.rating, function(value, key) {
                                if (value) newRatings[key] = value;
                            });
                            meeting.rating = newRatings;


                            // clean up time
                            meeting.time = meeting.time.split(":")[0] + ":" + meeting.time.split(":")[1];

                            // TODO: HACK change time on wed womens meeting
                            if (meeting.id == 73021) {
                                meeting.time = "19:00";
                                meeting.timeAsNumber = 19;
                            }
//                            log(meeting)
                        });

                        meetingSvc.isFilterDirty = false;
                        meetingSvc.waitingForServerResults = false;
                        log("******** got "+meetingSvc.meetingsCache.length+" meetings **********")
                        $rootScope.$broadcast(meetingSvc.meetingsChangedEvent, [/* meetingsChangedArgs */]);
                    })
                    .error(function(data,status) {
                        // TODO: error handling
                        log("FAILURE", data, status);
                    });
            }
        };

        // converts an array of day filter objects to a daylist query string parameter
        meetingSvc.getQueryString_Days = function() {
            var queryString = "";
            for (var i=0; i < filterSvc.filters.days.length; i++) {
//                if (filterSvc.filters.days[i].selected) {
                    queryString += filterSvc.filters.days[i].queryString;
//                }
            }
            if (queryString != "") {
                queryString = "daylist=" + queryString;
            }
            return queryString;
        };

        meetingSvc.getUrl = function() { // returns url for jsonp call
            var url = meetingSvc.baseUrl;
            // TODO: complete function
//            testUrl: "http://addicaid.appspot.com/meetings/jsonp?daylist=MoTu&callback=JSON_CALLBACK",

            // add daylist filter
            url += "?";
            url += meetingSvc.getQueryString_Days();

            // add location
            if (filterSvc.filters.location.useCurrentLocation) {
                url += "&lat=" + meetingSvc.getCurrentLocation().latitude;
                url += "&long=" + meetingSvc.getCurrentLocation().longitude;
//                // TODO: HACK swap lat lng
//                url += "&lat=" + meetingSvc.getCurrentLocation().longitude;
//                url += "&long=" + meetingSvc.getCurrentLocation().latitude;
            } else if (filterSvc.filters.location.zip) {
                url += "&address=" + encodeURI(filterSvc.filters.location.zip)
            }

            // add jsonp callback
            url += "&callback=JSON_CALLBACK"; // needed for angular $http.jsonp() to work

            log("meetingSvc url",url)
            return url;
        };

        meetingSvc.getMeetings = function() {
            log ("getMeetings - "+arguments[0])
            if (meetingSvc.isFilterDirty) {
                meetingSvc.getMeetingsFromServer();
            }

            // TODO: need promises here.  for now, returns the old meetingsCache and use broadcast to make change
            return meetingSvc.meetingsCache;
            // return: array of meeting objects from server
        }

        meetingSvc.getMeetingsFavoritesOnly = function() {
            log ("getMeetingsFavoritesOnly")
            var allMeetings = meetingSvc.getMeetings("getMeetingsFavoritesOnly");
            var favorites = [];
            for (var i=0; i<allMeetings.length; i++) {
                if (allMeetings[i].isFavorite) {
                    favorites.push(allMeetings[i]);
                }
            }
            log("favorites",favorites, allMeetings);
            return favorites;
        }

        meetingSvc.getMeetingByID = function(meetingID) {
            for (var i=0; i < meetingSvc.getMeetings().length; i++) {
                if (meetingSvc.getMeetings()[i].id == meetingID) {
                    return meetingSvc.getMeetings()[i];
                }
            }
            return null;
        }

        // isMeetingStartingSoon(meeting)
        // returns true if meeting is starting soon
        meetingSvc.isMeetingStartingSoon= function(meeting) {
            var threshold = 4; // max hours from now that a meetin is considered "soon"
            var now = new Date();

            var timeMatch = meeting.time.match(/(\d+)(:)(\d\d)/);
            var hours = parseInt(timeMatch[1]);
            var min = parseInt(timeMatch[2]);

            var days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

            var isSoon = now.getDay() == days.indexOf(meeting.day) // same day
                && hours >= now.getHours()
                && hours <= now.getHours()+threshold; // meeting starting within next threshold hours
            if (isSoon)
                log('meeting coming up !')
            return isSoon;
        }



        var getFakeRating = function(meeting) {
            var fakeRatings =
                [
//                    {
//                        forYoungPeople: true,
//                        isLgbt: true,
//                        forWomen: true,
//                        forNewcomer: true,
//                        outsidersWelcome: true,
//                        hasWheelchairAccess: true,
//                        petsAllowed: true,
//                        isHasSnacks: true,
//                        isLargeGroup: true,
//                        isHasMeditation: true,
//                        isForMen: true,
//                        hasCoffee: true
//                    },
                    {forYoungPeople: true, isLgbt: true},
                    {isLgbt: true, hasWheelchairAccess: true, isHasSnacks: true},
                    {isHasSnacks: true, petsAllowed: true},
                    {outsidersWelcome: true, petsAllowed: true, hasCoffee: true},
                    {isHasSnacks: true, hasWheelchairAccess: true, isLargeGroup: true},
                    {isForMen: true, hasWheelchairAccess: true, isLargeGroup: true},
                    {forWomen: true, hasCoffee: true},
                    {isHasMeditation: true}
                ];

            var newRating = angular.copy(meeting.rating);
            var rando = fakeRatings[Math.floor(Math.random()*fakeRatings.length)];
            return angular.copy(rando);
        }




        // FAKE DATA METHODS
        meetingSvc.injectFakeLatLng = function() {

        };


        // get initial meeting list from database
        meetingSvc.getMeetingsFromServer();

        return meetingSvc;
    });