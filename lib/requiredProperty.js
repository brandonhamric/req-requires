var requiredProperty = function(propertyName, propertyValue, assertFailed){
    this.name = propertyName;
    this.value = propertyValue;
    this.fail = assertFailed;

    this.assert = function(assertionText, assertion){
        if(!assertion())
            this.fail('Expected '+this.name+' '+assertionText);
    }

    return this;
}

module.exports = requiredProperty;
