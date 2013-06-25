'use strict';

describe('Filter: andOr', function () {

  // load the filter's module
  beforeEach(module('addicaidSiteApp'));

  // initialize a new instance of the filter before each test
  var andOr;
  beforeEach(inject(function($filter) {
    andOr = $filter('andOr');
  }));

  it('should return the input prefixed with "andOr filter:"', function () {
    var text = 'angularjs';
    expect(andOr(text)).toBe('andOr filter: ' + text);
  });

});
