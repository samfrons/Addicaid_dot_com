'use strict';

angular.module('addicaidSiteApp')
  .factory('googleGeocoder', ['$q', function($q) {

//    var googleGeocodeRestangular = Restangular.withConfig(function(RestangularConfigurer) {
//      RestangularConfigurer.setBaseUrl('http://maps.googleapis.com/maps/api/geocode/json');
//    });

    var geocoder = new google.maps.Geocoder();

    return {
      geocode: function(address) {
        var deferred = $q.defer();
        var request = {
          address: address
        };

        geocoder.geocode(request, function(results, status) {
          console.log('geocode response', status, results);
          if (status === google.maps.GeocoderStatus.OK) {
            deferred.resolve(results);
          } else {
            deferred.reject(status);
          }
        });

        return deferred.promise;
      }
    };
  }]);
