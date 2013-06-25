'use strict';

angular.module('addicaidSiteApp')
  .factory('meetingServer', ['$http', '$q', function($http, $q) {


    // Url creation
    var getUrl = function(bb) {
      // bb is the bounding box of type google.maps.LatLngBounds
      // TODO: comment and test
//      var baseUrl = 'http://causecodetech.appspot.com/meeting';
      var baseUrl = 'http://addicaid-backend-causecode.appspot.com/meeting';
      var url = baseUrl;
      url += '?';
      url +=  'swLat=' + bb.getSouthWest().lat();
      url += '&swLong=' + bb.getSouthWest().lng();
      url += '&neLat=' + bb.getNorthEast().lat();
      url += '&neLong=' + bb.getNorthEast().lng();
      // TODO: add current location here
      url += '&callback=JSON_CALLBACK';

      console.log('getUrl = '+url);
      return url;
    };



    // Public API here
    return {
      getMeetings: function(bb) {
        // TODO: HIGH: this is making multiple calls to the server, but working for now
        // Retrieves meeting objects from server based on current filters
        // bb is the bounding box of type google.maps.LatLngBounds
        console.log('entering getMeetingsFromServer');

        var deferred = $q.defer();
        // populate meetings from server
        $http.jsonp(getUrl(bb))
//        $http.get('testfiles/meetings.json')// TODO: HACK using local json file
          .success(function(data, status, headers, config) {
            deferred.resolve(data);
          })
          .error(function(data, status, headers, config) {
            // TODO: error handling
            console.error('meeting service FAILURE', data, status);
            deferred.reject(status);
          });
        return deferred.promise;
      }
    };
  }]);
