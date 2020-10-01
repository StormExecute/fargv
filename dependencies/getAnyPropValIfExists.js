const copyV = require("./copyValWithoutBind");

/*

	Usage && Example:
	
		var object1 = {b: NaN, c: false};
	
		getAnyObjectPropValueIfItExists(object1, ["a", "b", "c"]);
		//result -> NaN
		
		getAnyObjectPropValueIfItExists(object1, ["a", "d"]);
		//result -> ""
		
		getAnyObjectPropValueIfItExists(object1, ["a", "d"], 123);
		//result -> 123
		
		var object2 = {d: undefined};
		
		getAnyObjectPropValueIfItExists(object2, ["a", "d"]);
		//result -> ""

*/

//plainObject, array, any
const getAnyObjectPropValueIfItExists = (sourceObject, possibleOptions, _defaultIfNotExists) => {
	
	for(let i = 0; i < possibleOptions.length; ++i) {
		
		const prop = possibleOptions[i];
		
		if(sourceObject[prop] !== undefined) {
			
			return copyV(sourceObject[prop]);
			
		}
		
	}

	if(_defaultIfNotExists !== undefined) return copyV(_defaultIfNotExists);

	return "";
	
};

module.exports = getAnyObjectPropValueIfItExists;