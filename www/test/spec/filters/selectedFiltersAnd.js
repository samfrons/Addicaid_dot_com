'use strict';

describe('Filter: selectedFiltersAnd', function () {

  // load the filter's module
  beforeEach(module('addicaidApp'));

  // initialize a new instance of the filter before each test
  var selectedFiltersAnd;
  beforeEach(inject(function($filter) {
    selectedFiltersAnd = $filter('selectedFiltersAnd');
  }));

//  it('should return the input prefixed with "selectedFiltersAnd filter:"', function () {
//    var text = 'angularjs';
//    expect(selectedFiltersAnd(text)).toBe('selectedFiltersAnd filter: ' + text);
//  });

});
