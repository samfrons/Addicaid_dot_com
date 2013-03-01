




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


//    $scope.mapMarkers = [];
//    $scope.meetings = [{
//        latitude : 37.777,
//        longitude : -122.41
//    } ];


    var addMarkerOptions = function(meetings) {
        for (var i=0; i<meetings.length; i++) {
            var icon = L.Icon.Default;
            switch (meetings[i].fellowship.name) {
                case "AlcoholicsAnonymous":
                    icon = L.icon( { iconUrl: "images/AAmap.png"} );
                    break;
                case "NarcoticsAnonymous":
                    icon = L.icon( { iconUrl: "images/NAmap.png"} );
                    break;
            }

            var markerOptions = {
                icon: icon
            };
            angular.extend(meetings[i], { markerOptions: markerOptions });
        }

        return meetings;
    };


    $scope.openMarkerInfo = function(marker) {
        $scope.currentMarker = marker;
        log('openMarkerInfo')
        var popupContent = "<p>hi</p>";
        marker.bindPopup(popupContent).openPopup();
//        if (marker.meeting) {
//            $scope.myInfoWindow.open($scope.myMap, marker);
//        }
    };

    $scope.$on(meetingsService.meetingsChangedEvent, function(event, args) {
        log("MapCtrl#on#meetings changed", event, args)
        $scope.meetings = addMarkerOptions(meetingsService.getMeetings("map-on"));
    });

    $scope.meetings = addMarkerOptions(meetingsService.getMeetings("map"));

}