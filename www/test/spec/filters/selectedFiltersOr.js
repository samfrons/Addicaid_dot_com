'use strict';

describe('Filter: selectedFiltersOr', function () {

  // load the filter's module
  beforeEach(module('addicaidApp'));

  // initialize a new instance of the filter before each test
  var selectedFiltersOr;
  beforeEach(inject(function($filter) {
    selectedFiltersOr = $filter('selectedFiltersOr');
  }));

//  it('should return the input prefixed with "selectedFiltersOr filter:"', function () {
//    var text = 'angularjs';
//    expect(selectedFiltersOr(text)).toBe('selectedFiltersOr filter: ' + text);
//  });

});
