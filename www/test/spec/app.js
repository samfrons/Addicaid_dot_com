'use strict';

describe('Module: addicaidApp', function () {

//    beforeEach(module('addicaidApp'));
    var addicaidApp, scope;

    beforeEach(inject(function($rootScope) {
      addicaidApp = angular.module('addicaidApp');
      scope = $rootScope.$new();
    }));

    it('should be registered', function() {
      expect(addicaidApp).not.toBeNull();
    });

    describe('/Dependencies:', function() {

      var deps;
      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      beforeEach(function() {
        deps = addicaidApp.value('appName').requires;
      });

      it('should have ajoslin.mobile-navigate as a dependency', function() {
        expect(hasModule('ajoslin.mobile-navigate')).toBeTruthy();
      });
      it('should have angular-leaflet as a dependency', function() {
        expect(hasModule('angular-leaflet')).toBeTruthy();
      });
    });

});