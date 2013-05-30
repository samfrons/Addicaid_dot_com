'use strict';

angular.module('addicaidSiteApp')
  .factory('meetings', ['$resource', function($resource) {
    var defaultCoordinates = { // NYC
      latitude : 40.763562,
      longitude : -73.97140100000001
    };
//    var defaultCoordinates = { // San Fran
//      latitude : 37.771139,
//      longitude : -122.403424
//    };

// TODO: remove CartoDB stuff
//    var defaultST_Point = function() {
//      return "ST_Point(" + defaultCoordinates.longitude.toString() + ", " + defaultCoordinates.latitude.toString() + ")";
//    }
//    var defaultCartodbAccount = "bigmickey";
//    var defaultCartodbTable = "intherooms";
//    var defaultCartodbSql = "SELECT rooms.*, ST_Distance(ST_AsText(rooms.the_geom), ST_AsText("+defaultST_Point()+")) as dst from "+defaultCartodbTable+" rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText("+defaultST_Point()+")) as dst FROM "+defaultCartodbTable+" where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 100";
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-73.97140100000001, 40.763562))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-122.416728, 37.777182))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40





    var meetingSvc;
    meetingSvc.getMeetingsFromServer = function() {
      console.log ("getMeetingsFromServer")
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
//                                console.log('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK');
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
//                            console.log(meeting)
            });

            meetingSvc.isFilterDirty = false;
            meetingSvc.waitingForServerResults = false;
            console.log("******** got "+meetingSvc.meetingsCache.length+" meetings **********")
            $rootScope.$broadcast(meetingSvc.meetingsChangedEvent, [/* meetingsChangedArgs */]);
          })
          .error(function(data,status) {
            // TODO: error handling
            console.log("FAILURE", data, status);
          });
      }
    };

    // Public API here
    return {
      someMethod: function() {
        return meaningOfLife;
      }
    };
  }]);
