'use strict';

xdescribe('Service: meetingSvc', function() {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var meetingSvc;
  beforeEach(inject(function(_meetingSvc_) {
    meetingSvc = _meetingSvc_;
  }));

  it('should do something', function() {
    expect(!!meetingSvc).toBe(true);
  });

});
