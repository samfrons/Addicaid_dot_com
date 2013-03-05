//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http, meetingSvc, filterSvc, $filter) {
    $scope.pageTitle = "Meeting List";

    // meetings
    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
        log("MeetingListCtrl#on#meetings changed", event, args)
        $scope.meetings = $filter("meetingFilter")(meetingSvc.getMeetings("list-on"), filterSvc.filtersToApply());

    });
    $scope.meetings = $filter("meetingFilter")(meetingSvc.getMeetings("list"), filterSvc.filtersToApply());




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
    $scope.meeting = meetingSvc.getMeetingByID($routeParams.meetingID);
    log("MeetingPageCtrl", $routeParams.meetingID, $scope.meeting)

}
