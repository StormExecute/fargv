const staticSetArrayParseOptions = function(arrayParse) {
	
	if(!Array.isArray(arrayParse)) return this;
	
	arrayParse = Object.assign([], arrayParse);
	
	return this.options({ arrayParse });
	
};

module.exports = staticSetArrayParseOptions;