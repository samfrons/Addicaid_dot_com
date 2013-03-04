// reset button filter
// map current location
// comma in details address



function FilterCtrl($scope, $http, $navigate, meetingSvc, filterSvc) {
    $scope.lastPath = $navigate.current.path();
//    log("filterctrl", $scope.lastPath);

    $scope.pageTitle = "Meeting Search";

    $scope.filters = filterSvc.filters;

    $scope.getImgSrc = meetingSvc.getImgSrc;
    $scope.getCssClass = meetingSvc.getCssClass;

    $scope.submitFilter = function() {
//        filterSvc.setFilters($scope.filters)
        if ($scope.lastPath == "/meetingfavorites"
            || $scope.lastPath == "/map"
            || $scope.lastPath == "/meetinglist") {
            $navigate.go($scope.lastPath, "slide", true/* isReverse */);
        } else {
            $navigate.go("/meetinglist", "slide", false/* isReverse */);
        }
    }
};

