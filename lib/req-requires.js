var requiredProperty = require('./requiredProperty');
var defaultAssertions = require('./defaultAssertions');

module.exports.setup = function(req, res, next){
    req.requires = new requires(req, res, next);
    next();
}

module.exports.error = function(err, req, res, next){
  if(err === 'req-requires error')
      module.exports.errorHandler(req.requires.error, req, res, next);
  else
      next(err);
}

module.exports.errorHandler = function(errorMessage, req, res, next){
  res.send(400, errorMessage);
}

var requires = function(req, res, next){
    var self = this;

    self.property = function(name){
        return new requiredProperty(this, name);
    }

    self.assertFail = function(message){
        self.error = message;
        throw('req-requires error');
    }

    self.getProperty = function(propertyName){
        var currentValue=req;
        var list=propertyName.split(".");
        for (var i=0; i<list.length; i++)
        {
            currentValue=currentValue[list[i]];

            if (typeof(currentValue)==='undefined')
                return currentValue;
        }
        return currentValue;
    }

    return self;
}
