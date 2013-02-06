
//
//// I hide and show elements based on the given model value.
//// However, rather than using "display" style, I use jQuery's
//// slideDown() / slideUp().
//App.directive("bnSlideShow", function() {
//        // I allow an instance of the directive to be hooked
//        // into the user-interaction model outside of the
//        // AngularJS context.
//        function link( $scope, element, attributes ) {
//            // I am the TRUTHY expression to watch.
//            var expression = attributes.bnSlideShow;
//            // I am the optional slide duration.
//            var duration = ( attributes.slideShowDuration || "fast" );
//            // I check to see the default display of the
//            // element based on the link-time value of the
//            // model we are watching.
//            if ( ! $scope.$eval( expression ) ) {
//                element.hide();
//            }
//            // I watch the expression in $scope context to
//            // see when it changes - and adjust the visibility
//            // of the element accordingly.
//            $scope.$watch(expression, function( newValue, oldValue ) {
//                    // Ignore first-run values since we've
//                    // already defaulted the element state.
//                    if (newValue === oldValue) {
//                        return;
//                    }
//                    // Show element.
//                    if (newValue) {
//                        element
//                            .stop( true, true )
//                            .slideDown( duration );
//                        // Hide element.
//                    } else {
//                        element
//                            .stop( true, true )
//                            .slideUp( duration );
//                    }
//                }
//            );
//        }
//
//        // Return the directive configuration.
//        return({
//            link: link,
//            restrict: "A"
//        });
//    }
//);













/**
 * uiShow Directive
 *
 * Adds a 'ui-show' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */
App.directive('mattShow', [function (input) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.mattShow, function (newVal, oldVal) {
            console.log("new: "+newVal);
            console.log("old: "+oldVal);
            if (newVal) {
                element.css('display', !!newVal ? '' : 'none');
            } else {
//                    elm.removeClass('ui-show');
            }
        });
    };
}]);
/*
 <button toggle-btn=""

 */
//App.directive('toggleBtn', function() {
//    return {
//        restrict:'E',
//        link:function (scope, element, attrs) {
//            // attrs:
//            //  list valid ones here
//
//            scope.$watch(attrs.classActive, function(newVal, oldVal) {
//
//            });
//
//            scope.$watch(attrs.uiToggle, function (newVal, oldVal) {
//                if (newVal) {
//                    elm.removeClass('ui-hide').addClass('ui-show');
//                } else {
//                    elm.removeClass('ui-show').addClass('ui-hide');
//                }
//            });
////            element.addClass('circle');
////
////            scope.$watch(attrs.x, function (x) {
////                element.css('left', x + 'px');
////            });
////            scope.$watch(attrs.y, function (y) {
////                element.css('top', y + 'px');
////            });
////            scope.$watch(attrs.color, function (color) {
////                element.css('backgroundColor', color);
////            });
//        }
//    };
//});


App.directive('toggleButton')
transclude: 'element',
    priority: 500,
    require: '^toggleStyle',
    compile: function(element, attrs, transclude) {
    return function(scope, element, attr, ctrl) {
        ctrl.cases['!' + attrs.ngSwitchWhen] = transclude;
    };
}
});

var ngSwitchDirective = valueFn({
    restrict: 'EA',
    require: 'ngSwitch',
    controller: function ngSwitchController() {
        this.cases = {};
    },
    link: function(scope, element, attr, ctrl) {
        var watchExpr = attr.ngSwitch || attr.on,
            selectedTransclude,
            selectedElement,
            selectedScope;

        scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
            if (selectedElement) {
                selectedScope.$destroy();
                selectedElement.remove();
                selectedElement = selectedScope = null;
            }
            if ((selectedTransclude = ctrl.cases['!' + value] || ctrl.cases['?'])) {
                scope.$eval(attr.change);
                selectedScope = scope.$new();
                selectedTransclude(selectedScope, function(caseElement) {
                    selectedElement = caseElement;
                    element.append(caseElement);
                });
            }
        });
    }
});

App.directive('toggleStyle', function() {
    return {
        restrict:'A',
        require: 'myStyle',
        controller: function myStyleController() {
            this.cases = {};
        },
        link: function(scope, element, attr, ctrl) {
            // attrs:
            //  list valid ones here

            scope.$watch(attr.myStyle, function myStyleWatchAction(newStyles, oldStyles) {
                if (oldStyles && (newStyles !== oldStyles)) {
                    forEach(oldStyles, function(val, style) { element.css(style, '');});
                }
                if (newStyles) element.css(newStyles);
            }, true);

            scope.$watch(attrs.uiToggle, function (newVal, oldVal) {
                if (newVal) {
                    elm.removeClass('ui-hide').addClass('ui-show');
                } else {
                    elm.removeClass('ui-show').addClass('ui-hide');
                }
            });
//            element.addClass('circle');
//
//            scope.$watch(attrs.x, function (x) {
//                element.css('left', x + 'px');
//            });
//            scope.$watch(attrs.y, function (y) {
//                element.css('top', y + 'px');
//            });
//            scope.$watch(attrs.color, function (color) {
//                element.css('backgroundColor', color);
//            });
        }
    };
});


/**
 * uiHide Directive
 *
 * Adds a 'ui-hide' class to the element instead of display:block
 * Created to allow tighter control  of CSS without bulkier directives
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */
//    .directive('uiHide', [function () {
//        return function (scope, elm, attrs) {
//            scope.$watch(attrs.uiHide, function (newVal, oldVal) {
//                if (newVal) {
//                    elm.addClass('ui-hide');
//                } else {
//                    elm.removeClass('ui-hide');
//                }
//            });
//        };
//    }])

/**
 * uiToggle Directive
 *
 * Adds a class 'ui-show' if true, and a 'ui-hide' if false to the element instead of display:block/display:none
 * Created to allow tighter control  of CSS without bulkier directives. This also allows you to override the
 * default visibility of the element using either class.
 *
 * @param expression {boolean} evaluated expression to determine if the class should be added
 */
//    .directive('uiToggle', [function () {
//        return function (scope, elm, attrs) {
//            scope.$watch(attrs.uiToggle, function (newVal, oldVal) {
//                if (newVal) {
//                    elm.removeClass('ui-hide').addClass('ui-show');
//                } else {
//                    elm.removeClass('ui-show').addClass('ui-hide');
//                }
//            });
//        };
//    }]);