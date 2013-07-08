'use strict';

describe('Service: filterModuleInterface', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var filterModuleInterface;
  beforeEach(inject(function(_filterModuleInterface_) {
    filterModuleInterface = _filterModuleInterface_;
  }));

  it('should do something', function () {
    expect(!!filterModuleInterface).toBe(true);
  });

});
