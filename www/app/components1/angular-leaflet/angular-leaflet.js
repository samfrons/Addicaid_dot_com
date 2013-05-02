'use strict';

(function () {
  var app = angular.module('angular-leaflet', []);

  // TODO: ui-event?
  //Setup map events from a leaflet map object to trigger on a given element too,
  //then we just use ui-event to catch events from an element
  var bindMapEvents = function bindMapEvents(scope, eventsString, leafletObject, element) {
    angular.forEach(eventsString.split(' '), function (eventName) {
      //Prefix all leaflet events with 'map-', so eg 'click'
      //for the leaflet map doesn't interfere with a normal 'click' event
      var $event = { type: 'map-' + eventName };
      leafletObject.on(eventName, function (evt) {
        element.triggerHandler(angular.extend({}, $event, evt));
        //We create an $apply if it isn't happening. we need better support for this
        //We don't want to use timeout because tons of these events fire at once,
        //and we only need one $apply
//        scope.safeApply(); // TODO: this would be better than next line but from directive can't guarantee it exists
        if (!scope.$$phase) {
          scope.$apply();
        }
      });
    });
  };

  app.directive('leafletMap', ['$parse', function ($parse) {

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

    return {
      restrict: 'A',
//        replace: true,
//        template: '<div></div>',
//        scope: {
//            leafletOptions: '=' // required
//        },
      link: function link(scope, element, attrs) {
        var map = L.map(element[0]);

        var model = $parse(attrs.leafletMap);
        model.assign(scope, map); //Set scope variable for the map

        // map tileLayer
        map.addLayer(L.tileLayer('http://{s}.tiles.mapbox.com/v3/samfrons.map-dcwttqie/{z}/{x}/{y}.png', { maxZoom: 18 }));

        // mapOptions
        if (angular.isDefined(attrs.leafletOptions)) {
          scope.$watch(attrs.leafletOptions, function (mapOptions, oldMapOptions) {
            console.log('leafletOptions changed', mapOptions, oldMapOptions);
//            if (angular.isUndefined(mapOptions) || angular.isUndefined(mapOptions.center)) {
//              return;
//            }
            // create mapOptions if doesn't exist
            mapOptions = mapOptions || {};
            oldMapOptions = oldMapOptions || {};

            // Center of the map
            if (angular.isUndefined(mapOptions.center)) { // default center
              angular.extend(mapOptions, { center : L.latLng(38.8977, -77.0366) });
            }
            // zoom
            if (angular.isUndefined(mapOptions.zoom)) { // default zoom
              angular.extend(mapOptions, { zoom : 8 });
            }
            console.log('leafletOptions changed', mapOptions, oldMapOptions);

            map.setView(mapOptions.center, mapOptions.zoom);

            // map option markers
            // first remove any old mapOptions markers
            angular.forEach(oldMapOptions.markers, function(marker) {
              map.removeLayer(marker);
            });
            // now add new markers
            angular.forEach(mapOptions.markers, function(marker) {
              marker.addTo(map);
            });

          });
        }
        bindMapEvents(scope.$root, mapEvents, map, element);
      }
    };
  }]);

  app.directive('leafletMarker', ['$parse', function($parse) {
    /* jshint -W098 */
    var markerEvents = 'click dblclick ' +
      'mousedown mouseover mouseout ' +
      'contextmenu ' +
      'dragstart drag dragend ' +
      'move remove';

    return {
      restrict: 'E', // TODO:
//      replace: true,
//      template: '<div class="leaflet invisible"></div>',
      link: function (scope, element, attrs) {
        // attributes:
        //   leafletLat, leafletLng // required
        //   markerOptions
        //   leafletMap // required
        //

        var latLng = L.latLng(scope.$eval(attrs.leafletLat), scope.$eval(attrs.leafletLng));
        var opts = angular.extend({}, scope.$eval(attrs.markerOptions));
        var marker = L.marker(latLng, opts);

        var map = scope.$eval(attrs.leafletMap);
        marker.addTo(map);

        // bind the popup using an input function and the model object
        if (attrs.popupContentFunction && attrs.model) {
          var popupContent = scope.$eval(attrs.popupContentFunction)(scope.$eval(attrs.model));
          var popupOptions = angular.extend({}, scope.$eval(attrs.popupContentOptions));
          marker.bindPopup(popupContent, popupOptions);
        }

        bindMapEvents(scope.$root, markerEvents, marker, element);

        element.bind('$destroy', function() {
          map.removeLayer(marker);
        });
      }
    };
  }]);

//  app.directive('uiMapInfoWindow',
//    ['ui.config', '$parse', '$compile', function (uiConfig, $parse, $compile) {
//
//      var infoWindowEvents = 'closeclick content_change domready ' +
//        'position_changed zindex_changed';
//      var options = uiConfig.mapInfoWindow || {};
//
//      return {
//        link: function (scope, elm, attrs) {
//          var opts = angular.extend({}, options, scope.$eval(attrs.uiOptions));
//          opts.content = elm[0];
//          var model = $parse(attrs.uiMapInfoWindow);
//          var infoWindow = model(scope);
//
//          if (!infoWindow) {
//            infoWindow = new google.maps.InfoWindow(opts);
//            model.assign(scope, infoWindow);
//          }
//
//          bindMapEvents(scope, infoWindowEvents, infoWindow, elm);
//
//          /* The info window's contents dont' need to be on the dom anymore,
//           google maps has them stored.  So we just replace the infowindow element
//           with an empty div. (we don't just straight remove it from the dom because
//           straight removing things from the dom can mess up angular) */
//          elm.replaceWith('<div></div>');
//
//          //Decorate infoWindow.open to $compile contents before opening
//          var _open = infoWindow.open;
//          infoWindow.open = function open(a1, a2, a3, a4, a5, a6) {
//            $compile(elm.contents())(scope);
//            _open.call(infoWindow, a1, a2, a3, a4, a5, a6);
//          };
//        }
//      };
//    }]);

  /*
   * Map overlay directives all work the same. Take map marker for example
   * <ui-map-marker="myMarker"> will $watch 'myMarker' and each time it changes,
   * it will hook up myMarker's events to the directive dom element.  Then
   * ui-event will be able to catch all of myMarker's events. Super simple.
   */
//function mapOverlayDirective(directiveName, events) {
//console.log('mapOverlayDirective_'+directiveName,events);
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
//
//mapOverlayDirective(
//    'leafletMarker',
//    'click dblclick ' +
//    'mousedown mouseover mouseout ' +
//    'contextmenu ' +
//    'dragstart drag dragend ' +
//    'move remove'
//);



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






//  app.directive('leafletEvent', ['$parse', function ($parse) {
//    return function (scope, elm, attrs) {
//      var events = scope.$eval(attrs.leafletEvent);
//      console.log('leafletEvent start', events);
//      angular.forEach(events, function (leafletEvent, eventName) {
//        var fn = $parse(leafletEvent);
//        console.log('leafletEvent: and elm ', [eventName, leafletEvent, elm]);
//        elm.bind(eventName, function (evt) {
//          var params = Array.prototype.slice.call(arguments);
//          console.log('leafletEvent', eventName, params);
//          //Take out first paramater (event object);
//          params = params.splice(1);
//          scope.$apply(function () {
//            console.log('leafletEvent $apply', evt, params);
//            fn(scope, {$event: evt, $params: params});
//          });
//        });
//      });
//    };
//  }]);









//
//// mapOptions
//scope.$watch(attrs.leafletMapOptions, function (mapOptions) {
//    console.log("watch_mapOptions", mapOptions)
//    if (scope.mapOptions!==mapOptions) console.log("watchCenter",'ERROR scope.mapOptions !== mapOptions')
//    console.log("watch_mapOptions",scope.mapOptions, scope.happy)
//    if (scope.mapOptions === undefined) { // create mapOptions if doesn't exist
//        angular.extend(scope, { mapOptions : {} });
//    }
//    console.log("watch_mapOptions",3)
//
//    // Center of the map
//    if (scope.mapOptions.center === undefined) { // default center
//        angular.extend(scope.mapOptions, { center : L.latLng(38.8977, -77.0366) });
//    }
//    console.log("watch_mapOptions",4)
//    // zoom
//    if (scope.mapOptions.zoom === undefined) { // default zoom
//        angular.extend(scope.mapOptions, { zoom : 8 });
//    }
//    console.log("watch_mapOptions",5)
//    map.setView(scope.mapOptions.center, scope.mapOptions.zoom);
//    console.log("watch_mapOptions",6)
//});


})();
