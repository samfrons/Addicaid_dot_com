'use strict';

angular.module('addicaidSiteApp')
  .factory('meetings', ['$http', '$rootScope', '$filter', 'timeInterval', '$timeout', 'meetingsData', 'distanceMath', function($http, $rootScope, $filter, timeInterval, $timeout, meetingsData, distanceMath) {
//  .factory('meetings', ['$resource', function($resource) {
//    var defaultCoordinates = new google.maps.LatLng(40.763562, -73.97140100000001);  // NYC
//    var defaultCoordinates = new google.maps.LatLng(42.25113,-73.791435);  // upstate NY, for testfile
    var defaultCoordinates = new google.maps.LatLng(37.771139, -122.403424);  // San Francisco
//    var defaultCoordinates = new google.maps.LatLng(34.536107,-117.291156);  // Victorville, CA


    var serviceAPI = {
      meetingsChangedEvent: 'meetingsChanged',
      defaultCoordinates: defaultCoordinates // for debugging, until geolocation works
    };


    var searchBounds; //new google.maps.LatLngBounds(new google.maps.LatLng(0,0), new google.maps.LatLng(0,0)); // google.maps.LatLngBounds
    var currentLocation = new google.maps.LatLng(defaultCoordinates.lat(), defaultCoordinates.lng()); // google.maps.LatLng
    var limitTo;

    var isDirty = true; // flag used to determine whether server needs to be called for new data

    var meetingsCache = []; // latest list of meetings retrieved from server




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
      meetingsCache = angular.isNumber(limitTo) ? $filter('limitTo')(meetings,limitTo) : meetings;
      // PROCESS MEETINGS CACHE
      angular.forEach(meetingsCache, function(meeting) {

        // clean up time
        var day;
        switch (meeting.schedule.dayAbbrev) {
          case 'SU': day = 0; break;
          case 'MO': day = 1; break;
          case 'TU': day = 2; break;
          case 'WE': day = 3; break;
          case 'TH': day = 4; break;
          case 'FR': day = 5; break;
          case 'SA': day = 6; break;
        }
        var dt = new Date(1,0,day); // we dont care about year/month, but let's set day of week
        dt.setUTCHours(meeting.schedule.time.split(':')[0]);
        dt.setUTCMinutes(meeting.schedule.time.split(':')[1]);
        dt.setUTCSeconds(0);
        angular.extend(meeting.schedule, {
          timeObj: dt
        });

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
        var distance = distanceMath.distance(currentLocation.lat(), currentLocation.lng(), meeting.location.center.latitude, meeting.location.center.longitude, 'M');
        angular.extend(meeting, { distance: distance });
      });

      isDirty = false;
      console.log('*** got '+ meetingsCache.length + ' meetings ***');
      $rootScope.$broadcast(serviceAPI.meetingsChangedEvent, [/* meetingsChangedArgs */]);
    };











    // Public API
    angular.extend(serviceAPI, {
      setMapBounds: function(mapBounds) {
        // sets the searchBounds based on the input map bounds
        // bb is the bounding box of type google.maps.LatLngBounds
        searchBounds = calculateSearchBounds(mapBounds);
        isDirty = true;
      },
      setCurrentLocation: function(latLng) {
        // sets the current location
        // latLng is of type google.maps.LatLng
        currentLocation = new google.maps.LatLng(latLng.lat(), latLng.lng());
        isDirty = true;
      },
      setLimitTo: function(limit) {
        limitTo = limit;
      },
      getMeetings: function(callingFuncName) {
        // bb is the bounding box of type google.maps.LatLngBounds
        console.log('getMeetings - '+ callingFuncName + ' and isDirty='+isDirty); // optional arg used for logging to determine where call originated
        if (isDirty && angular.isDefined(searchBounds)) {
          meetingsData.getMeetings(searchBounds).then(function(meetings) {
            processMeetings(meetings);
          });
        }

        // TODO: need promises here.  for now, returns the old meetingsCache and use broadcast to make change
        return meetingsCache;
        // return: array of meeting objects from server
      }

    });

    return serviceAPI;
  }]);
