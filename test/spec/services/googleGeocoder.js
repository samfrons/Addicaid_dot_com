'use strict';

describe('Service: googleGeocoder', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var googleGeocoder;
  beforeEach(inject(function(_googleGeocoder_) {
    googleGeocoder = _googleGeocoder_;
  }));

  it('should do something', function () {
    expect(!!googleGeocoder).toBe(true);
  });

});
