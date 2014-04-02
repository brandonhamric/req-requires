var requiredProperty = require('../lib/requiredProperty');

var should = require('should');

describe('constructor', function(){
  describe('value property', function(){
    it('should be set to the value from the property given by name in the context', function(){
      var testContext = {
        a: 1
      };

      var property = new requiredProperty(testContext, 'a');
      (property.value).should.be.exactly(testContext.a)
    })

    it('should be be able to access properties by name down more than one level', function(){
      var testContext = {
        firstLevel: {
          secondLevel: {
            thirdLevel: 'gotIt'
          }
        }
      };

      var property = new requiredProperty(testContext, 'firstLevel.secondLevel.thirdLevel');
      (property.value).should.be.exactly(testContext.firstLevel.secondLevel.thirdLevel)
    })
  })
})

describe('assert', function(){
  it('calls fail on the context object when the given assertion method fails', function(){
    var assertion = function(){return false;}
    var failWasCalled = false;
    var failCall = function(){failWasCalled = true;}

    var testContext = {
      a: 1,
      fail: failCall
    }

    var property = new requiredProperty(testContext, 'a');

    property.assert('test', assertion);

    (failWasCalled).should.be.exactly(true);
  })
})
