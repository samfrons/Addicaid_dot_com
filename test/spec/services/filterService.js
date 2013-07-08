'use strict';

describe('Service: filterService', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var filterService;
  beforeEach(inject(function(_filterService_) {
    filterService = _filterService_;
  }));

  it('should do something', function () {
    expect(!!filterService).toBe(true);
  });

});
