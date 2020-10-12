const staticSetNoParse = function(state, isNoParseNoDefault) {

	if(typeof state != "boolean") return this;
	
	const typeNoParse = "isNoParseNoDefault" ? "noParseNoDefault" : "noParse";
	
	return this.options({
		
		[typeNoParse]: state
		
	});
	
};

module.exports = staticSetNoParse;