'use strict';



angular.module('addicaidApp')
  .factory('meetingSvc', ['$http', '$rootScope', 'filterSvc', 'geolocationBrowser', function($http, $rootScope, filterSvc, geolocation) {
    var meetingSvc = {
      baseUrl: 'http://addicaid.appspot.com/meetings/jsonp',
      testUrl: 'http://addicaid.appspot.com/meetings/jsonp?daylist=MoTu&callback=JSON_CALLBACK',

      isFilterDirty: true, // flag used to determine whether server needs to be called for new data
      waitingForServerResults: false, // flag to make sure only one server request at a time

      meetingsCache: [], // latest list of meetings retrieved from server
      meetingsChangedEvent: 'meetingsChanged'
    };

    // helper css string functions
    var namify = function namify(filterObj, param) {
      var result = '';
      if (filterObj[param] !== undefined) {
        result = filterObj[param];
      } else {
        result = filterObj.text.replace(' ', '_');
      }
      return result;
    };
    meetingSvc.getImgSrc = function(filterObj) {
      return 'images/' + namify(filterObj, 'imgFilename') + '.png';
    };
    meetingSvc.getCssClass = function(filterObj) {
      return namify(filterObj, 'cssClass');
    };


    meetingSvc.getMeetingsFromServer = function() {
      console.log('getMeetingsFromServer');
      // Retrieves meeting objects from server based on current filters
      if (meetingSvc.isFilterDirty && !meetingSvc.waitingForServerResults) {
        // populate meetings from server
        meetingSvc.waitingForServerResults = true;
        meetingSvc.getUrl().then(function(url) {
          $http.jsonp(url)
//          $http.get("../../app/testfiles/meetings-demo.json")// TODO: HACK using local json file
            .success(function(data) {
              meetingSvc.meetingsCache = data.value;

//                        // TODO: fake data-favorites
//                        for (var i=0; i < meetingSvc.meetingsCache.length; i++) {
//                            meetingSvc.meetingsCache[i].isFavorite = Math.random()<.2 ? true : false;
//                        }

              // PROCESS MEETINGS CACHE
              angular.forEach(meetingSvc.meetingsCache, function(meeting) {
                // clean up ratings object
                var newRatings = {};
                angular.forEach(meeting.rating, function(value, key) {
                  if (value) {
                    newRatings[key] = value;
                  }
                });
                meeting.rating = newRatings;


                // clean up time
                meeting.time = meeting.time.split(':')[0] + ':' + meeting.time.split(':')[1];

                // TODO: HACK change time on wed womens meeting
                if (meeting.id === 73021) {
                  meeting.time = '19:00';
                  meeting.timeAsNumber = 19;
                }
              });

              meetingSvc.isFilterDirty = false;
              meetingSvc.waitingForServerResults = false;
              console.log('******** got ' + meetingSvc.meetingsCache.length + ' meetings **********');
              $rootScope.$broadcast(meetingSvc.meetingsChangedEvent, [/* meetingsChangedArgs */]);
            })
            .error(function(data,status) {
              // TODO: error handling
              console.log('FAILURE', data, status);
            });
        });

      }
    };

    // converts an array of day filter objects to a daylist query string parameter
    meetingSvc.getQueryStringDays = function() {
      var queryString = '';
      for (var i = 0; i < filterSvc.filters.days.length; i++) {
//                if (filterSvc.filters.days[i].selected) {
        queryString += filterSvc.filters.days[i].queryString;
//                }
      }
      if (queryString !== '') {
        queryString = 'daylist=' + queryString;
      }
      return queryString;
    };

    meetingSvc.getUrl = function() { // returns url for jsonp call
      var urlPromise = geolocation.getCurrentLocation() // a promise
        .then(function(coords) {
          var url = meetingSvc.baseUrl;

          // add daylist filter
          url += '?';
          url += meetingSvc.getQueryStringDays();

          // add location
          if (filterSvc.filters.location.useCurrentLocation) {
            url += '&lat=' + coords.latitude;
            url += '&long=' + coords.longitude;
          } else if (filterSvc.filters.location.zip) { // TODO: performance: if manual zip, don't do geolocation
            url += '&address=' + encodeURI(filterSvc.filters.location.zip);
          }

          // add jsonp callback
          url += '&callback=JSON_CALLBACK'; // needed for angular $http.jsonp() to work

          console.log('meetingSvc url', url);
          return url; // return url to promise
        });

      return urlPromise;
    };

    meetingSvc.getMeetings = function() {
      console.log('getMeetings - ' + arguments[0]);
      if (meetingSvc.isFilterDirty) {
        meetingSvc.getMeetingsFromServer();
      }

      // TODO: need promises here.  for now, returns the old meetingsCache and use broadcast to make change
      return meetingSvc.meetingsCache;
      // return: array of meeting objects from server
    };

    meetingSvc.getMeetingsFavoritesOnly = function() {
      console.log('getMeetingsFavoritesOnly');
      var allMeetings = meetingSvc.getMeetings('getMeetingsFavoritesOnly');
      var favorites = [];
      for (var i = 0; i < allMeetings.length; i++) {
        if (allMeetings[i].isFavorite) {
          favorites.push(allMeetings[i]);
        }
      }
      console.log('favorites', favorites, allMeetings);
      return favorites;
    };

    meetingSvc.getMeetingByID = function(meetingID) {
      if (angular.isString(meetingID)) {
        meetingID = parseInt(meetingID, 10);
      }
      for (var i = 0; i < meetingSvc.getMeetings().length; i++) {
        if (meetingSvc.getMeetings()[i].id === meetingID) {
          return meetingSvc.getMeetings()[i];
        }
      }
      return null; // TODO: error case?
    };

    // isMeetingStartingSoon(meeting)
    // returns true if meeting is starting soon
    meetingSvc.isMeetingStartingSoon = function(meeting) {
      var threshold = 4; // max hours from now that a meetin is considered "soon"
      var now = new Date();

      var timeMatch = meeting.time.match(/(\d+)(:)(\d\d)/);
      var hours = parseInt(timeMatch[1], 10);
//      var min = parseInt(timeMatch[2], 10);

      var days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

      var isSoon = now.getDay() === days.indexOf(meeting.day) // same day
        && hours >= now.getHours()
        && hours <= now.getHours() + threshold; // meeting starting within next threshold hours
      return isSoon;
    };



    var getFakeRating = function() {
      /* jshint -W098 */

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

      var rando = fakeRatings[Math.floor(Math.random() * fakeRatings.length)];
      return angular.copy(rando);
    };




    // FAKE DATA METHODS
    meetingSvc.injectFakeLatLng = function() {

    };


    // get initial meeting list from database
    meetingSvc.getMeetingsFromServer();

    return meetingSvc;

//    // Public API here
//    return {
//      someMethod: function() {
//        return meaningOfLife;
//      }
//    };
  }]);








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
