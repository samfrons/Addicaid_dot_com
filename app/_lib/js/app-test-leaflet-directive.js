var App = angular.module('addicaid', []);
//.
//    config(['$routeProvider', function($routeProvider) {
//        $routeProvider.
//            when('/meetings_map', {templateUrl: 'partials/meetings-map.html',   controller: MeetingsMapCtrl}).
//            when('/test', {templateUrl: 'partials/test.html',   controller: TestCtrl}).
////            when('/meetings/:meetingId', {templateUrl: 'partials/meeting-detail.html', controller: PhoneDetailCtrl}).
//            otherwise({redirectTo: '/meetings_map'});
//    }]);



App.directive('sap', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
//            var map = L.map(attrs.id, {
//                center: [40, -86],
//                zoom: 10
//            });
//            //create a CloudMade tile layer and add it to the map
//            L.tileLayer('http://{s}.tile.cloudmade.com/57cbb6ca8cac418dbb1a402586df4528/997/256/{z}/{x}/{y}.png', {
//                maxZoom: 18
//            }).addTo(map);
//
//            //add markers dynamically
//            var points = [{lat: 40, lng: -86},{lat: 40.1, lng: -86.2}];
//            for (var p in points) {
//                L.marker([points[p].lat, points[p].lng]).addTo(map);
//            }

            var map = new L.map('map').setView([40.65, -73.9], 11);

            //create a CloudMade tile layer and add it to the map
            L.tileLayer('http://{s}.tiles.mapbox.com/v3/samfrons.map-dcwttqie/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                maxZoom: 18
            }).addTo(map);

            var meetingsLayer =  new L.GeoJSON(null, {

                pointToLayer: function(feature, latlng) { return new L.CircleMarker(latlng,  {
                    radius: 5,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.3
                }) }
            });
            var sql = "SELECT * FROM intherooms limit 100";// where fellowship='Alcoholics Anonymous'";
            var cartodbUrl = "http://bigmickey.cartodb.com/api/v2/sql/?q="+sql+"&format=GeoJSON&callback=cartodb_jsonp_callback";
            $http.jsonp(cartodbUrl)
                .success(function(geojson) {
                    console.log(geojson);
                    console.log(meetingsLayer.addData(geojson));
                });

            map.addLayer(meetingsLayer);


        }
    };
});

function MapCtrl($scope) {}








var doMap = function() {
    var map = new L.map('map').setView([40.65, -73.9], 11);



    L.tileLayer('http://{s}.tiles.mapbox.com/v3/samfrons.map-dcwttqie/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
        maxZoom: 18
    }).addTo(map);

    var meetingsLayer =  new L.GeoJSON(null, {

        pointToLayer: function(feature, latlng) { return new L.CircleMarker(latlng,  {
            radius: 5,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.3
        }) }
    });

//        meetingsLayer.on("featureparse", function (e) {
//            var circleA = Math.sqrt((e.properties[summons])/3.141592654)
//            e.layer.bindPopup("<p><b style='font-size:18px'>"+e.properties.precinct+" Precinct</b></p><p>" + e.properties['full_address'] + "</p><p>Summonses: <b style='font-size:22px'>" + e.properties[summons] + "</b></p><p><b style='font-size:11px; color:#333'>Precinct population</b></p><p>White: "+e.properties['per_white']+"%</p><p>Nonwhite: "+(100-eval(e.properties['per_white']))+"%</p>");
//            e.layer.setRadius(circleA);
//            e.layer.setStyle(hoverOffStyle);
//        });
//        meetingsLayer.on("mouseover", function (e) {
//            e.layer.setStyle(hoverOnStyle);
//        });
//        meetingsLayer.on("mouseout", function (e) {
//            e.layer.setStyle(hoverOffStyle);
//        });

    var sql = "SELECT * FROM intherooms limit 100";// where fellowship='Alcoholics Anonymous'";
    var cartodbUrl = "http://bigmickey.cartodb.com/api/v2/sql/?q="+sql+"&format=GeoJSON&callback=cartodb_jsonp_callback";
//    $http.jsonp(cartodbUrl)
//        .success(function(geojson) {
//            console.log(geojson);
//            console.log(meetingsLayer.addData(geojson));
//        });

    map.addLayer(meetingsLayer);



}

function cartodb_jsonp_callback(geojson) {
    // returning from async callbacks is (generally) meaningless
    console.log(geojson);
}