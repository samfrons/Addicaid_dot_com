'use strict';

angular.module('addicaidSiteApp', ['ngResource', 'restangular', 'ui'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/inspiration', {
        templateUrl: 'views/inspiration.html',
        controller: 'InspirationCtrl'
      })
      .when('/press', {
        templateUrl: 'views/press.html',
        controller: 'PressCtrl'
      })
      .when('/emailListSignup', {
        templateUrl: 'views/emailListSignup.html',
        controller: 'EmailListSignupCtrl'
      })
      .when('/tumblr', {
        templateUrl: 'views/tumblr.html',
        controller: 'TumblrCtrl'
      })
      // --------------Tumblr routes
      .when('/tumblr/page/:page', {
        template: '/views/tumblr.html',
        controller: 'TumblrCtrl'
      })
      .when('/tumblr/post/:id', {
        template: '/views/tumblr/tumblr-post-detail.html',
        controller: 'TumblrPostDetailCtrl'
      })
      // ----------END tumblr routes
      .when('/map', {
        templateUrl: 'views/map.html',
        controller: 'MapCtrl'
      })
      .when('/headline', {
        templateUrl: 'views/headline.html',
        controller: 'HeadlineCtrl'
      })
      .when('/investors', {
        templateUrl: 'views/investors.html',
        controller: 'InvestorsCtrl'
      })
      .when('/aboutUs', {
        templateUrl: 'views/aboutUs.html',
        controller: 'AboutUsCtrl'
      })
      .when('/thankYou', {
        templateUrl: 'views/thankYou.html',
        controller: 'ThankYouCtrl'
      })
      .when('/meetings', {
        templateUrl: 'views/meetings.html',
        controller: 'MeetingsCtrl'
      })
      .when('/testMap', {
        templateUrl: 'views/testMap.html',
        controller: 'TestMapCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signupFlow', {
        templateUrl: 'views/signupFlow.html',
        controller: 'SignupFlowCtrl'
      })
      // --------------mobile routes
      .when('/mobile', {
        template: '/views/mobile/main.html',
        controller: 'MainMobileCtrl'
      })
      .when('/mobile/map', {
        template: '/views/mobile/map.html',
        controller: 'MapMobileCtrl'
      })
    // ----------END mobile routes
      .otherwise({
        redirectTo: '/'
      });
  }])

  // TODO: this needs to get out of rootScope?
  .run(['$rootScope', function($rootScope) {
    $rootScope.getPartialUrl = function(partial) { // DONE: jasmine
      var src = 'views/';
      if ($rootScope.isMobileView === true) {
        src += 'mobile/';
      }
      src += partial + '.html';
      return src;
    };

    $rootScope.getCtrl = function(basename, processMobile) {
      // takes in the basename of controller and spits out the appropriate full controller name
      // this function capitalizes the first letter of the basename as per convention
      // If processMobile is true, then this function adds the Mobile in-fix to the controller name
      var ctrl = basename[0].toUpperCase() + basename.slice(1);
      if (angular.isDefined(processMobile) && processMobile===true && $rootScope.isMobileView === true) {
        console.log('processMobile='+processMobile, 'isMobileView='+$rootScope.isMobileView);
        ctrl += 'Mobile';
      }
      ctrl += 'Ctrl';
      return ctrl;
    };
  }])

  // reset isMobileView
  .run(['mobileViewToggle', function(mobileViewToggle) {
    console.log('setIsMobileView(false) in app.js');
    mobileViewToggle.setIsMobileView(false);
  }])

  .config(function(RestangularProvider) {
//    RestangularProvider.setBaseUrl('http://localhost\\:9000/testfiles');
    RestangularProvider.setBaseUrl('http://localhost\\:8080');
  })

  // create ng-clickable go function
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.goto = function(url) {
      $location.url(url);
    };
  }]);
