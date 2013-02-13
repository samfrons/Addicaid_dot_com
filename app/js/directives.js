'use strict';

/* Directives */


angular.module('addicaidApp.directives', [])
    .directive('ngTap', function() {
        var isTouchDevice = !!("ontouchstart" in window);
        return function(scope, elm, attrs) {
            if (isTouchDevice) {
                var tapping = false;
                elm.bind('touchstart', function() { tapping = true; });
                elm.bind('touchmove', function() { tapping = false; });
                elm.bind('touchend', function() {
                    tapping && scope.$apply(attrs.ngTap);
                });
            } else {
                elm.bind('click', function() {
                    scope.$apply(attrs.ngTap);
                });
            }
        };
    })


//    .directive('leafletMap1', ['$parse', function($parse) {
//        var mapEvents = 'click dblclick ' +
//            'mousedown mouseup mouseover mouseout mousemove ' +
//            'contextmenu ' +
//            'focus blur ' +
//            'preclick load viewreset ' +
//            'movestart move moveend ' +
//            'dragstart drag dragend ' +
//            'zoomstart zoom zoomend autopanstart ' +
//            'layeradd layerremove baselayerchange ' +
//            'locationfound locationerror ' +
//            'popupopen popupclose';
//        var mapOptions = {};
//console.log('leafletMap1');
//
//        return {
//            restrict: 'E',
//            replace: true,
//            template: '<div></div>',
//            link: function(scope, element, attrs) {
////                var mapOptions = {};
//console.log('leafletMap1 link',attrs.id, element[0]);
//                var opts = angular.extend({}, mapOptions, scope.$eval(attrs.mapOptions));
//            var map = new L.Map(element[0], opts);
////                var map = new L.Map(element[0], {
////                    center: [40, -86],
////                    zoom: 10
////                });
//                L.tileLayer('http://{s}.tiles.mapbox.com/v3/samfrons.map-dcwttqie/{z}/{x}/{y}.png',{ maxZoom: 18 }).addTo(map);
//
//
//
//
////                console.log(element)
////                var map = new L.Map(element[0], {
////                    center: [40, -86],
////                    zoom: 10
////                });
////                //create a CloudMade tile layer and add it to the map
////                L.tileLayer('http://{s}.tiles.mapbox.com/v3/samfrons.map-dcwttqie/{z}/{x}/{y}.png', {
////                    maxZoom: 18
////                }).addTo(map);
//
//                //add markers dynamically
//                var points = [{lat: 40, lng: -86},{lat: 40.1, lng: -86.2}];
//                for (var p in points) {
//                    L.marker([points[p].lat, points[p].lng]).addTo(map);
//                }
//            }
//        };
//    }]);
