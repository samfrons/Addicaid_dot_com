//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http, meetingSvc) {
    $scope.pageTitle = "Meeting List";

    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
        log("MeetingListCtrl#on#meetings changed", event, args)
        $scope.meetings = meetingSvc.getMeetings("list-on");
    });
    $scope.meetings = meetingSvc.getMeetings("list");
}





function MeetingListFavoritesCtrl($scope, $http, meetingSvc) {
    $scope.pageTitle = "Favorite Meetings";

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
