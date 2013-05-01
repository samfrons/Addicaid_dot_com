'use strict';

angular.module('addicaidApp')
  .directive('ngTap', [function() {
    var isTouchDevice = !!('ontouchstart' in window);
    return {
//      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, elm, attrs) {
        if (isTouchDevice) {
          var tapping = false;
          elm.bind('touchstart', function() { tapping = true; });
          elm.bind('touchmove', function() { tapping = false; });
          elm.bind('touchend', function() {
            /* jshint -W030 */
            // TODO: although there is probably a way to do following line without breaking jshint
            tapping && scope.$apply(attrs.ngTap);
          });
        } else {
          elm.bind('click', function() {
            scope.$apply(attrs.ngTap);
          });
        }
      }
    };
  }]);
