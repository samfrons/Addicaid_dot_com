'use strict';

describe('Controller: FeaturesCtrl', function () {

  // load the controller's module
  beforeEach(module('appApp'));

  var FeaturesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FeaturesCtrl = $controller('FeaturesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
