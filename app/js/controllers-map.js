




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


    $scope.markerPopupContentFn = function(meeting) {
        var popupContent = '' +
            '<hgroup class="grids grid-7">' +
            '   <h3>' + meeting.title + '</h3>' +
            '   <h4 class="locationname">' + meeting.latLon.locationName + '</h4>' +
            '   <h4>' + $scope.parseAddress(meeting.address,1) + '</h4>' +
            '   <h4>' + $scope.parseAddress(meeting.address,2) + '</h4>' +
            '</hgroup>' +
            '<aside class="grids grid-4 right_side">' +
            '<div class="timeandday">' +
            '    <p>' + $scope.formatTime(meeting.time) + '</p>' +
            '    <p>' + $scope.formatDay(meeting.day) + '</p>' +
            '    <p>' + $scope.formatDistance(meeting.distance) + '</p>' +
            '</div>' +
            '</aside>';2
        return popupContent;
    };


    $scope.$on(meetingsService.meetingsChangedEvent, function(event, args) {
        log("MapCtrl#on#meetings changed", event, args)
        $scope.meetings = addMarkerOptions(meetingsService.getMeetings("map-on"));
    });

    $scope.meetings = addMarkerOptions(meetingsService.getMeetings("map"));

}