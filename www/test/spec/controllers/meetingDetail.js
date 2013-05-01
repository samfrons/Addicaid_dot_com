'use strict';

describe('Controller: MeetingDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var MeetingDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingDetailCtrl = $controller('MeetingDetailCtrl', {
      $scope: scope
    });
  }));

});
