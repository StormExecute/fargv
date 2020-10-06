const isObject = require("../../../dependencies/isObject");

const staticSetArrayParseOptions = function(arrayParse, redefine) {
	
	if(arrayParse == "reset" || redefine) {
		
		this.createOptions();
	
		this._options.arrayParse = null;
		
		if(arrayParse == "reset") return this;
	
	}
	
	if(!isObject(arrayParse)) return this;
	
	this.createOptions();
	
	arrayParse = Object.assign({}, arrayParse);
	
	return this.options({ arrayParse });
	
};

module.exports = staticSetArrayParseOptions;