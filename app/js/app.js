var App = angular.module('addicaid', ['mobile-navigate'/*, "leaflet-directive"*/, 'ui']);
App.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/meetings_map', { templateUrl: 'partials/meetings-map.html', controller: MeetingsMapCtrl })
        .when('/meetings_list', { templateUrl: 'partials/meetings-list.html', controller: MeetingsListCtrl })
        .when('/meetings_filter', { templateUrl: 'partials/meetings-filter.html', controller: MeetingsFilterCtrl })
        .when('/feed', { templateUrl: 'partials/feed.html', controller: FeedCtrl })
        .when('/dailydose', { templateUrl: 'partials/dailydose.html', controller: DailyDoseCtrl })
        .when('/content', { templateUrl: 'partials/content.html', controller: ContentCtrl })
        .when('/profile', { templateUrl: 'partials/profile.html', controller: ProfileCtrl })
        .when('/connect', { templateUrl: 'partials/connect.html', controller: ConnectCtrl })
        .when('/test', { templateUrl: 'partials/test.html', controller: TestCtrl })
        .when('/meetings/:meetingID', { templateUrl: 'partials/meeting-detail.html', controller: MeetingDetailCtrl })
        .when("/", { templateUrl: "partials/home.html", controller: HomeCtrl })
        .otherwise({ redirectTo: "/" })
    ;
}]);
App.controller('MainCtrl', function($scope, $navigate) {
    $scope.$navigate = $navigate;
    $navigate.go('/','none');
});

App.factory('geoService', ['$q', '$rootScope', function($q, $rootScope) {
    return function() {
        this.changeLocation= function (coords) {
            $rootScope.$broadcast("locationChanged", {
                coordinates: coords
            });
        };
        var d = $q.defer();
        setTimeout(function () {
            try {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        function (position) {
                            $rootScope.$apply(function () {
                                var longitude = position.coords.longitude;
                                changeLocation(position.coords);
                                d.resolve({
                                    aField: 'Hello ' + position.coords.longitude + '!'
                                });
                            });
                        },
                        function (error) {
                            d.reject(error);
                        }
                    );
                }
                else {
                    d.reject('location services not allowed');
                }
            }
            catch (err) {
                d.reject(err);
            }
        }, 1000);
        return d.promise;
    };}]);


App.directive('ngTap', function() {
    var isTouchDevice = !!("ontouchstart" in window);
    return function(scope, elm, attrs) {
        if (isTouchDevice) {
            var tapping = false;
            elm.bind('touchstart', function() { tapping = true; });
            elm.bind('touchmove', function() { tapping = false; });
            elm.bind('touchend', function() {
                tapping && scope.$apply(attrs.ngTap);
            });
        } else {
            elm.bind('click', function() {
                scope.$apply(attrs.ngTap);
            });
        }
    };
});

