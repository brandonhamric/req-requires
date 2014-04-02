var requiredProperty = require('../lib/requiredProperty');

var should = require('should');

describe('assert', function(){
  it('calls the assertFailed callback when the given assertion method fails', function(){
    var assertion = function(){return false;}
    var failWasCalled = false;
    var failCall = function(){failWasCalled = true;}

    var property = new requiredProperty('a', 1, failCall);

    property.assert('test', assertion);

    (failWasCalled).should.be.exactly(true);
  })
})
