'use strict';

describe('Service: browserDetection', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var browserDetection;
  beforeEach(inject(function(_browserDetection_) {
    browserDetection = _browserDetection_;
  }));

  it('should do something', function () {
    expect(!!browserDetection).toBe(true);
  });

});
