//MeetingListCtrl.$inject = [$scope];
function MeetingListCtrl($scope, $http, meetingsService) {
    $scope.pageTitle = "Meeting List";

    $scope.$on(meetingsService.meetingsChangedEvent, function(event, args) {
        log("MeetingListCtrl#on#meetings changed", event, args)
        $scope.meetings = meetingsService.getMeetings("list-on");
    });
    $scope.meetings = meetingsService.getMeetings("list");
}





function MeetingListFavoritesCtrl($scope, $http, meetingsService) {
    $scope.pageTitle = "Favorite Meetings";

    $scope.$on(meetingsService.meetingsChangedEvent, function(event, args) {
        log("MeetingListFavoritesCtrl#on#meetings changed", event, args)
        $scope.meetings = meetingsService.getMeetingsFavoritesOnly();
    });
    $scope.meetings = meetingsService.getMeetingsFavoritesOnly();
}






function MeetingDetailCtrl($scope, meetingsService) {

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


    $scope.toggleFavorite = function(meeting) {
        meeting.isFavorite = !meeting.isFavorite;
    }

    //
//    $scope.dialogOpts = {
////        backdrop: true,
////        keyboard: true,
////        backdropClick: true,
//        templateUrl: $scope.views.ratingsDialog,
//        controller: 'RatingsDialogCtrl'
//    };
//    $scope.openDialog = function(){
//        log('hi')
//        var d = $dialog.dialog($scope.dialogOpts);
//        d.open().then(function(result){
//            alert('dialog closed with result: ' + result.result+' '+result.name+' '+result.Employer_Name);
//        });
//    };
}