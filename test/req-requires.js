var requires = require('../lib/req-requires');

var should = require('should');

module.exports.setup = function(req, res, next){
    req.requires = new requires(req, res, next);
    next();
}

describe('setup middleware', function(){
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

describe('error middleware', function(){
    it('calls the errorHandler when err is "req-requires error"', function(){
        var tempRequires = require('../lib/req-requires');
        var errorHandlerCalled = false;
        tempRequires.errorHandler = function(){errorHandlerCalled = true;}

        var req = {requires: {error:'some error'}};
        tempRequires.error('req-requires error', req);

        (errorHandlerCalled).should.be.exactly(true);
    })

    it('passes err to the next handler when err is not "req-requires error"', function(){
        var nextArg = '';
        var error = 'some error';
        var next = function(err){nextArg = err;}

        requires.error(error, null, null, next);
        (nextArg).should.be.exactly(error);
    })
})