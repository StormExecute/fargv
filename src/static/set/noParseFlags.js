const staticSetNoParseFlags = function(noParseFlags, isNoParseNoDefaultFlags) {
	
	if(!Array.isArray(noParseFlags) && typeof noParseFlags != "string") return this;
	
	noParseFlags = Array.isArray(noParseFlags) ? Object.assign([], noParseFlags) : [noParseFlags];
	
	const typeNoParseFlags = isNoParseNoDefaultFlags ? "noParseNoDefaultFlags" : "noParseFlags";
	
	this.options({
		
		[typeNoParseFlags]: noParseFlags
		
	});
	
	return this;
	
};

module.exports = staticSetNoParseFlags;