'use strict';

angular.module('addicaidSiteApp', ['ngResource'])
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
      .otherwise({
        redirectTo: '/'
      });
  }])

  // TODO: this needs to get out of rootScope?
  .run(['$rootScope', function($rootScope) {
    $rootScope.getPartialUrl = function(partial) { // DONE: jasmine
      var src = '';
      src = 'views/' + partial + '.html';
      return src;
    };
  }])

  // create ng-clickable go function
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.goto = function(url) {
      $location.url(url);
    };
  }]);
