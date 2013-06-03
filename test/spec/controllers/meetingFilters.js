'use strict';

describe('Controller: MeetingFiltersCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var MeetingFiltersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingFiltersCtrl = $controller('MeetingFiltersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
