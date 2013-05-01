'use strict';

describe('Controller: TestAlloCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var TestAlloCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestAlloCtrl = $controller('TestAlloCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

});
