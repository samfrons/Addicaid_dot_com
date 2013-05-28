'use strict';

describe('Controller: EmailListSignupCtrl', function () {

  // load the controller's module
  beforeEach(module('AddicaidDotComApp'));

  var EmailListSignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailListSignupCtrl = $controller('EmailListSignupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
