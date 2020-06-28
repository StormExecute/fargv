const isObject = require("../../../dependencies/isObject");

const staticSetObjectParseOptions = function(objectParse) {
	
	if(!isObject(objectParse)) return this;
	
	objectParse = Object.assign({}, objectParse);
	
	return this.options({ objectParse });
	
};

module.exports = staticSetObjectParseOptions;