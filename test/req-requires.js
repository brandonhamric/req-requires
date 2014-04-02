var requires = require('../lib/req-requires');

var should = require('should');

module.exports.setup = function(req, res, next){
    req.requires = new requires(req, res, next);
    next();
}

describe('setup', function(){
  it('adds a property called requires to the req argument', function(){
    var testReqObject = {};
    var fakeFunction = function(){};

    requires.setup(testReqObject,fakeFunction,fakeFunction);
    testReqObject.should.have.property('requires');
  })

  it('calls the next argument', function(){
    var nextCalled = false;
    var testReqObject = {};
    var fakeFunction = function(){};
    var nextFunction = function(){nextCalled = true;};

    requires.setup(testReqObject,fakeFunction,nextFunction);

    (nextCalled).should.be.exactly(true);
  })
})
