'use strict';

describe('Controller: MainMobileCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var MainMobileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainMobileCtrl = $controller('MainMobileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
