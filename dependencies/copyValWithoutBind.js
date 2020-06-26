const isObject = require("./isObject");

const { deepCloneObject, deepCloneArray } = require("./deepClone");

const copyValueWithoutBinding = function(sourceValue) {
	
	if(!sourceValue) return sourceValue;
	
	if(isObject(sourceValue)) {
		
		return deepCloneObject({}, sourceValue);
		
	} else if(Array.isArray(sourceValue)) {
		
		return deepCloneArray([], sourceValue);
		
	}
	
	return sourceValue;
	
};

module.exports = copyValueWithoutBinding;