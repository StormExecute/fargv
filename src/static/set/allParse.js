const staticSetAllParse = function(allParse) {

	if(typeof allParse != "boolean") return this;
	
	return this.options({
		
		allParse
		
	});
	
};

module.exports = staticSetAllParse;