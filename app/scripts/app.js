'use strict';

angular.module('addicaidSiteApp', ['ngResource', 'ui.map', 'ui.showhide', 'ui.bootstrap'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
//    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        template: '<div></div>',
        controller: 'BrowserCheckCtrl'
      })
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      // --------------mobile routes
      .when('/mobile', {
        templateUrl: 'views/mobileMain.html',
        controller: 'MainCtrl'
      })
      .when('/mobile/main', {
        templateUrl: 'views/mobileMain.html',
        controller: 'MainCtrl'
      })
      // ----------END mobile routes
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
      // --------------Tumblr routes
      .when('/tumblr', {
        templateUrl: 'views/tumblr.html',
        controller: 'TumblrCtrl'
      })
      .when('/tumblr/page/:page', {
        template: 'views/tumblr.html',
        controller: 'TumblrCtrl'
      })
      .when('/tumblr/post/:id', {
        template: 'views/tumblr/tumblr-post-detail.html',
        controller: 'TumblrPostDetailCtrl'
      })
      // ----------END tumblr routes
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
      .when('/meetingentry', {
        templateUrl: 'views/meetingEntry.html',
        controller: 'MeetingEntryCtrl'
      })
      .when('/mission', {
        templateUrl: 'views/mission.html',
        controller: 'MissionCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])

  // TODO: this needs to get out of rootScope?
  .run(['$rootScope', function($rootScope) {
    $rootScope.getPartialUrl = function(partial) { // DONE: jasmine
      var src = 'views/';
      src += partial + '.html';
      return src;
    };

    /*$rootScope.getCtrl = function(basename, processMobile) {
      // takes in the basename of controller and spits out the appropriate full controller name
      // this function capitalizes the first letter of the basename as per convention
      // If processMobile is true, then this function adds the Mobile in-fix to the controller name
      var ctrl = '';
      if (angular.isDefined(processMobile) && processMobile===true && $rootScope.isMobileView === true) {
        console.log('processMobile='+processMobile, 'isMobileView='+$rootScope.isMobileView);
        ctrl += 'Mobile';
      }
      ctrl += basename[0].toUpperCase() + basename.slice(1);
      ctrl += 'Ctrl';
      return ctrl;
    };*/
  }])

  .run(['$rootScope', '$location', '$anchorScroll', '$routeParams', function($rootScope, $location, $anchorScroll, $routeParams) {
    //when the route is changed scroll to the proper element.
    $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
//      console.log('on $routeChangeSuccess', $routeParams.scrollTo, newRoute, oldRoute)
//      $location.hash($routeParams.scrollTo);
//      $anchorScroll();
    });


    $rootScope.scrollTo = function(anchor) {
//      console.log('scrollTo '+anchor, $location.path());
//      $location.search({scrollTo: anchor});
//      console.log($location.path());
    };
  }]);
