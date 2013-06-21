'use strict';

describe('Service: distanceMath', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var distanceMath;
  beforeEach(inject(function(_distanceMath_) {
    distanceMath = _distanceMath_;
  }));

  it('should do something', function () {
    expect(!!distanceMath).toBe(true);
  });

});
