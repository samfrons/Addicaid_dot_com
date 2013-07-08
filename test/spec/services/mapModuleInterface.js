'use strict';

describe('Service: mapModuleInterface', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var mapModuleInterface;
  beforeEach(inject(function(_mapModuleInterface_) {
    mapModuleInterface = _mapModuleInterface_;
  }));

  it('should do something', function () {
    expect(!!mapModuleInterface).toBe(true);
  });

});
