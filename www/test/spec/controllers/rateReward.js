'use strict';

describe('Controller: RateRewardCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var RateRewardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RateRewardCtrl = $controller('RateRewardCtrl', {
      $scope: scope
    });
  }));

});
