'use strict';

angular.module('addicaidSiteApp')
  .factory('meetings', ['$http', '$rootScope', '$filter', function($http, $rootScope, $filter) {
//  .factory('meetings', ['$resource', function($resource) {
//    var defaultCoordinates = new google.maps.LatLng(40.763562, -73.97140100000001);  // NYC
//    var defaultCoordinates = new google.maps.LatLng(42.25113,-73.791435);  // upstate NY, for testfile
//    var defaultCoordinates = new google.maps.LatLng(37.771139, -122.403424);  // San Francisco
    var defaultCoordinates = new google.maps.LatLng(34.536107,-117.291156);  // Victorville, CA
    console.log('defaultCoordinates', defaultCoordinates);


    var serviceAPI = {
      meetingsChangedEvent: 'meetingsChanged',
      defaultCoordinates: defaultCoordinates // for debugging, until geolocation works
    };


    var searchBounds; //new google.maps.LatLngBounds(new google.maps.LatLng(0,0), new google.maps.LatLng(0,0)); // google.maps.LatLngBounds
    var currentLocation = new google.maps.LatLng(defaultCoordinates.lat(), defaultCoordinates.lng()); // google.maps.LatLng
    var limitTo;

    var isDirty = true; // flag used to determine whether server needs to be called for new data
    var waitingForServerResults = false; // flag to make sure only one server request at a time

    var meetingsCache = []; // latest list of meetings retrieved from server




    var calculateSearchBounds = function(mapBounds) {
      // Increase the size of the search boundary from a given map bounds
      // mapBounds is type google.maps.LatLngBounds
      // returns a new google.maps.LatLngBounds object
      return new google.maps.LatLngBounds(mapBounds.getSouthWest(), mapBounds.getNorthEast());
    };

    // Url creation items
    var getUrl = function() {
      // bb is the bounding box of type google.maps.LatLngBounds
      // TODO: comment and test
//      var baseUrl = 'http://causecodetech.appspot.com/meeting';
      var baseUrl = 'http://addicaid-backend-causecode.appspot.com/meeting';
//    var testUrl = 'http://addicaid.appspot.com/meetings/jsonp?daylist=MoTu&callback=JSON_CALLBACK';
      var url = baseUrl;
      url += '?';
      url +=  'swLat=' + searchBounds.getSouthWest().lat();
      url += '&swLong=' + searchBounds.getSouthWest().lng();
      url += '&neLat=' + searchBounds.getNorthEast().lat();
      url += '&neLong=' + searchBounds.getNorthEast().lng();
      // TODO: add current location here
      url += '&callback=JSON_CALLBACK';

      console.log('getUrl = '+url);
      return url;
    };




    /*
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
     }*/

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
    var calculateDistance = function(lat1, lon1, lat2, lon2, unit) {
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
      if (unit==='K') { dist = dist * 1.609344; }
      if (unit==='N') { dist = dist * 0.8684; }
      return dist;
    };






    var getMeetingsFromServer = function() {
      // Retrieves meeting objects from server based on current filters
      // bb is the bounding box of type google.maps.LatLngBounds
      console.log('entering getMeetingsFromServer');

      if (isDirty && !waitingForServerResults && angular.isDefined(searchBounds)) {
        // populate meetings from server
        waitingForServerResults = true;
        $http.jsonp(getUrl())
//        $http.get('testfiles/meetings.json')// TODO: HACK using local json file
          .success(function(data, status) {
            console.log('meeting service success', status);
            meetingsCache = angular.isNumber(limitTo) ? $filter('limitTo')(data,limitTo) : data;
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

              // google maps directions api
              angular.extend(meeting.location, {
                google: {
                  q: meeting.location.address.address1.replace(' ','+') + ',' + meeting.location.address.city.city.replace(' ','+') + ',' + meeting.location.address.city.state.replace(' ','+') + ','
                }
              });

              // distance calculation
              var distance = calculateDistance(currentLocation.lat(), currentLocation.lng(), meeting.location.center.latitude, meeting.location.center.longitude, 'M');
              angular.extend(meeting, { distance: distance });
            });

            isDirty = false;
            waitingForServerResults = false;
            console.log('******** got '+ meetingsCache.length + ' meetings **********');
            $rootScope.$broadcast(serviceAPI.meetingsChangedEvent, [/* meetingsChangedArgs */]);
          })
          .error(function(data,status) {
            waitingForServerResults = false;
            // TODO: error handling
            console.error('meeting service FAILURE', data, status);
          });
      }
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
        if (isDirty) {
          getMeetingsFromServer();
        }

        // TODO: need promises here.  for now, returns the old meetingsCache and use broadcast to make change
        return meetingsCache;
        // return: array of meeting objects from server
      }

    });

    return serviceAPI;
  }]);
