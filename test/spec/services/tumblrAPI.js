'use strict';

describe('Service: tumblrAPI', function() {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var tumblrAPI;
  beforeEach(inject(function(_tumblrAPI_) {
    tumblrAPI = _tumblrAPI_;
  }));

  it('should do something', function() {
    expect(!!tumblrAPI).toBe(true);
  });

});
