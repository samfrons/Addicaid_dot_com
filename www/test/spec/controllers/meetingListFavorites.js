'use strict';

describe('Controller: MeetingListFavoritesCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var MeetingListFavoritesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MeetingListFavoritesCtrl = $controller('MeetingListFavoritesCtrl', {
      $scope: scope
    });
  }));

});
