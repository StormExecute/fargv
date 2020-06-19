const isObject = require("../../dependencies/isObject");

const staticSetOptions = function(options, merging) {
	
	if(!merging) {
		
		this._options = options;
		
	} else {
		
		if(!isObject(this._options)) this._options = {};
		
		this._options = Object.assign(this._options, options);
		
	}
	
	return this;
	
};

module.exports = staticSetOptions;