//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http, meetingSvc, filterSvc, $filter) {
    $scope.pageTitle = "Meeting List";

    // meetings
    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
        log("MeetingListCtrl#on#meetings changed", event, args)
        $scope.meetings = $filter("andOrFilter")(meetingSvc.getMeetings("list-on"), filterSvc.filtersToApply());

    });
    $scope.meetings = $filter("andOrFilter")(meetingSvc.getMeetings("list"), filterSvc.filtersToApply());
}

function MeetingListFavoritesCtrl($scope, $http, meetingSvc, filterSvc) {
    $scope.pageTitle = "Favorites";

    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
        log("MeetingListFavoritesCtrl#on#meetings changed", event, args)
        $scope.meetings = meetingSvc.getMeetingsFavoritesOnly();
    });
    $scope.meetings = meetingSvc.getMeetingsFavoritesOnly();
}






function MeetingDetailCtrl($scope, meetingSvc) {

    $scope.getImgSrc = meetingSvc.getImgSrc;
    $scope.getCssClass = meetingSvc.getCssClass;

    $scope.getImgStyle = function(filterObj) {
        var o = {
            "background-image" : "url("+getImgSrc(filterObj)+")"
        }
        log(o)
        return o;
    }
};



function MeetingPageCtrl($scope, $http, $navigate, $routeParams, meetingSvc) {
    $scope.pageTitle = "Meeting Title";

    // hack: disable comments if needed
    $scope.showComments = $routeParams.showComments;


    var addMarkerOptions = function(meeting) {
        var icon = L.Icon.Default;

        var fellowshipID = $scope.getFellowshipID(meeting.fellowship.name);
        var suffix;
        if (meetingSvc.isMeetingStartingSoon(meeting)) {
            suffix = "soon";
        } else {
            suffix = "map";
        }
        var iconUrl = "images/" + fellowshipID + suffix + ".png";

        if (fellowshipID != "") {
            icon = L.icon({ iconUrl: iconUrl });
        }
        var markerOptions = {
            icon: icon
        };
        angular.extend(meeting, { markerOptions: markerOptions });

        return meeting;
    };

    $scope.meeting = addMarkerOptions(meetingSvc.getMeetingByID($routeParams.meetingID));
    log("MeetingPageCtrl", $routeParams.meetingID, $scope.meeting)

    // map options
    $scope.mapOptions = {
        center: L.latLng($scope.meeting.latLon.latitude, $scope.meeting.latLon.longitude),
        zoom: 12
    };
    log($scope.meeting)

}
