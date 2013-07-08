'use strict';

describe('Service: pagedListModuleInterface', function () {

  // load the service's module
  beforeEach(module('addicaidSiteApp'));

  // instantiate service
  var pagedListModuleInterface;
  beforeEach(inject(function(_pagedListModuleInterface_) {
    pagedListModuleInterface = _pagedListModuleInterface_;
  }));

  it('should do something', function () {
    expect(!!pagedListModuleInterface).toBe(true);
  });

});
