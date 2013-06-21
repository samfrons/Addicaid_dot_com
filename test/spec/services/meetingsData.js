'use strict';

describe('Service: meetingsData', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var meetingsData;
  beforeEach(inject(function(_meetingsData_) {
    meetingsData = _meetingsData_;
  }));

  it('should do something', function () {
    expect(!!meetingsData).toBe(true);
  });

});
