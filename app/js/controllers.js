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

function FilterCtrl($scope, $http, $navigate) {
    console.log($navigate);
}

function MapCtrl($scope, $http) {
    angular.extend($scope, {
        center: { lat: 40.65, lng: -73.8 },
        marker: { lat: 40.65, lng: -73.9 },
        message: "Drag me to your node position",
        zoom: 11
    });
}