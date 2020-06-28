const staticSetNoParse = function(state, isNoParseNoDefault) {
	
	const typeNoParse = "isNoParseNoDefault" ? "noParseNoDefault" : "noParse";
	
	this.options({
		
		[typeNoParse]: !!state
		
	});
	
	return this;
	
};

module.exports = staticSetNoParse;