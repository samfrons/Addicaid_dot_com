'use strict';

describe('Controller: EmailListSignupCtrl', function() {

  // load the controller's module
  beforeEach(module('addicaidSiteApp'));

  var EmailListSignupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    EmailListSignupCtrl = $controller('EmailListSignupCtrl', {
      $scope: scope
    });
  }));

});
