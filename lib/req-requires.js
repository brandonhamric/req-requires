var requiredProperty = require('./requiredProperty');
var defaultAssertions = require('./defaultAssertions');

module.exports.setup = function(req, res, next){
    req.requires = new requires(req, res, next);
    next();
}

//TODO: wrap this in a function that can receive a custom error handler
module.exports.error = function(err, req, res, next){
    if(err === 'req-requires error')
        res.send(400, req.requires.error);
    else
        next(err);
}

var requires = function(req, res, next){
    this.property = function(name){
        return new requiredProperty(this, name);
    }

    this.getValue = function(propertyName){
        return getPropertyValue(req, propertyName);
    }

    this.fail = function(message){
        this.error = message;
        throw('req-requires error');
    }
}
