'use strict';

describe('Service: currentLocations', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var currentLocations;
  beforeEach(inject(function(_currentLocations_) {
    currentLocations = _currentLocations_;
  }));

  it('should do something', function () {
    expect(!!currentLocations).toBe(true);
  });

});
