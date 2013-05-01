'use strict';

describe('Directive: leafletMaps', function () {
  beforeEach(module('addicaidApp'));

  var element;

  xit('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<leaflet-maps></leaflet-maps>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the leafletMaps directive');
  }));
});
