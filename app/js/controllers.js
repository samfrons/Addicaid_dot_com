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
        mapCenter: { lat: 40.763562, lng: -73.971401 },
//        marker: { lat: 40.763562, lng: -73.9 },
//        message: "Drag me to your node position",
        mapZoom: 11
    });
console.log("ctrl");
    $scope.mapOptions = {
//        center: new L.LatLng(40.763562, -73.971401),
        zoom: 14
//        layers: null,
//        minZoom: null,
//        maxZoom: null,
//        ,maxBounds: new L.LatLngBounds()
    };

}