var requiredProperty = function(propertyName, propertyValue, assertFailed){
    this.name = propertyName;
    this.value = propertyValue;

    this.assert = function(assertionText, assertion){
        if(!assertion())
            assertFailed('Expected '+this.name+' '+assertionText);
    }

    return this;
}

module.exports = requiredProperty;
