




function FilterCtrl($scope, $http, $navigate, meetingsService) {
    $scope.lastPath = $navigate.current.path();
//    log("filterctrl", $scope.lastPath);

    $scope.pageTitle = "Meeting Search";

    $scope.filters = meetingsService.getFilters();

    $scope.getImgSrc = meetingsService.getImgSrc;
    $scope.getCssClass = meetingsService.getCssClass;

    $scope.submitFilter = function() {
        meetingsService.setFilters($scope.filters)
        if ($scope.lastPath == "/meetingfavorites"
            || $scope.lastPath == "/map"
            || $scope.lastPath == "/meetinglist") {
            $navigate.go($scope.lastPath, "slide", true/* isReverse */);
        } else {
            $navigate.go("/meetinglist", "slide", false/* isReverse */);
        }
    }
};



function RatingsCtrl($scope, $http, $navigate, $dialog) {
//    $scope.pageTitle = "Meeting Search";

    $scope.ratings= [
        {
            text: "snacks"
        },
        {
            text: "young people"
        },
        {
            text: "large group"
        },
        {
            text: "lgbt"
        },
        {
            text: "meditation"
        },
        {
            text: "mens"
        },
        {
            text: "newcomer"
        },
        {
            text: "outsiders welcome",
            cssClass: "outsiders",
            imgFilename: "outsiders"
        },
        {
            text: "womens"
        },
        {
            text: "young people"
        },
        {
            text: "wheelchair"
        },
        {
            text: "pets allowed",
            cssClass: "pets",
            imgFilename: "pets"
        }
    ];


    $scope.getImgSrc = getImgSrc;
    $scope.getCssClass = getCssClass;



};



// the dialog is injected in the specified controller
function RatingsDialogCtrl($scope, dialog){
    $scope.close = function(result){
        dialog.close(result);
    };
}