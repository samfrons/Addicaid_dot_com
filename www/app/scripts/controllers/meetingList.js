'use strict';

angular.module('addicaidApp')
  .controller('MeetingListCtrl', ['$scope', '$rootScope', '$filter', 'meetingSvc', 'filterSvc', function($scope, $rootScope, $filter, meetingSvc, filterSvc) {
    $rootScope.sharedVars.pageTitle = 'Meeting List';

    // meetings
    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
      console.log('MeetingListCtrl#on#meetings changed', event, args);
      $scope.meetings = $filter('andOrFilter')(meetingSvc.getMeetings('list-on'), filterSvc.filtersToApply());

    });
    $scope.meetings = $filter('andOrFilter')(meetingSvc.getMeetings('list'), filterSvc.filtersToApply());
  }]);
