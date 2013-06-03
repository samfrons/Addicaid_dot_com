'use strict';

describe('Service: meetings', function() {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var meetings;
  beforeEach(inject(function(_meetings_) {
    meetings = _meetings_;
  }));

  xit('should do something', function() {
    expect(!!meetings).toBe(true);
  });

});
