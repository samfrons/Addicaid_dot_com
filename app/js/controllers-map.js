




function MapCtrl($scope, $http, meetingSvc) {
    $scope.pageTitle = "Map";

    // Current location
    $scope.currentLatLng= new L.LatLng(meetingSvc.getCurrentLocation().latitude, meetingSvc.getCurrentLocation().longitude);

    // map options
    $scope.mapOptions = {
        center: $scope.currentLatLng,
        zoom: 12,
        markers: [
            L.marker($scope.currentLatLng, { icon: L.icon({iconUrl: "images/here_icon.png"})})
        ]
    };


    var addMarkerOptions = function(meetings) {
        for (var i=0; i<meetings.length; i++) {
            var icon = L.Icon.Default;

            var fellowshipID = $scope.getFellowshipID(meetings[i].fellowship.name);
            var suffix;
            if (meetingSvc.isMeetingStartingSoon(meetings[i])) {
                suffix = "soon";
            } else {
                suffix = "map";
            }
            var iconUrl = "images/" + fellowshipID + suffix + ".png";

            if (fellowshipID != "") {
                icon = L.icon({ iconUrl: iconUrl });
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

    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
        log("MapCtrl#on#meetings changed", event, args)
        $scope.meetings = addMarkerOptions(meetingSvc.getMeetings("map-on"));
    });

    $scope.meetings = addMarkerOptions(meetingSvc.getMeetings("map"));

}