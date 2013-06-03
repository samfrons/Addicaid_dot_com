'use strict';

describe('Controller: TumblrPostDetailCtrl', function() {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var TumblrPostDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    TumblrPostDetailCtrl = $controller('TumblrPostDetailCtrl', {
      $scope: scope
    });
  }));

});
