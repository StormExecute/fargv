const isObject = require("../../../dependencies/isObject");

const staticSetArrayParseOptions = function(arrayParse) {
	
	if(!isObject(arrayParse)) return this;
	
	arrayParse = Object.assign({}, arrayParse);
	
	return this.options({ arrayParse });
	
};

module.exports = staticSetArrayParseOptions;