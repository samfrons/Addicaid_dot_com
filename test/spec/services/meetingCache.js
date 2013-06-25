'use strict';

describe('Service: meetingCache', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var meetingCache;
  beforeEach(inject(function(_meetingCache_) {
    meetingCache = _meetingCache_;
  }));

  it('should do something', function () {
    expect(!!meetingCache).toBe(true);
  });

});
