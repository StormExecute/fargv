const isObject = require("../../../dependencies/isObject");

const { deepCloneArray } = require("../../../dependencies/deepClone");

const staticSetExcludeFlags = function(excludeFlags) {
	
	if(!Array.isArray(excludeFlags) && typeof excludeFlags != "string") return this;
	
	if(!isObject(this._options)) this._options = {};
	
	if(excludeFlags == "reset") {
	
		this._options.excludeFlags = null;
		
		return this;
	
	}
	
	excludeFlags = Array.isArray(excludeFlags) ? Object.assign([], excludeFlags) : [excludeFlags];
	
	return this.options({
		
		excludeFlags: Array.isArray(this._options.excludeFlags) ? deepCloneArray([], this._options.excludeFlags, excludeFlags) : excludeFlags
		
	});
	
};

module.exports = staticSetExcludeFlags;