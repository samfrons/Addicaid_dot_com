'use strict';

describe('Controller: SignupFlowCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var SignupFlowCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignupFlowCtrl = $controller('SignupFlowCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
