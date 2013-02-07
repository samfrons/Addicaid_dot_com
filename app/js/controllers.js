'use strict';

/* Controllers */


//MainCtrl.$inject = [$scope, $navigate];
function AppCtrl($scope, $navigate) {
    $scope.$navigate = $navigate;
    $navigate.go('/','none');
}

//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http) {
    $http.get('testfiles/meetings.json').success(function(data) {
        $scope.meetings = data;
    });
}

function MapCtrl($scope, $http) {
}