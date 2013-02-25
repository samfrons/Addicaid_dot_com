var namify = function namify(filterObj, param) {
    var result = "";
    if (filterObj[param] !== undefined) {
        result = filterObj[param];
    } else {
        result = filterObj.text.replace(" ", "_");
    }
    return result;
}

var getImgSrc = function(filterObj) {
    return "../images/" + namify(filterObj, "imgFilename") + ".png";
}

var getCssClass = function(filterObj) {
    return namify(filterObj, "cssClass");
}




function FilterCtrl($scope, $http, $navigate) {
    $scope.pageTitle = "Meeting Search";

    $scope.filters = {
        location: {
            useCurrentLocation: "true"
        },
        fellowships: [
            {
                text: "Alcoholics Anonymous",
                cssClass: "AA"
            },
            {
                text: "Narcotics Anonymous",
                cssClass: "NA"
            }
        ],
        days: [
            {
                text: "MON",
                selected: true
            },
            {
                text: "TUE"
            },
            {
                text: "WED"
            },
            {
                text: "THU"
            },
            {
                text: "FRI"
            },
            {
                text: "SAT"
            },
            {
                text: "SUN"
            }
        ],
        times: [
            {
                text1: "morning",
                text2: "6AM - 12PM",
                imgFilename: "clock"
            },
            {
                text1: "afternoon",
                text2: "12PM - 5PM",
                imgFilename: "clock"
            },
            {
                text1: "evening",
                text2: "5PM - 8PM",
                imgFilename: "clock"
            },
            {
                text1: "night",
                text2: "8PM AND ON",
                imgFilename: "clock"
            }
        ],
        ratings: [
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
        ]

    };

    $scope.getImgSrc = getImgSrc;
    $scope.getCssClass = getCssClass;
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

function MeetingDetailCtrl($scope, $dialog) {
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