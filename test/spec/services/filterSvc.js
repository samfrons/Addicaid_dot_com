'use strict';

describe('Service: filterSvc', function() {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var filterSvc;
  beforeEach(inject(function(_filterSvc_) {
    filterSvc = _filterSvc_;
  }));

  it('should do something', function() {
    expect(!!filterSvc).toBe(true);
  });

});
