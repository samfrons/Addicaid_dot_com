'use strict';

describe('Service: meetingSvc', function () {

  // load the service's module
  beforeEach(module('addicaidApp'));

  // instantiate service
  var meetingSvc;
  beforeEach(inject(function(_meetingSvc_, _$httpbackend_) {
    meetingSvc = _meetingSvc_;
//    $httpbackend = _$httpbackend_;
  }));

//  it('should do something', function () {
//    expect(!!meetingSvc).toBe(true);
//  });

//  it('should invoke service with right parameters', function() {
//    $httpBackend.expectJSONP('http://addicaid.appspot.com/meetings/jsonp?daylist=MoTuWeThFrSaSu&lat=37.771139&long=-122.403424&callback=JSON_CALLBACK')
//      .respond({});
//    $httpBackend.flush();
//  });
});
