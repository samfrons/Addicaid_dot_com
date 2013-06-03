'use strict';

describe('Controller: TumblrCtrl', function() {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var TumblrCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    TumblrCtrl = $controller('TumblrCtrl', {
      $scope: scope
    });
  }));

});
