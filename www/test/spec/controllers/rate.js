'use strict';

describe('Controller: RateCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var RateCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RateCtrl = $controller('RateCtrl', {
      $scope: scope
    });
  }));

});
