const { deepCloneArray } = require("../../../dependencies/deepClone");

const staticSetExcludeFlags = function(excludeFlags, redefine) {
	
	if(!Array.isArray(excludeFlags) && typeof excludeFlags != "string") return this;
	
	this.createOptions();
	
	if(excludeFlags == "reset" || redefine) {
	
		this._options.excludeFlags = null;
		
		if(excludeFlags == "reset") return this;
	
	}
	
	excludeFlags = Array.isArray(excludeFlags) ? Object.assign([], excludeFlags) : [excludeFlags];
	
	return this.options({
		
		excludeFlags: Array.isArray(this._options.excludeFlags) ? deepCloneArray([], this._options.excludeFlags, excludeFlags) : excludeFlags
		
	});
	
};

module.exports = staticSetExcludeFlags;