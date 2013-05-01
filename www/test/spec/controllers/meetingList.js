'use strict';

describe('Controller: MeetingListCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var MeetingListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingListCtrl = $controller('MeetingListCtrl', {
      $scope: scope
    });
  }));

});
