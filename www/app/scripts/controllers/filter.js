'use strict';

angular.module('addicaidApp')
  .controller('FilterCtrl', ['$scope', '$rootScope', 'meetingSvc', 'filterSvc', function($scope, $rootScope, meetingSvc, filterSvc) {
    $rootScope.sharedVars.pageTitle = 'Meeting Search';

    $scope.getImgSrc = meetingSvc.getImgSrc;
    $scope.getCssClass = meetingSvc.getCssClass;

    $scope.filters = filterSvc.filters;
    $scope.resetFilters = function() {
      filterSvc.resetFilters();
      $scope.filters = filterSvc.filters;
    };




    $scope.toggleVar = function(preToggle) {
      var postToggle = !preToggle;
      console.log('TOGGLING: '+preToggle+' --> '+postToggle);
      return postToggle;
    };
  }]);
