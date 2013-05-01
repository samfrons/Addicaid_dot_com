'use strict';

describe('Filter: andOrFilter', function () {

  // load the filter's module
  beforeEach(module('addicaidApp'));

  // initialize a new instance of the filter before each test
  var andOrFilter;
  beforeEach(inject(function($filter) {
    andOrFilter = $filter('andOrFilter');
  }));

//  it('should return the input prefixed with "andOrFilter filter:"', function () {
//    var text = 'angularjs';
//    expect(andOrFilter(text)).toBe('andOrFilter filter: ' + text);
//  });

});
