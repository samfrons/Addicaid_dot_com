'use strict';

describe('Controller: HeadlineCtrl', function() {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var HeadlineCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    HeadlineCtrl = $controller('HeadlineCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
