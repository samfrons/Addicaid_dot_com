
/* Controllers */











//MainCtrl.$inject = [$scope, $navigate];
function AppCtrl($scope, $navigate) {
    $scope.$navigate = $navigate;
    $navigate.go('/','none');
}



function SignupCtrl($scope, $http, $navigate) {
    $scope.pageTitle = "Signup";
}


function ProfileCtrl($scope, $http, $navigate) {
    $scope.pageTitle = "Profile";
}

function DailyDoseCtrl($scope, $http, $navigate) {
    $scope.pageTitle = "Daily Dose";
}

function MeetingPageCtrl($scope, $http, $navigate) {
    $scope.pageTitle = "Meeting Title";
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
