

function RatingsCtrl($scope, $http, $navigate, $dialog) {
//    $scope.pageTitle = "Meeting Search";

    $scope.ratings= [
        {
            text: "snacks"
        },

        {
            text: "fellowship"
        },

        {
            text: "cool venue"
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