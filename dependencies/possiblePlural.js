const isObject = require("./isObject");

//string, array | plainObject
const possiblePlural = (str, referencePoint) => {

	if(Array.isArray(referencePoint)) {
		
		return referencePoint.length > 1 ? str + "s" : str;
	
	} else if(isObject(referencePoint)) {
		
		let l = 0;
		
		for(const prop in referencePoint) {
			
			++l;
			
			if(l > 1) return str + "s";
			
		}
		
		return str;
		
	}
	
	return str;
	
};

module.exports = possiblePlural;