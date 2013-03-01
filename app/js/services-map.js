angular.module('addicaidApp')
    .factory('mapService', function($http, $rootScope) {
        var mapService = {
            map: null,
            markers: []
        };

        mapService.addMarker = function(marker) {
            log("addMarker", marker)
        };


        return mapService;
    });