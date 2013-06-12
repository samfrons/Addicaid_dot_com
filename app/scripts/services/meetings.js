'use strict';

angular.module('addicaidSiteApp')
  .factory('meetings', ['$http', '$rootScope', function($http, $rootScope) {
//  .factory('meetings', ['$resource', function($resource) {
    var defaultCoordinates = { // NYC
      latitude: 40.763562,
      longitude: -73.97140100000001
    };
//    var defaultCoordinates = { // San Fran
//      latitude : 37.771139,
//      longitude : -122.403424
//    };
    console.log('defaultCoordinates', defaultCoordinates);


    var serviceAPI = {
      meetingsChangedEvent: 'meetingsChanged'
    };



//    // Url creation items
//    var baseUrl = 'http://addicaid.appspot.com/meetings/jsonp';
//    var testUrl = 'http://addicaid.appspot.com/meetings/jsonp?daylist=MoTu&callback=JSON_CALLBACK';
//    var getCurrentLocation = function() {
//      // current location
//      return {
//        latitude: defaultCoordinates.latitude,
//        longitude: defaultCoordinates.longitude
//      };
//    };




    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
      var R = 6371; // Radius of the earth in km
      var dLat = deg2rad(lat2-lat1);  // deg2rad below
      var dLon = deg2rad(lon2-lon1);
      var a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2)
        ;
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c; // Distance in km
      return d;
    }

    function deg2rad(deg) {
      return deg * (Math.PI/180)
    }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                         :::
//:::  This routine calculates the distance between two points (given the     :::
//:::  latitude/longitude of those points). It is being used to calculate     :::
//:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
//:::                                                                         :::
//:::  Definitions:                                                           :::
//:::    South latitudes are negative, east longitudes are positive           :::
//:::                                                                         :::
//:::  Passed to function:                                                    :::
//:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
//:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
//:::    unit = the unit you desire for results                               :::
//:::           where: 'M' is statute miles                                   :::
//:::                  'K' is kilometers (default)                            :::
//:::                  'N' is nautical miles                                  :::
//:::                                                                         :::
//:::  Worldwide cities and other features databases with latitude longitude  :::
//:::  are available at http://www.geodatasource.com                          :::
//:::                                                                         :::
//:::  For enquiries, please contact sales@geodatasource.com                  :::
//:::                                                                         :::
//:::  Official Web site: http://www.geodatasource.com                        :::
//:::                                                                         :::
//:::               GeoDataSource.com (C) All Rights Reserved 2013            :::
//:::                                                                         :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    // TODO: Distance calculation NEEDS TEST CASES!
    function calculateDistance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var radlon1 = Math.PI * lon1/180;
      var radlon2 = Math.PI * lon2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 };
      if (unit=="N") { dist = dist * 0.8684 };
      return dist;
    }



    var isFilterDirty = true; // flag used to determine whether server needs to be called for new data
    var waitingForServerResults = false; // flag to make sure only one server request at a time

    var meetingsCache = []; // latest list of meetings retrieved from server




    var getMeetingsFromServer = function(currentLocation) {
      console.log('entering getMeetingsFromServer');
      // Retrieves meeting objects from server based on current filters

      if (isFilterDirty && !waitingForServerResults) {
        // populate meetings from server
        waitingForServerResults = true;
        // $http.jsonp(privateAPI.getUrl())
        $http.get('testfiles/meetings.json')// TODO: HACK using local json file
          .success(function(data, status) {
            console.log('success', status);
            meetingsCache = data;
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
              var d = new Date(1,0,day); // we dont care about year/month, but let's set day of week
              d.setUTCHours(meeting.schedule.time.split(':')[0]);
              d.setUTCMinutes(meeting.schedule.time.split(':')[1]);
              d.setUTCSeconds(0);
              angular.extend(meeting.schedule, {
                timeObj: d
              });

              // distance calculation
              var distance = calculateDistance(currentLocation.latitude, currentLocation.longitude, meeting.location.center.latitude, meeting.location.center.longitude, 'M');
              angular.extend(meeting, { distance: distance });
            });

            isFilterDirty = false;
            waitingForServerResults = false;
            console.log('******** got '+ meetingsCache.length + ' meetings **********');
            $rootScope.$broadcast(serviceAPI.meetingsChangedEvent, [/* meetingsChangedArgs */]);
          })
          .error(function(data,status) {
            // TODO: error handling
            console.error('FAILURE', data, status);
          });
      }
    };

    // Public API
    angular.extend(serviceAPI, {
      getMeetings: function() {
        console.log('getMeetings - '+ arguments[0]); // optional arg used for logging to determine where call originated
        if (isFilterDirty) {
          getMeetingsFromServer(defaultCoordinates);
        }

        // TODO: need promises here.  for now, returns the old meetingsCache and use broadcast to make change
        return meetingsCache;
        // return: array of meeting objects from server
      }
    });

    return serviceAPI;
  }]);
