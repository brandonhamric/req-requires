var requiredProperty = function(requiresContext, propertyName){
    this.context = requiresContext;
    this.name = propertyName;
    this.value = getPropertyValue(this.context,this.name);
    return this;
}

requiredProperty.prototype.assert = function(assertionText, assertion){
    if(!assertion())
        this.context.fail('Expected '+this.name+' '+assertionText);
}

function getPropertyValue(context, propertyName){
    var currentValue=context;
    var list=propertyName.split(".");
    for (var i=0; i<list.length; i++)
    {
        currentValue=currentValue[list[i]];

        if (typeof(currentValue)==='undefined')
            return currentValue;
    }
    return currentValue;
}

module.exports = requiredProperty;
