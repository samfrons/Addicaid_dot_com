'use strict';

describe('Directive: dayFilter', function () {
  beforeEach(module('addicaidSiteApp'));

  var element;

  it('should make hidden element visible', inject(function ($rootScope, $compile) {
    element = angular.element('<day-filter></day-filter>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the dayFilter directive');
  }));
});
