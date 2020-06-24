const isObject = require("../../dependencies/isObject");

const { deepCloneObject } = require("../../dependencies/deepClone");

const staticSetOptions = function(options, merging) {
	
	if(!merging) {
		
		this._options = options;
		
	} else {
		
		if(!isObject(this._options)) this._options = {};
		
		this._options = deepCloneObject(this._options, options);
		
	}
	
	return this;
	
};

module.exports = staticSetOptions;