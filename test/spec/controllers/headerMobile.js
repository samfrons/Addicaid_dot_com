'use strict';

describe('Controller: HeaderMobileCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var HeaderMobileCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HeaderMobileCtrl = $controller('HeaderMobileCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
