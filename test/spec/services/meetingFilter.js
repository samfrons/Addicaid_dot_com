'use strict';

describe('Service: meetingFilter', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var meetingFilter;
  beforeEach(inject(function(_meetingFilter_) {
    meetingFilter = _meetingFilter_;
  }));

  it('should do something', function () {
    expect(!!meetingFilter).toBe(true);
  });

});
