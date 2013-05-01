'use strict';

describe('Controller: FilterCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var FilterCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FilterCtrl = $controller('FilterCtrl', {
      $scope: scope
    });
  }));

});
