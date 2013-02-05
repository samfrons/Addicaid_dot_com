'use strict';

var defaultViews = {
    "cards" : {
        "meeting" : "partials/templates/cards/meeting.html",
        "dailydose-word_choice" : "partials/templates/cards/dailydose-word_choice.html",
        "dailydose-fill_in" : "partials/templates/cards/dailydose-fill_in.html",
        "connect-attend" : "partials/templates/cards/connect-attend.html",
        "connect-standard" : "partials/templates/cards/connect-standard.html",
        "music" : "partials/templates/cards/music.html",

        "test" : "partials/test.html"
    },
    "header" : "partials/templates/header.html",
    "footer" : "partials/templates/footer.html"
};

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
var defaultCartodbSql = "SELECT rooms.*, ST_Distance(ST_AsText(rooms.the_geom), ST_AsText("+defaultST_Point()+")) as dst from "+defaultCartodbTable+" rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText("+defaultST_Point()+")) as dst FROM "+defaultCartodbTable+" where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40";
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-73.97140100000001, 40.763562))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40
// select rooms.*, x.dst as dst from intherooms rooms join (SELECT max(cartodb_id) as id,  ST_Distance(ST_AsText(the_geom), ST_AsText(ST_Point(-122.416728, 37.777182))) as dst FROM intherooms where fellowship in ('Alcoholics Anonymous', 'Narcotics Anonymous', 'Gamblers Anonymous', 'Overeaters Anonymous') group by dst) x on rooms.cartodb_id = x.id order by dst asc limit 40


/* Controllers */
function HomeCtrl($scope, $http) {
    $scope.views = defaultViews;
    $scope.playSound = function(soundfile) {
        $scope.dummy.innerHTML=
            "<embed src=\""+soundfile+"\" hidden=\"true\" autostart=\"true\" loop=\"false\" />";
    };

    $scope.setMeetingGoing = function(card, going) {
        angular.extend(card, {
            isGoing : going,
            goingText : going ? "Going!" : "Go!"
        });
    };
    $scope.setRespected = function(card, respected) {
        angular.extend(card, {
            respected : respected,
            respectedText : respected ? "Respected!" : "Respect!"
        });
    };
    $scope.setDDSharing = function(card, submitted, sharing) {
        angular.extend(card, {
            submitted : submitted,
            sharing : sharing,
            secretButtonText : "Keep Secret",
            shareButtonText : "Share"
        });

        if (submitted && sharing=="secret") {
            card.secretButtonText = "Secret";
            card.shareButtonText = "Share";
        } else if (submitted && sharing=="share") {
            card.secretButtonText = "Keep Secret";
            card.shareButtonText = "Shared";
        }
    };


    $scope.tapDDSubmit = function(card, sharingButtonType) {
        var sharing, submitted;
        if (card.submitted && card.sharing == sharingButtonType) {
            submitted = false;
            sharing = "";
        } else {
            submitted = true;
            sharing = sharingButtonType;
        }
        $scope.setDDSharing(card, submitted, sharing);
    };



    $scope.multiClass = function(classArray){
        return classArray.join(" ");
    }




    // add cards statically
    $scope.cards = [];
    $http.get('tmp/cards/meeting1.json')
        .success(function(card) {
            $scope.setMeetingGoing(card, false);
            $scope.cards.push(card);
            $http.get('tmp/cards/connect-attend1.json')
                .success(function(card) {
                    $scope.setMeetingGoing(card, false);
                    $scope.setRespected(card, false);
                    $scope.cards.push(card);
                    $http.get('tmp/cards/dailydose-word_choice1.json')
                        .success(function(card) {
                            $scope.setDDSharing(card, false, "");
                            $scope.cards.push(card);

                            $scope.cards.push({cardType: "music"});
                        });
                    $http.get('tmp/cards/dailydose-fill_in1.json')
                        .success(function(card) {
                            $scope.setDDSharing(card, false, "");
                            $scope.cards.push(card);
                        });
                    $http.get('tmp/cards/meeting2.json')
                        .success(function(card) {
                            $scope.setMeetingGoing(card, true);
                            $scope.cards.push(card);

                            $scope.cards.push({cardType: "blank"});
                        });
                });
        });



}

function DailyDoseCtrl($scope, $http) {
    $scope.views = defaultViews;

    $scope.setDDSharing = function(card, submitted, sharing) {
        angular.extend(card, {
            submitted : submitted,
            sharing : sharing,
            secretButtonText : "Keep Secret",
            shareButtonText : "Share"
        });

        if (submitted && sharing=="secret") {
            card.secretButtonText = "Secret";
            card.shareButtonText = "Share";
        } else if (submitted && sharing=="share") {
            card.secretButtonText = "Keep Secret";
            card.shareButtonText = "Shared";
        }
    };

    $scope.tapDDSubmit = function(card, sharingButtonType) {
        var sharing, submitted;
        if (card.submitted && card.sharing == sharingButtonType) {
            submitted = false;
            sharing = "";
        } else {
            submitted = true;
            sharing = sharingButtonType;
        }
        $scope.setDDSharing(card, submitted, sharing);
    };

    $scope.multiClass = function(classArray){
        return classArray.join(" ");
    }

    // add cards statically
    $scope.cards = [];
    $scope.cards.push({cardType: "dailydose-other", src: "partials/templates/cards/dailydose-rewards.html"});
    $http.get('tmp/cards/dailydose-word_choice1.json')
        .success(function(card) {
            $scope.setDDSharing(card, true, "secret");
            $scope.cards.push(card);

            $scope.cards.push({cardType: "dailydose-other", src: "partials/templates/cards/dailydose-picture.html"});
            $http.get('tmp/cards/dailydose-fill_in1.json')
                .success(function(card) {
                    $scope.setDDSharing(card, false, "");
                    $scope.cards.push(card);

                    $scope.cards.push({cardType: "blank"});
                });

    });

}


function ConnectCtrl($scope, $http) {
    $scope.views = defaultViews;

    // add cards statically
    $scope.cards = [];
    $http.get('tmp/cards/users.json')
        .success(function(cards) {
            $scope.cards = cards;
        });
}

function ContentCtrl($scope, $http) {
    $scope.views = defaultViews;
}

function ProfileCtrl($scope) {
    $scope.views = defaultViews;
}

function FeedCtrl($scope) {
    $scope.views = defaultViews;
}

function TestCtrl($scope) {
    $scope.views = defaultViews;

}

function MeetingsMapCtrl($scope, $http) {
    $scope.views = defaultViews;

    $scope.myMarkers = [];

    $scope.mapOptions = {
        center: new google.maps.LatLng(defaultCoordinates.latitude, defaultCoordinates.longitude),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                stylers: [
                    { hue: "#00ffe6" },
                    { saturation: -20 }
                ]
            },{
                featureType: "road",
                elementType: "geometry",
                stylers: [
                    { lightness: 100 },
                    { visibility: "simplified" }
                ]
            },{
                featureType: "road",
                elementType: "labels",
                stylers: [
                    { visibility: "on" }
                ]
            }
        ]
    };

    $scope.initializeMap = function() {
        var getMarkerIcon = function(meeting) {
            var now = new Date();
//            var now = new Date(2013, 0, 24, 16, 0);
//            console.log(now.getHours());
            now.setHours(16);
//console.log(now.getHours());

            var isSoon = false;
            var days = [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY" ];
            if (now.getDay() == days.indexOf(meeting.day)) {
                var d = new Date();
                var time = meeting.time.match(/(\d+)(:)(\d\d)/);
                d.setHours(parseInt(time[1], 10));
                if (d.getHours() >= now.getHours() && d.getHours() <= now.getHours()+5) {
                    console.log(now.getHours());

                    isSoon = true;
                }
            }

            var iconSrc = "";
            switch (meeting.fellowship) {
                case "Alcoholics Anonymous":
                    iconSrc = isSoon ? "images/aa_map_icon_time.png" : "images/aa_map_icon.png";
                    break;
                case "Narcotics Anonymous":
                    iconSrc = isSoon ? "images/na_map_icon_time.png" : "images/na_map_icon.png";
                    break;
                case "Gamblers Anonymous":
                    iconSrc = isSoon ? "images/ga_map_icon_time.png" : "images/ga_map_icon.png";
                    break;
                case "Overeaters Anonymous":
                    iconSrc = isSoon ? "images/oa_map_icon_time.png" : "images/oa_map_icon.png";
                    break;
            }
            return iconSrc;
        };

        $http.jsonp('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK')
            .success(function(data,status) {
                // marker for current location
                $scope.myMarkers.push(new google.maps.Marker({
                    position: new google.maps.LatLng(defaultCoordinates.latitude, defaultCoordinates.longitude),
                    map: $scope.myMap,
                    icon: "images/compass.png"

                }));

                var meetingList = data.rows;
                for (var i=0; i < meetingList.length; i++) {
                    $scope.myMarkers.push(new google.maps.Marker({
                        position: new google.maps.LatLng(meetingList[i].latitude, meetingList[i].longitude),
                        map: $scope.myMap,
                        meeting: {
                            title: meetingList[i].meeting_title=="Fillmore Ella Hill Community Center" ? "Fillmore Ella" : meetingList[i].meeting_title,
                            address: meetingList[i].meeting_title=="Fillmore Ella Hill Community Center" ? "1050 Mcallister St" : meetingList[i].address,
                            time: meetingList[i].time,
                            day: meetingList[i].day.substring(0,3),
                            fellowship: meetingList[i].fellowship
                        },
                        icon: getMarkerIcon(meetingList[i])
                    }));
                }
            });
    }
    $scope.initializeMap();

//    $scope.addMarker = function($event) {
//        $scope.myMarkers.push(new google.maps.Marker({
//            map: $scope.myMap,
//            position: $event.latLng
//        }));
//    };

    $scope.openMarkerInfo = function(marker) {
        $scope.currentMarker = marker;
        if (marker.meeting) {
            $scope.myInfoWindow.open($scope.myMap, marker);
        }
    };

//    $scope.setMarkerPosition = function(marker, lat, lng) {
//        marker.setPosition(new google.maps.LatLng(lat, lng));
//    };
}

function MeetingsListCtrl($scope, $http, $navigate) {
    $scope.views = defaultViews;
    $scope.navigate = $navigate;

    $scope.setMeetingGoing = function(card, going) {
        angular.extend(card, {
            isGoing : going,
            goingText : going ? "Going!" : "Go!"
        });
    };

    $scope.initialize = function() {
        $http.jsonp('http://'+defaultCartodbAccount+'.cartodb.com/api/v2/sql/?q='+defaultCartodbSql+'&callback=JSON_CALLBACK')
            .success(function(data,status) {
                $scope.cards = [];

                var meetingList = data.rows;
                for (var i=0; i < meetingList.length; i++) {
                    var card = {
                        data : {
                            title : meetingList[i].meeting_title,
                            location: {
                                title: meetingList[i].location,
                                address1: meetingList[i].address,
                                address2: "." // hack here
                            },
                            numberOfMembers: Math.floor((Math.random()*40)+1),
                            calendar: {
                                day: meetingList[i].day.substring(0,3),
                                time: meetingList[i].time.replace(" ","")
                            }
                        }
                    };
                    $scope.setMeetingGoing(card, false);
                    $scope.cards.push(card);
                }
            });
    }
    $scope.initialize();

//    $http.get('tmp/cards/meetings.json').success(function(data) {
//        console.log(data);
//        $scope.meetingsArray = data;
//    });
}

function MeetingsFilterCtrl($scope) {
//    $scope.navigate = $navigate;
    $scope.views = defaultViews;
}

function MeetingDetailCtrl($scope, $http, $navigate, $routeParams) {
    $http.get('tmp/single.json').success(function(data) {
        $scope.meetingData = data;
    });
    $scope.navigate = $navigate;
    $scope.meetingID = $routeParams.meetingID;
    $scope.views = defaultViews;
}
