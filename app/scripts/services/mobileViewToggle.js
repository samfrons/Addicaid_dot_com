'use strict';

angular.module('addicaidSiteApp')
  .factory('mobileViewToggle', ['$rootScope', function($rootScope) {

    // Public API here
    return {
      setIsMobileView: function(flag) {
        $rootScope.isMobileView = flag;
      },
      getIsMobileView: function() {
        return $rootScope.isMobileView;
      }
    };
  }]);
