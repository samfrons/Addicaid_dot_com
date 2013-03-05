

// Declare app level module which depends on filters, and services
angular.module('addicaidApp',
        [
            'addicaidApp.filters', 'addicaidApp.directives'
//            ,'leaflet-directive'
            ,'addicaidApp.leaflet-directive'
            ,'mobile-navigate'
            ,'ui'
            // ,'ui.bootstrap'
        ])

    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/map', { templateUrl: 'views/map.html', controller: MapCtrl })
            .when('/meetinglist', { templateUrl: 'views/meeting-list.html', controller: MeetingListCtrl })
            .when('/meetingfavorites', { templateUrl: 'views/meeting-list.html', controller: MeetingListFavoritesCtrl })
            .when('/filter', { templateUrl: 'views/filter.html', controller: FilterCtrl })
            .when('/signup', { templateUrl: 'views/signup.html', controller: SignupCtrl })
            .when('/profile', { templateUrl: 'views/profile.html', controller: ProfileCtrl })
            .when('/dailydose', { templateUrl: 'views/dailydose.html', controller: DailyDoseCtrl })
            .when('/meetinglist/:meetingID/:showComments', { templateUrl: 'views/meetingpage.html', controller: MeetingPageCtrl })
//            .when("/", { templateUrl: 'views/meeting-list.html', controller: MeetingListCtrl })
//            .when("/", { templateUrl: 'views/map.html', controller: MapCtrl })
//            .when("/", { templateUrl: 'views/filter.html', controller: FilterCtrl })
            .when("/", { templateUrl: 'views/signup.html', controller: SignupCtrl })
            .otherwise({ redirectTo: "/" });
//        $locationProvider.html5Mode(true);
    }])

    .run(function($rootScope) {
        $rootScope.views = {
            "header" : "views/partials/header.html",
            "footer" : "views/partials/footer.html",
            "meetingDetail" : "views/partials/meeting-detail.html",
            "ratingsDialog" : "views/partials/ratings-dialog.html"
        };
        $rootScope.safeApply = function(fn) {
            var phase = this.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if(fn && (typeof(fn) === 'function')) {
                    fn();
                }
            } else {
                this.$apply(fn);
            }
        };

        $rootScope.getFellowshipID = function(fellowshipName) {
            var id = "";
            switch (fellowshipName) {
                case "AlcoholicsAnonymous":
                    id = "AA";
                    break;
                case "NarcoticsAnonymous":
                    id = "NA";
                    break;
            }
            return id;
        }
        $rootScope.parseAddress = function(address, part) {
            var result = address.split('\n')[part-1];
            if (angular.isUndefined(result)) result = "";
            return result;
        };
        $rootScope.formatTime = function(time) {
            return angular.isUndefined(time) ? "" : time;
        };
        $rootScope.formatDay = function(day) {
            return day.substr(0,3);
        };
        $rootScope.formatDistance= function(distance) {
            var result = parseFloat(distance);
            var units = (result == "1") ? "MILE" : "MILES";
            if (isFinite(result)) {
                result = result + " " + units;
            } else {
                result = null;
            }
            return result;
        };
        $rootScope.getStarImgSrc = function(isFavorite) {
            return isFavorite ? "images/star_icon_on.png" : "images/star_icon.png";
        };
        $rootScope.toggleFavorite = function(meeting) {
            meeting.isFavorite = !meeting.isFavorite;
        }


        $rootScope.getRatingViewObject = function(rating) {
            // params(rating) is one of twelve ratings
            // params(isActive) is boolean, whether rating is visible
            var cssClass = "";
            var imgFilename = ""; // without the .png
            var displayText = "";

            switch (rating) {
                case "forYoungPeople":
                    cssClass = "young_people";
                    imgFilename = "young_people";
                    displayText = "young people";
                    break;
                case "isLgbt":
                    cssClass = "lgbt";
                    imgFilename = "lgbt";
                    displayText = "lgbt";
                    break;
                case "forWomen":
                    cssClass = "womens";
                    imgFilename = "womens";
                    displayText = "womens";
                    break;
                case "forNewcomer":
                    cssClass = "newcomer";
                    imgFilename = "newcomer";
                    displayText = "newcomer";
                    break;
                case "outsidersWelcome":
                    cssClass = "outsiders";
                    imgFilename = "outsiders";
                    displayText = "outsiders welcome";
                    break;
                case "hasWheelchairAccess":
                    cssClass = "wheelchair";
                    imgFilename = "wheelchair";
                    displayText = "wheelchair";
                    break;
                case "petsAllowed":
                    cssClass = "pets";
                    imgFilename = "pets";
                    displayText = "pets allowed";
                    break;
                case "isHasSnacks":
                    cssClass = "snacks";
                    imgFilename = "snacks";
                    displayText = "snacks";
                    break;
                case "isLargeGroup":
                    cssClass = "large_group";
                    imgFilename = "large_group";
                    displayText = "large group";
                    break;
                case "isHasMeditation":
                    cssClass = "meditation";
                    imgFilename = "meditation";
                    displayText = "meditation";
                    break;
                case "isForMen":
                    cssClass = "mens";
                    imgFilename = "mens";
                    displayText = "mens";
                    break;
                case "isHasCoffee":
                    cssClass = "coffee";
                    imgFilename = "coffee";
                    displayText = "coffee";
                    break;
                default:
                    log("ERROR: unknown rating (" + rating + ") in getRatingViewObject" );
            }

            return {
                cssClass: cssClass,
                imgSrc: imgFilename == "" ? "" : "images/"+imgFilename+".png",
                displayText: displayText
            }
        }
    });




//var App = angular.module('addicaid', ['mobile-navigate'/*, "leaflet-directive"*/, 'ui']);
//App.config(['$routeProvider', function($routeProvider) {
//    $routeProvider
//        .when('/meetings_map', { templateUrl: 'partials/meetings-map.html', controller: MeetingsMapCtrl })
//        .when('/meetings_list', { templateUrl: 'partials/meetings-list.html', controller: MeetingsListCtrl })
//        .when('/meetings_filter', { templateUrl: 'partials/meetings-filter.html', controller: MeetingsFilterCtrl })
//        .when('/feed', { templateUrl: 'partials/feed.html', controller: FeedCtrl })
//        .when('/dailydose', { templateUrl: 'partials/dailydose.html', controller: DailyDoseCtrl })
//        .when('/content', { templateUrl: 'partials/content.html', controller: ContentCtrl })
//        .when('/profile', { templateUrl: 'partials/profile.html', controller: ProfileCtrl })
//        .when('/connect', { templateUrl: 'partials/connect.html', controller: ConnectCtrl })
//        .when('/test', { templateUrl: 'partials/test.html', controller: TestCtrl })
//        .when('/meetings/:meetingID', { templateUrl: 'partials/meeting-detail.html', controller: MeetingDetailCtrl })
//        .when("/", { templateUrl: "partials/home.html", controller: HomeCtrl })
//        .otherwise({ redirectTo: "/" })
//    ;
//}]);
