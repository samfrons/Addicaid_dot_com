'use strict';

angular.module('addicaidApp')
  .controller('MeetingListFavoritesCtrl', ['$scope', '$rootScope', 'meetingSvc', function ($scope, $rootScope, meetingSvc) {
    $rootScope.sharedVars.pageTitle = 'Favorites';

    $scope.$on(meetingSvc.meetingsChangedEvent, function(event, args) {
      console.log('MeetingListFavoritesCtrl#on#meetings changed', event, args);
      $scope.meetings = meetingSvc.getMeetingsFavoritesOnly();
    });
    $scope.meetings = meetingSvc.getMeetingsFavoritesOnly();
  }]);
