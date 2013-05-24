'use strict';

describe('Controller: PressCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var PressCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PressCtrl = $controller('PressCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
