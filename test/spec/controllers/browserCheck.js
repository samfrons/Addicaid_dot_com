'use strict';

describe('Controller: BrowserCheckCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var BrowserCheckCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BrowserCheckCtrl = $controller('BrowserCheckCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
