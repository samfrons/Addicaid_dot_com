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
        }
    })

    .directive('myEvent', ['$parse',
    function ($parse) {
        return function (scope, elm, attrs) {
            log("myEvent", "link start", elm, attrs)
            var events = scope.$eval(attrs.myEvent);
            angular.forEach(events, function (myEvent, eventName) {
                log("myEvent", "foreach", myEvent, eventName)
                var fn = $parse(myEvent);
                log("myEvent", "fn", fn)

                elm.bind(eventName, function (evt) {
                    var params = Array.prototype.slice.call(arguments);
                    log("myEvent", "bind", params)

                    //Take out first paramater (event object);
                    params = params.splice(1);
                    scope.$apply(function () {
                        log("myEvent", "apply", evt, params)
                        fn(scope, {$event: evt, $params: params});
                    });
                });
            });
        };
    }]);

//    .directive('ngslider', function() {
//        return function(elm) {
//            var currentScope = this;
//            elm.slider({
//                range: true,
//                min: 1,
//                max: 35,
//                values: [ 1, 2, 3, 4, 5, 10, 15, 25, 35 ],
//                slide: function( event, ui ) {
//                    $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
//                    currentScope.years = ui.values[0];
//                    currentScope.$apply();
//                }
//            });
//        };
//    })

