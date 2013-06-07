'use strict';

angular.module('addicaidSiteApp')
  .controller('TestMapCtrl', ['$scope', 'meetings', 'Restangular', function($scope, meetings, Restangular) {

    // meetings
    $scope.$on(meetings.meetingsChangedEvent, function(event, args) {
      console.log('MapCtrl#on_meetingsChanged', event, args);
      $scope.meetings = meetings.getMeetings('map-on');
//      $scope.meetings = $filter('andOrFilter')(meetings.getMeetings('map-on'), filterSvc.filtersToApply());

    });
//    $scope.meetings = $filter('andOrFilter')(meetingSvc.getMeetings('map-init'), filterSvc.filtersToApply());
    $scope.meetings = meetings.getMeetings('map-init');





    var baseMeetings= Restangular.all('meetings.json');
    baseMeetings.getList().then(function(data) {
      console.log(data);
    });
  }]);
