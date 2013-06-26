'use strict';

describe('Directive: orFilter', function () {
  beforeEach(module('addicaidSiteApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<or-filter></or-filter>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the orFilter directive');
  }));
});
