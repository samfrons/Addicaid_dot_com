'use strict';

angular.module('addicaidSiteApp')
  .controller('MeetingListCtrl', ['$scope', 'pagedListModuleInterface', function ($scope, pagedListModuleInterface) {
    // PAGINATION
    $scope.items = [];
    var loadItems = function() {
      $scope.items = pagedListModuleInterface.getItems('MeetingListCtrl.loadItems');
    };
    pagedListModuleInterface.addListenerToItems(loadItems);


    $scope.currentPage = 0;
    $scope.pageSize = 5;
    $scope.numberOfPages = function() {
      return Math.ceil($scope.items.length/$scope.pageSize);
    };
  }]);
