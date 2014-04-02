var requiredProperty = require('./requiredProperty');

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
