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


    $scope.getRatingViewObject = function(rating) {
        // params(rating) is one of twelve ratings
        // params(isActive) is boolean, whether rating is visible
        var cssClass = "";
        var imgFilename = ""; // without the .png
        var displayText = "";

        switch (rating) {
            case "forYoungPeople":
                cssClass = "young_people";
                imgFilename = "young_people";
                displayText = "young people";
                break;
            case "isLgbt":
                cssClass = "lgbt";
                imgFilename = "lgbt";
                displayText = "lgbt";
                break;
            case "forWomen":
                cssClass = "womens";
                imgFilename = "womens";
                displayText = "womens";
                break;
            case "forNewcomer":
                cssClass = "newcomer";
                imgFilename = "newcomer";
                displayText = "newcomer";
                break;
            case "outsidersWelcome":
                cssClass = "outsiders";
                imgFilename = "outsiders";
                displayText = "outsiders welcome";
                break;
            case "hasWheelchairAccess":
                cssClass = "wheelchair";
                imgFilename = "wheelchair";
                displayText = "wheelchair";
                break;
            case "petsAllowed":
                cssClass = "pets";
                imgFilename = "pets";
                displayText = "pets allowed";
                break;
            case "isHasSnacks":
                cssClass = "snacks";
                imgFilename = "snacks";
                displayText = "snacks";
                break;
            case "isLargeGroup":
                cssClass = "large_group";
                imgFilename = "large_group";
                displayText = "large group";
                break;
            case "isHasMeditation":
                cssClass = "meditation";
                imgFilename = "meditation";
                displayText = "meditation";
                break;
            case "isForMen":
                cssClass = "mens";
                imgFilename = "mens";
                displayText = "mens";
                break;
            case "isHasCoffee":
                cssClass = "coffee";
                imgFilename = "coffee";
                displayText = "coffee";
                break;
            default:
                log("ERROR: unknown rating (" + rating + ") in getRatingViewObject" );
        }

//        if (!isActive) {
//            cssClass = "rating-hide";
//        }

        return {
            cssClass: cssClass,
            imgSrc: imgFilename == "" ? "" : "images/"+imgFilename+".png",
            displayText: displayText
        }
    }

//    $scope.getCssClassRating = function(rating, isActive) {
//        // params(rating) is one of twelve ratings
//        // params(isActive) is boolean, whether rating is visible
//        var cssClass;
//        if (!isActive) {
//            cssClass = "rating-hide";
//        } else {
//            switch (rating) {
//                case "forYoungPeople":
//                    cssClass = ""; break;
//                case "isLgbt":
//                    cssClass = ""; break;
//                case "forWomen":
//                    cssClass = ""; break;
//                case "forNewcomer":
//                    cssClass = ""; break;
//                case "outsidersWelcome":
//                    cssClass = ""; break;
//                case "hasWheelchairAccess":
//                    cssClass = ""; break;
//                case "petsAllowed":
//                    cssClass = ""; break;
//                case "isHasSnacks":
//                    cssClass = ""; break;
//                case "isLargeGroup":
//                    cssClass = ""; break;
//                case "isHasMeditation":
//                    cssClass = ""; break;
//                case "isForMen":
//                    cssClass = ""; break;
//                default:
//                    log("ERROR: unknown rating (" + rating + ") in getCssClassRating" );
//                    cssClass = "";
//            }
//        }
//    }

//    {
//                    },










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
};