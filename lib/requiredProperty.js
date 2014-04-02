var requiredProperty = function(requiresContext, propertyName){
    this.context = requiresContext;
    this.name = propertyName;
    this.value = this.context.getProperty(this.name);
    return this;
}

requiredProperty.prototype.assert = function(assertionText, assertion){
    if(!assertion())
        this.context.assertFail('Expected '+this.name+' '+assertionText);
}

module.exports = requiredProperty;
