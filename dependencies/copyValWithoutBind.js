const isObject = require("./isObject");

const { deepCloneObject, deepCloneArray } = require("./deepClone");

const copyValueWithoutBinding = function(sourceValue) {
	
	//to ignore isObject && isArray checks
	if(!sourceValue) return sourceValue;
	
	if(isObject(sourceValue)) {
		
		return deepCloneObject({}, sourceValue);
		
	} else if(Array.isArray(sourceValue)) {
		
		return deepCloneArray([], sourceValue);
		
	}
	
	return sourceValue;
	
};

module.exports = copyValueWithoutBinding;