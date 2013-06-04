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


    var isFilterDirty = true; // flag used to determine whether server needs to be called for new data
    var waitingForServerResults = false; // flag to make sure only one server request at a time

    var meetingsCache = []; // latest list of meetings retrieved from server




    var getMeetingsFromServer = function() {
      console.log('entering getMeetingsFromServer');
      // Retrieves meeting objects from server based on current filters

      if (isFilterDirty && !waitingForServerResults) {
        // populate meetings from server
        waitingForServerResults = true;
        // $http.jsonp(privateAPI.getUrl())
        $http.get('testfiles/meetings-demo.json')// TODO: HACK using local json file
          .success(function(data) {
            meetingsCache = data.value;

            // PROCESS MEETINGS CACHE
//            angular.forEach(meetingsCache, function(meeting) {
              // clean up time
//              meeting.time = meeting.time.split(':')[0] + ':' + meeting.time.split(':')[1];
//            });

            isFilterDirty = false;
            waitingForServerResults = false;
            console.log('******** got '+ meetingsCache.length + ' meetings **********');
            $rootScope.$broadcast(serviceAPI.meetingsChangedEvent, [/* meetingsChangedArgs */]);
          })
          .error(function(data,status) {
            // TODO: error handling
            console.log('FAILURE', data, status);
          });
      }
    };

    // Public API
    angular.extend(serviceAPI, {
      getMeetings: function() {
        console.log('getMeetings - '+ arguments[0]); // optional arg used for logging to determine where call originated
        if (isFilterDirty) {
          getMeetingsFromServer();
        }

        // TODO: need promises here.  for now, returns the old meetingsCache and use broadcast to make change
        return meetingsCache;
        // return: array of meeting objects from server
      }
    });

    return serviceAPI;
  }]);
