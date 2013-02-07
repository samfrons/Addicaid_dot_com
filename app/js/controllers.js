'use strict';

/* Controllers */


//MainCtrl.$inject = [$scope, $navigate];
function MainCtrl($scope, $navigate) {
    $scope.$navigate = $navigate;
    $navigate.go('/','none');
}

//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http) {
    $scope.meetings = [];
}
