'use strict';

angular.module('addicaidApp')
  .controller('RateCtrl', ['$scope', '$rootScope', '$filter', 'filterSvc', 'meetingSvc', function ($scope, $rootScope, $filter, filterSvc, meetingSvc) {
    $rootScope.sharedVars.pageTitle = 'Rate';

    var setMeetings = function() {
      $scope.meetings = $filter('limitTo')(meetingSvc.getMeetings('RateCtrl-on'),3);
      $scope.showSubmit = angular.isArray($scope.meetings) && $scope.meetings.length > 0;

      // extend meetings with new rating object
      angular.forEach($scope.meetings, function(meeting) {
        angular.extend(meeting, {
          newRatings: filterSvc.createRatingsArray()
        });
      });
      console.log($scope.meetings[0]);
    };

    // watch meetings
    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
      setMeetings();
    });

    if (angular.isUndefined($scope.meetings)) {
      setMeetings();
    }
  }]);
