'use strict';

describe('Controller: MeetingDetailPageCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var MeetingDetailPageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingDetailPageCtrl = $controller('MeetingDetailPageCtrl', {
      $scope: scope
    });
  }));

});
