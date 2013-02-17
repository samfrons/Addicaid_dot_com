var app = angular.module('addicaidApp.leaflet-directive', []);

// TODO: ui-event?
//Setup map events from a leaflet map object to trigger on a given element too,
//then we just use ui-event to catch events from an element
var bindMapEvents = function bindMapEvents(scope, eventsString, leafletObject, element) {
    angular.forEach(eventsString.split(' '), function (eventName) {
        //Prefix all leaflet events with 'map-', so eg 'click'
        //for the leaflet map doesn't interfere with a normal 'click' event
        var $event = { type: 'map-' + eventName };
        leafletObject.addEventListener(eventName, function (evt) {
//log(eventName + ' triggered')
            element.triggerHandler(angular.extend({}, $event, evt));
            // TODO: dont really understand this apply stuff
            //We create an $apply if it isn't happening. we need better support for this
            //We don't want to use timeout because tons of these events fire at once,
            //and we only need one $apply
            scope.safeApply();
        });
    });
}

app.directive('leafletMap', ['$parse', function leafletMapDirective($parse) {

    var mapEvents = 'click dblclick ' +
        'mousedown mouseup mouseover mouseout mousemove ' +
        'contextmenu ' +
        'focus blur ' +
        'preclick load viewreset ' +
        'movestart move moveend ' +
        'dragstart drag dragend ' +
        'zoomstart zoom zoomend autopanstart ' +
        'layeradd layerremove baselayerchange ' +
        'locationfound locationerror ' +
        'popupopen popupclose';
    var mapOptions = {};
log('leafletMap');

    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        scope: {
            center: '=',
            zoom: '='
        },
        link: function link(scope, element, attrs) {
            var mapOptions = {};
log(scope)
            var opts = angular.extend({}, mapOptions, scope.$eval(attrs.mapOptions));
            var map = new L.Map(element[0]);//, opts);
            map.addLayer(L.tileLayer('http://{s}.tiles.mapbox.com/v3/samfrons.map-dcwttqie/{z}/{x}/{y}.png', { maxZoom: 18 }));//.addTo(map);

            scope.$watch("center", function watchCenter(center) {
  log(center)
  if (scope.center!==center) log('ERROR scope.center !== center')
                if (center === undefined) return;


                // Center of the map
                center = new L.LatLng(scope.center.lat, scope.center.lng);
logvar("scope.zoom", scope.zoom)
                var zoom = scope.zoom || 8;
                map.setView(center, zoom);
            });

            bindMapEvents(scope.$root, mapEvents, map, element);
        }
    };
}]);

//app.directive('leafletMarker',
//    ['$parse', function($parse) {
//
//        var markerEvents = 'click dblclick ' +
//            'mousedown mouseover mouseout ' +
//            'contextmenu ' +
//            'dragstart drag dragend ' +
//            'move remove';
//        var markerOptions = {};
//console.log('leafletMarker');
//
//        return {
//            restrict: 'A', // TODO:
//            link: function (scope, elm, attrs) {
//                var latLng = L.latLng(attrs.lat, attrs.lng)
//                var opts = angular.extend({}, markerOptions, scope.$eval(attrs.markerOptions));
//                var marker = L.marker(latLng, opts);
//console.log('leafletMarker link');
//
//                var model = $parse(attrs.leafletMap);
//                //Set scope variable for the map
//                model.assign(scope, map);
//
//                bindMapEvents(scope, markerEvents, marker, elm);
//            }
//        };
//
//    }]);

//    app.directive('uiMapInfoWindow',
//        ['ui.config', '$parse', '$compile', function (uiConfig, $parse, $compile) {
//
//            var infoWindowEvents = 'closeclick content_change domready ' +
//                'position_changed zindex_changed';
//            var options = uiConfig.mapInfoWindow || {};
//
//            return {
//                link: function (scope, elm, attrs) {
//                    var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
//                    opts.content = elm[0];
//                    var model = $parse(attrs.uiMapInfoWindow);
//                    var infoWindow = model(scope);
//
//                    if (!infoWindow) {
//                        infoWindow = new google.maps.InfoWindow(opts);
//                        model.assign(scope, infoWindow);
//                    }
//
//                    bindMapEvents(scope, infoWindowEvents, infoWindow, elm);
//
//                    /* The info window's contents dont' need to be on the dom anymore,
//                     google maps has them stored.  So we just replace the infowindow element
//                     with an empty div. (we don't just straight remove it from the dom because
//                     straight removing things from the dom can mess up angular) */
//                    elm.replaceWith('<div></div>');
//
//                    //Decorate infoWindow.open to $compile contents before opening
//                    var _open = infoWindow.open;
//                    infoWindow.open = function open(a1, a2, a3, a4, a5, a6) {
//                        $compile(elm.contents())(scope);
//                        _open.call(infoWindow, a1, a2, a3, a4, a5, a6);
//                    };
//                }
//            };
//        }]);

/*
 * Map overlay directives all work the same. Take map marker for example
 * <ui-map-marker="myMarker"> will $watch 'myMarker' and each time it changes,
 * it will hook up myMarker's events to the directive dom element.  Then
 * ui-event will be able to catch all of myMarker's events. Super simple.
 */
//function mapOverlayDirective(directiveName, events) {
//console.log('mapOverlayDirective');
//    app.directive(directiveName, [function () {
//        return {
//            restrict: 'A',
//            link: function (scope, elm, attrs) {
//                scope.$watch(attrs[directiveName], function (newObject) {
//                    bindMapEvents(scope, events, newObject, elm);
//                });
//            }
//        };
//    }]);
//}

//mapOverlayDirective('leafletMarker',
//    'click dblclick ' +
//        'mousedown mouseover mouseout ' +
//        'contextmenu ' +
//        'dragstart drag dragend ' +
//        'move remove');



//    mapOverlayDirective('uiMapPolyline',
//        'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');
//
//    mapOverlayDirective('uiMapPolygon',
//        'click dblclick mousedown mousemove mouseout mouseover mouseup rightclick');
//
//    mapOverlayDirective('uiMapRectangle',
//        'bounds_changed click dblclick mousedown mousemove mouseout mouseover ' +
//            'mouseup rightclick');
//
//    mapOverlayDirective('uiMapCircle',
//        'center_changed click dblclick mousedown mousemove ' +
//            'mouseout mouseover mouseup radius_changed rightclick');
//
//    mapOverlayDirective('uiMapGroundOverlay',
//        'click dblclick');



















//        compile: function compile(tElement, tAttrs, transclude) {
//console.log('leafletMap compile')
//            return {
//                pre: function preLink(scope, iElement, iAttrs, controller) {
//console.log('leafletMap preLink')
//                },
//                post: function postLink(scope, iElement, iAttrs, controller) {
//console.log('leafletMap postLink')
//                }
//            }
//        },
