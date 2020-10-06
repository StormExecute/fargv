const isObject = require("../../../dependencies/isObject");

const { deepCloneObject } = require("../../../dependencies/deepClone");

const staticSetOptions = function(options, redefine) {
	
	if(options == "reset") {
	
		this._options = null;
		
		return this;
	
	}
	
	if(!isObject(options)) return this;
	
	if(redefine) {
		
		this._options = options;
		
	} else {
		
		this.createOptions();
		
		this._options = deepCloneObject(this._options, options);
		
	}
	
	return this;
	
};

module.exports = staticSetOptions;