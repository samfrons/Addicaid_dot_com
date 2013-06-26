'use strict';

describe('Service: mapLocation', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var mapLocation;
  beforeEach(inject(function(_mapLocation_) {
    mapLocation = _mapLocation_;
  }));

  it('should do something', function () {
    expect(!!mapLocation).toBe(true);
  });

});
