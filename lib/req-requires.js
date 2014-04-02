module.exports.setup = function(req, res, next){
    req.requires = new requires(req, res, next);
    next();
}

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

    this.value = function(propertyName){
        var value=req;
        var list=propertyName.split(".");
        for (var i=0; i<list.length; i++)
        {
            value=value[list[i]];

            if (typeof(value)==='undefined')
                return value;
        }
        return value;
    }

    this.fail = function(message){
        this.error = message;
        throw('req-requires error');
    }
}

var requiredProperty = function(requiresContext, propertyName){
    this.context = requiresContext;
    this.name = propertyName;
    this.value = this.context.value(this.name);
    return this;
}

requiredProperty.prototype.assert = function(assertionText, assertion){
    if(!assertion())
        this.context.fail('Expected '+this.name+' '+assertionText);
}

requiredProperty.prototype.toExist = function(){
    var self = this;
    this.assert('to exist', function(){
        return typeof(self.value) !== 'undefined';
    });
}

requiredProperty.prototype.toBeType = function(requiredTypeName){
    var self = this;
    this.assert('to be type: '+requiredTypeName, function(){
        return typeof(self.value) === requiredTypeName
    });
}

requiredProperty.prototype.toMatch = function(regex){
    var self = this;
    this.assert('to match regex: '+regex, function(){
        var match = self.value.match(regex);
        return !!match;
    });
}

requiredProperty.prototype.toBeIn = function(arrayOfValues){
    var self = this;
    this.assert('to be in array: '+JSON.stringify(arrayOfValues), function(){
        return arrayOfValues.indexOf(self.value) >= 0;
    });
}
