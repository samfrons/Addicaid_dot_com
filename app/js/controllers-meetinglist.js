//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http, meetingsService) {
    $scope.pageTitle = "Meeting List";

    $scope.$on(meetingsService.meetingsChangedEvent, function(event, args) {
        log("MeetingListCtrl#on#meetings changed", event, args)
        $scope.meetings = meetingsService.getMeetings("list-on");
    });
    $scope.meetings = meetingsService.getMeetings("list");
}





function MeetingListFavoritesCtrl($scope, $http, meetingsService) {
    $scope.pageTitle = "Favorite Meetings";

    $scope.$on(meetingsService.meetingsChangedEvent, function(event, args) {
        log("MeetingListFavoritesCtrl#on#meetings changed", event, args)
        $scope.meetings = meetingsService.getMeetingsFavoritesOnly();
    });
    $scope.meetings = meetingsService.getMeetingsFavoritesOnly();
}






function MeetingDetailCtrl($scope, meetingsService) {

    $scope.getImgSrc = meetingsService.getImgSrc;
    $scope.getCssClass = meetingsService.getCssClass;

    $scope.getImgStyle = function(filterObj) {
        var o = {
            "background-image" : "url("+getImgSrc(filterObj)+")"
        }
        log(o)
        return o;
    }
};



function MeetingPageCtrl($scope, $http, $navigate, $routeParams, meetingsService) {
    $scope.pageTitle = "Meeting Title";
    $scope.meeting = meetingsService.getMeetingByID($routeParams.meetingID);
    log("MeetingPageCtrl", $routeParams.meetingID, $scope.meeting)

}
