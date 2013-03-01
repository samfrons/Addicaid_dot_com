




function MapCtrl($scope, $http, meetingsService) {
    $scope.pageTitle = "Map";

//    angular.extend($scope, {
//        mapCenter: { lat: 40, lng: -4 },
//        mapCenter: { lat: 40.763562, lng: -73.971401 },
//        marker: { lat: 40.763562, lng: -73.9 },
//        message: "Drag me to your node position",
//        mapZoom: 11
//    });
    $scope.mapOptions = {
        center: new L.LatLng(defaultCoordinates.latitude, defaultCoordinates.longitude),
        zoom: 12
//        layers: null,
//        minZoom: null,
//        maxZoom: null,
//        ,maxBounds: new L.LatLngBounds()
    };


    $scope.mapMarkers = [];
//    $scope.meetings = [{
//        latitude : 37.777,
//        longitude : -122.41
//    } ];


    $scope.$on(meetingsService.meetingsChangedEvent, function(event, args) {
        log("MapCtrl#on#meetings changed", event, args)
        $scope.meetings = meetingsService.getMeetings("map-on");
    });

    $scope.meetings = meetingsService.getMeetings("map");

}