'use strict';

describe('Controller: TestCtrl', function () {

  // load the controller's module
  beforeEach(module('addicaidApp'));

  var TestCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestCtrl = $controller('TestCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });

  describe('/$scope:', function() {
    describe('/getPartialUrl function:', function() {

      it('should have getPartialUrl function', function () {
        expect(angular.isFunction(scope.getPartialUrl)).toBeTruthy();
      });

      it('should create a random partial url', function () {
        expect(scope.getPartialUrl('happy123')).toEqual('views/happy123.html');
      });

      it('should fetch a predefined partial url', function () {
        expect(scope.getPartialUrl('testSwitchStatement')).toEqual('testUrlHere');
      });

    });
  });
});
