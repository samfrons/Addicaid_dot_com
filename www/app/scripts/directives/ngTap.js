'use strict';

angular.module('addicaidApp')
  .directive('ngTap', [function() {
    var isTouchDevice = !!('ontouchstart' in window);
    return {
//      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        if (isTouchDevice) {
          var tapping = false;
          element.bind('touchstart', function() { tapping = true; });
          element.bind('touchmove', function() { tapping = false; });
          element.bind('touchend', function() {
            /* jshint -W030 */
            // TODO: although there is probably a way to do following line without breaking jshint
            tapping && scope.$apply(attrs.ngTap);
          });
        } else {
          element.bind('click', function() {
            scope.$apply(attrs.ngTap);
          });
        }
      }
    };
  }]);