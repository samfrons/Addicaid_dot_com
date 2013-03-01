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