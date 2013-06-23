'use strict';

angular.module('addicaidSiteApp')
  .factory('timeInterval', ['$timeout', '$log', function($timeout, $log) {

    var serviceAPI = {};

    var pollingPromises = {};
    var isPolling = {};
    var doPoll = function(id, fn, interval, isFirstPoll) {
      console.log('Polling: '+id+'.....'+(isFirstPoll?'first':''));
      var thisInterval = isFirstPoll ? 0 : interval; // first poll should start immediately
      pollingPromises[id] = $timeout(function() {
        fn();
        if (isPolling) {
          doPoll(id, fn, interval, false); // recursive calls use interval
        }
      }, thisInterval);
    };

    // Public API here
    return angular.extend(serviceAPI, {
      startPolling: function(id, fn, interval) {
        if (!isPolling[id]) {
          isPolling[id] = true;
          interval = interval || 2000; // default interval
          doPoll(id, fn, interval, true);
        }
      },
      stopPolling: function(id) {
        isPolling[id] = false;
      }

//      // https://developer.mozilla.org/en-US/docs/Web/API/window.setInterval
//      setInterval: function(func, delay) {
//
//      },
//      // https://developer.mozilla.org/en-US/docs/Web/API/window.clearInterval
//      clearInterval: function(intervalID) {
//
//      }
    });
  }]);



// EXAMPLE
//var polling = {
//  startPolling: function(interval) {
//    interval = interval || 1000; // default interval
//    timeInterval.startPolling('meetings', function() {
//      if (isDirty) {
//        getMeetingsFromServer();
//      }
//    }, interval);
//  },
//  stopPolling: function() {
//    timeInterval.stopPolling('meetings');
//  }
//};
//    polling.startPolling();