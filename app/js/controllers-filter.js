




function FilterCtrl($scope, $http, $navigate, meetingsService) {
    $scope.pageTitle = "Meeting Search";

    $scope.filters = meetingsService.getFilters();

    $scope.getImgSrc = meetingsService.getImgSrc;
    $scope.getCssClass = meetingsService.getCssClass;

    $scope.submitFilter = function() {
        log('submit')
        meetingsService.setFilters($scope.filters)
        $navigate.back();
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

function MeetingDetailCtrl($scope, $dialog, meetingsService) {

    $scope.getImgSrc = meetingsService.getImgSrc;
    $scope.getCssClass = meetingsService.getCssClass;

    $scope.getImgStyle = function(filterObj) {
        var o = {
            "background-image" : "url("+getImgSrc(filterObj)+")"
        }
        log(o)
        return o;
    }


    $scope.getFellowshipID = function(fellowshipName) {
        var id;
        switch (fellowshipName) {
            case "AlcoholicsAnonymous":
                id = "AA";
                break;
            case "NarcoticsAnonymous":
                id = "NA";
                break;
        }
        return id;
    }
    $scope.parseAddress = function(address, part) {
        return address.split('\n')[part-1];
    };
    $scope.formatTime = function(time) {
        return time;
    };
    $scope.formatDay = function(day) {
        return day.substr(0,3);
    };
    $scope.formatDistance= function(distance) {
        var result=parseFloat(distance);
        if (isFinite(result)) {
            result = "(" + result + ")";
        } else {
            result = null;
        }
        return result;
    };
    $scope.getStarImgSrc = function(isFavorite) {
        return isFavorite ? "images/star_icon_on.png" : "images/star_icon.png";
    };












    $scope.dialogOpts = {
//        backdrop: true,
//        keyboard: true,
//        backdropClick: true,
        templateUrl: $scope.views.ratingsDialog,
        controller: 'RatingsDialogCtrl'
    };
    $scope.openDialog = function(){
        log('hi')
        var d = $dialog.dialog($scope.dialogOpts);
        d.open().then(function(result){
            alert('dialog closed with result: ' + result.result+' '+result.name+' '+result.Employer_Name);
        });
    };
}

// the dialog is injected in the specified controller
function RatingsDialogCtrl($scope, dialog){
    $scope.close = function(result){
        dialog.close(result);
    };
}