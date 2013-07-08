'use strict';

describe('Controller: MeetingListCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var MeetingListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingListCtrl = $controller('MeetingListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
