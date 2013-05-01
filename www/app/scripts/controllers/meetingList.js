'use strict';

angular.module('addicaidApp')
  .controller('MeetingListCtrl', ['$scope', '$filter', 'meetingSvc', 'filterSvc', function($scope, $filter, meetingSvc, filterSvc) {
    $scope.pageTitle = 'Meeting List';

    // meetings
    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
      console.log('MeetingListCtrl#on#meetings changed', event, args);
      $scope.meetings = $filter('andOrFilter')(meetingSvc.getMeetings('list-on'), filterSvc.filtersToApply());

    });
    $scope.meetings = $filter('andOrFilter')(meetingSvc.getMeetings('list'), filterSvc.filtersToApply());
  }]);
