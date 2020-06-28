const staticSetExcludeFlags = function(excludeFlags) {
	
	if(!Array.isArray(excludeFlags) && typeof excludeFlags != "string") return this;
	
	excludeFlags = Array.isArray(excludeFlags) ? Object.assign([], excludeFlags) : [excludeFlags];
	
	return this.options({
		
		excludeFlags
		
	});
	
};

module.exports = staticSetExcludeFlags;