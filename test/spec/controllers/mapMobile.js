'use strict';

describe('Controller: MapMobileCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var MapMobileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapMobileCtrl = $controller('MapMobileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
