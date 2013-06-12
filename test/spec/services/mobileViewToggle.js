'use strict';

describe('Service: mobileViewToggle', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var mobileViewToggle;
  beforeEach(inject(function(_mobileViewToggle_) {
    mobileViewToggle = _mobileViewToggle_;
  }));

  it('should do something', function () {
    expect(!!mobileViewToggle).toBe(true);
  });

});
