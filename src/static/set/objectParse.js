const isObject = require("../../../dependencies/isObject");

const staticSetObjectParseOptions = function(objectParse, redefine) {
	
	if(objectParse == "reset" || redefine) {
		
		this.createOptions();
	
		this._options.objectParse = null;
		
		if(objectParse == "reset") return this;
	
	}
	
	if(!isObject(objectParse)) return this;
	
	this.createOptions();
	
	objectParse = Object.assign({}, objectParse);
	
	return this.options({ objectParse });
	
};

module.exports = staticSetObjectParseOptions;