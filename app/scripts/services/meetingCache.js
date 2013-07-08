'use strict';

angular.module('addicaidSiteApp')
  .factory('meetingCache', ['eventService', '$http', '$rootScope', '$filter', 'timeInterval', '$timeout', 'meetingServer', 'distanceMath', 'filterModuleInterface', 'filterService', '$q', function(eventService, $http, $rootScope, $filter, timeInterval, $timeout, meetingServer, distanceMath, filterModuleInterface, filterService, $q) {
    var serviceAPI = {
    };


    var searchBounds; //new google.maps.LatLngBounds(new google.maps.LatLng(0,0), new google.maps.LatLng(0,0)); // google.maps.LatLngBounds
    var limitTo;

    var isDirty = true; // flag used to determine whether server needs to be called for new data
    var isWaitingForData = false;

    var cachedMeetings = []; // latest list of meetings retrieved from server




    var calculateSearchBounds = function(mapBounds) {
      // Increase the size of the search boundary from a given map bounds
      // mapBounds is type google.maps.LatLngBounds
      // returns a new google.maps.LatLngBounds object
      return new google.maps.LatLngBounds(mapBounds.getSouthWest(), mapBounds.getNorthEast());
    };





    // isMeetingStartingSoon(meeting)
    // returns true if meeting is starting soon
    var isMeetingStartingSoon = function(meeting) {
      var threshold = 4; // max hours from now that a meeting is considered "soon"
      var now = new Date();
      var t = meeting.schedule.timeObj;

      var isSoon = now.getUTCDay() === t.getUTCDay() &&
        t.getUTCHours() >= now.getUTCHours() &&
        t.getUTCHours() <= now.getUTCHours()+threshold;

      return isSoon;
    };





    var processMeetings = function(meetings) {
      cachedMeetings = angular.isNumber(limitTo) ? $filter('limitTo')(meetings,limitTo) : meetings;
      // PROCESS MEETINGS CACHE
      angular.forEach(cachedMeetings, function(meeting) {

        // clean up time
        var day;
        /* jshint -W015 */
        switch (meeting.schedule.dayAbbrev) {
          case 'SU':
            day = 0;
            break;
          case 'MO':
            day = 1;
            break;
          case 'TU':
            day = 2;
            break;
          case 'WE':
            day = 3;
            break;
          case 'TH':
            day = 4;
            break;
          case 'FR':
            day = 5;
            break;
          case 'SA':
            day = 6;
            break;
        }
        /* jshint +W015 */

//        var dt = new Date(1,0,day,0,0,0,0); // we dont care about year/month, but let's set day of week
        var dt = new Date();
        dt.setFullYear(1,0,day); // we dont care about year/month, but let's set day of week
        dt.setHours(meeting.schedule.time.split(':')[0], meeting.schedule.time.split(':')[1], 0);
//        console.log(dt.toUTCString())
//        console.log(meeting.schedule.dayAbbrev, meeting.schedule.time, meeting.schedule.time.split(':'), dt.getDay(), dt.getUTCDay())
//        console.log(meeting.schedule.time.split(':'))
//        dt.setHours(meeting.schedule.time.split(':')[0]);
//        dt.setMinutes(meeting.schedule.time.split(':')[1]);
//        dt.setSeconds(0);
        angular.extend(meeting.schedule, {
          timeObj: dt,
          timeAsNumber: parseInt(meeting.schedule.time.split(':')[0] + meeting.schedule.time.split(':')[1], 10)
        });
//        console.log(meeting.schedule.time, meeting.schedule.timeAsNumber)
//        console.log(meeting.schedule.dayAbbrev, meeting.schedule.time, meeting.schedule.time.split(':'), dt.getDay(), dt.getUTCDay())
        // todo: clean console.logs


        // add isSoon info
        angular.extend(meeting.schedule, {
          isSoon: isMeetingStartingSoon(meeting)
        });

        // google maps directions api
        angular.extend(meeting.location, {
          google: {
            q: meeting.location.address.address1.replace(' ','+') + ',' + meeting.location.address.city.city.replace(' ','+') + ',' + meeting.location.address.city.state.replace(' ','+') + ','
          }
        });

        // distance calculation
        var distance = distanceMath.distance(filterModuleInterface.getCurrentLocationLatLng().lat(), filterModuleInterface.getCurrentLocationLatLng().lng(), meeting.location.center.latitude, meeting.location.center.longitude, 'M');
        angular.extend(meeting, { distance: distance });
      });

      isDirty = false;
      console.log('*** got '+ cachedMeetings.length + ' meetings (' + serviceAPI.getMeetingsFromCache().length + ' filtered) ***');
      eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent  );
    };




    // register filter change events
    eventService.registerRootEventHandler(eventService.filterChangedEvent, function() {
      eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent  );
    });
//    eventService.registerRootEventHandler(eventService.locationFilterChangedEvent, function() {
//      eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent  );
//    });





    // Public API
    angular.extend(serviceAPI, {
      setMapBounds: function(mapBounds) {
        // sets the searchBounds based on the input map bounds
        // bb is the bounding box of type google.maps.LatLngBounds
        var wasDefined = angular.isDefined(searchBounds);
        searchBounds = calculateSearchBounds(mapBounds);
        isDirty = true;
        if (!wasDefined && angular.isDefined(mapBounds)) {
          // send refresh event on first time setting searchBounds object
          eventService.broadcastRootEvent(eventService.dataCacheRefreshedEvent  );
        }
      },
//      setCurrentLocation: function(latLng) {
//        // sets the current location
//        // latLng is of type google.maps.LatLng
//        currentLocation = new google.maps.LatLng(latLng.lat(), latLng.lng());
//        isDirty = true;
//      },
      setLimitTo: function(limit) {
        limitTo = limit;
      },
      getMeetingsFromCache: function(callingFuncName) {
        // bb is the bounding box of type google.maps.LatLngBounds
        console.log('***>>> meetingCache.getMeetingsFromCache - '+ callingFuncName + ' and isDirty='+isDirty+' and isDefined(searchBounds)='+angular.isDefined(searchBounds)); // optional arg used for logging to determine where call originated

        var deferred = $q.defer();

        if (isDirty && angular.isDefined(searchBounds) && !isWaitingForData) {
          isWaitingForData = true;
          meetingServer.getMeetingsFromServer(searchBounds, callingFuncName)
            .then(function(meetings) {
              processMeetings(meetings);
              isWaitingForData = false;
            }, function(reason) {
              isWaitingForData = false;
            });
        }

        // TODO: need promises here.  for now, returns the old cachedMeetings and use broadcast to make change
        return filterService.filter(cachedMeetings);
        // return: array of meeting objects from server
      },
      getCurrentLocationLatLng: function() {
        return filterModuleInterface.getCurrentLocationLatLng();
      }



    });

    return serviceAPI;
  }]);
