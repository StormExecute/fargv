const staticSetExcludeFlags = function(excludeFlags) {
	
	if(!Array.isArray(excludeFlags) && typeof excludeFlags != "string") return this;
	
	excludeFlags = Array.isArray(excludeFlags) ? Object.assign([], excludeFlags) : [excludeFlags];
	
	this.options({
		
		excludeFlags
		
	});
	
	return this;
	
};

module.exports = staticSetExcludeFlags;