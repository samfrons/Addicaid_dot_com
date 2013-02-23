
/* Controllers */







//var defaultCoordinates = { // NYC
//    latitude : 40.763562,
//    longitude : -73.97140100000001
//};
var defaultCoordinates = { // San Fran
    latitude : 37.777182,
    longitude : -122.416728
};
var defaultST_Point = function() {
    return "ST_Point(" + defaultCoordinates.longitude.toString() + ", " + defaultCoordinates.latitude.toString() + ")";
}
var defaultCartodbAccount = "bigmickey";
var defaultCartodbTable = "intherooms";
var defaultCartodbSql = "SELECT rooms.*, ST_Distance(ST_AsText(rooms.the_geom), ST_AsText("+defaultST_Point()+")) as dst from "+defaultCartodbTable+" rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText("+defaultST_Point()+")) as dst FROM "+defaultCartodbTable+" where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 1";
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-73.97140100000001, 40.763562))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-122.416728, 37.777182))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40






//MainCtrl.$inject = [$scope, $navigate];
function AppCtrl($scope, $navigate) {
    $scope.$navigate = $navigate;
    $navigate.go('/','none');
}

//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http) {
    $scope.pageTitle = "Meeting List";
    $http.get('testfiles/meetings.json').success(function(data) {
        $scope.meetings = data;
    });
}

function MeetingListFavoritesCtrl($scope, $http, $navigate) {
    $scope.pageTitle = "Favorite Meetings";

    logvar("$navigate",$navigate);
}

function SignupCtrl($scope, $http, $navigate) {
    $scope.pageTitle = "Signup";

    logvar("$navigate",$navigate);
}

function MapCtrl($scope, $http) {
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
        zoom: 14
//        layers: null,
//        minZoom: null,
//        maxZoom: null,
//        ,maxBounds: new L.LatLngBounds()
    };


    $scope.leafletMap = null;





    $scope.mapMarkers = [];
    $scope.meetingList = [{
        lat : 37.777,
        lng : -122.41
    } ];


//    log('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK');
    $http.jsonp('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK')
        .success(function(data,status) {
//            // marker for current location
//            $scope.mapMarkers.push(new google.maps.Marker({
//                position: new google.maps.LatLng(defaultCoordinates.latitude, defaultCoordinates.longitude),
//                map: $scope.myMap,
//                icon: "images/compass.png"
//
//            }));

            $scope.meetingList = data.rows;
            for (var i=0; i < $scope.meetingList.length; i++) {
//                var marker = new L.Marker(new L.LatLng($scope.meetingList[i].latitude, $scope.meetingList[i].longitude));
                var marker = {
                    latitude : $scope.meetingList[i].latitude,
                    longitude : $scope.meetingList[i].longitude
                }
                $scope.mapMarkers.push(marker);

//                    map: $scope.myMap,
//                    meeting: {
//                        title: meetingList[i].meeting_title=="Fillmore Ella Hill Community Center" ? "Fillmore Ella" : meetingList[i].meeting_title,
//                        address: meetingList[i].meeting_title=="Fillmore Ella Hill Community Center" ? "1050 Mcallister St" : meetingList[i].address,
//                        time: meetingList[i].time,
//                        day: meetingList[i].day.substring(0,3),
//                        fellowship: meetingList[i].fellowship
//                    },
//                    icon: getMarkerIcon(meetingList[i])
//                }));
            }
        });



log("MapCtrl", $scope);

}


















function TestAppCtrl($scope, $navigate) {
    $scope.$navigate = $navigate;
    $navigate.go('/','none');


    angular.extend($scope, {
        mapCenter: { lat: 40.763562, lng: -73.971401 },
//        marker: { lat: 40.763562, lng: -73.9 },
//        message: "Drag me to your node position",
        mapZoom: 11
    });
    console.log("testAppctrl");
    $scope.mapOptions = {
//        center: new L.LatLng(40.763562, -73.971401),
        zoom: 14
//        layers: null,
//        minZoom: null,
//        maxZoom: null,
//        ,maxBounds: new L.LatLngBounds()
    };
}