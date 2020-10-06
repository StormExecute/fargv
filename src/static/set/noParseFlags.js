const { deepCloneArray } = require("../../../dependencies/deepClone");

const staticSetNoParseFlags = function(noParseFlags, isNoParseNoDefaultFlags) {
	
	if(!Array.isArray(noParseFlags) && typeof noParseFlags != "string") return this;
	
	this.createOptions();
	
	const typeNoParseFlags = isNoParseNoDefaultFlags ? "noParseNoDefaultFlags" : "noParseFlags";
	
	if(noParseFlags == "reset") {
	
		this._options[typeNoParseFlags] = null;
		
		return this;
	
	}
	
	noParseFlags = Array.isArray(noParseFlags) ? Object.assign([], noParseFlags) : [noParseFlags];
	
	return this.options({
		
		[typeNoParseFlags]: Array.isArray(this._options[typeNoParseFlags]) ? deepCloneArray([], this._options[typeNoParseFlags], excludeFlags) : noParseFlags
		
	});
	
};

module.exports = staticSetNoParseFlags;