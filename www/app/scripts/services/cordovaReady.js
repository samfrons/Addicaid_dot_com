'use strict';

angular.module('addicaidApp')
  .factory('cordovaReady', [function() {
    // Service logic
    // ...

    // Public API here
    return function(fn) {
      var queue = [];

      var impl = function() {
        queue.push(Array.prototype.slice.call(arguments));
      };

      document.addEventListener('deviceready', function() {
        queue.forEach(function(args) {
          fn.apply(this, args);
        });
        impl = fn;
      }, false);

      return function() {
        return impl.apply(this, arguments);
      };
    };
  }]);
