const copyV = require("./copyValWithoutBind");

const getAnyObjectPropValueIfItExists = (sourceObject, possibleOptions, _defaultIfNoExists) => {
	
	let result = _defaultIfNoExists || "";
	
	let found = 0;
	
	for(let i = 0; i < possibleOptions.length; i++) {
		
		if(found) continue;
		
		const prop = possibleOptions[i];
		
		if(
			sourceObject[prop] 
		|| (typeof sourceObject[prop] != "undefined" && sourceObject[prop] == null) 
		|| (typeof sourceObject[prop] != "undefined" && isNaN(sourceObject[prop])) 
		|| sourceObject[prop] == false
		) {
			
			result = copyV(sourceObject[prop]);
			
			found = 1;
			
		}
		
	}
	
	return result;
	
};

module.exports = getAnyObjectPropValueIfItExists;