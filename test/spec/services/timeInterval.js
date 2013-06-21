'use strict';

describe('Service: timeInterval', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var timeInterval;
  beforeEach(inject(function(_timeInterval_) {
    timeInterval = _timeInterval_;
  }));

  it('should do something', function () {
    expect(!!timeInterval).toBe(true);
  });

});
