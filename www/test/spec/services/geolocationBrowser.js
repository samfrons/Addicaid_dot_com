'use strict';

describe('Service: geolocationBrowser', function () {

  // load the service's module
  beforeEach(module('addicaidApp'));

  // instantiate service
  var geolocationBrowser;
  beforeEach(inject(function(_geolocationBrowser_) {
    geolocationBrowser = _geolocationBrowser_;
  }));

  it('should do something', function () {
    expect(!!geolocationBrowser).toBe(true);
  });

});
