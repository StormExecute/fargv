const staticSetNoParse = function(state, isNoParseNoDefault) {
	
	const typeNoParse = "isNoParseNoDefault" ? "noParseNoDefault" : "noParse";
	
	return this.options({
		
		[typeNoParse]: !!state
		
	});
	
};

module.exports = staticSetNoParse;