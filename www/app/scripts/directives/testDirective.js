'use strict';

angular.module('addicaidApp')
  .directive('testDirective', [function() {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        /* jshint -W098 */
        element.text('this is the testDirective directive');
      }
    };
  }]);
