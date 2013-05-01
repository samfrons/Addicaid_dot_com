'use strict';

angular.module('addicaidApp')
  .controller('FilterCtrl', ['$scope', 'meetingSvc', 'filterSvc', function($scope, meetingSvc, filterSvc) {
    $scope.pageTitle = 'Meeting Search';

    $scope.getImgSrc = meetingSvc.getImgSrc;
    $scope.getCssClass = meetingSvc.getCssClass;

    $scope.filters = filterSvc.filters;
    $scope.resetFilters = function() {
      filterSvc.resetFilters();
      $scope.filters = filterSvc.filters;
    };
  }]);
