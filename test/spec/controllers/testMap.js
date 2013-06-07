'use strict';

describe('Controller: TestMapCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var TestMapCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestMapCtrl = $controller('TestMapCtrl', {
      $scope: scope
    });
  }));

});
