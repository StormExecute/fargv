const { deepCloneObject } = require("./deepClone");

const without = (obj, fields) => {
	
	if(!Array.isArray(fields)) fields = [fields];
	
	const copy = deepCloneObject({}, obj);
	
	for(let i = 0; i < fields.length; ++i) {
		
		delete copy[fields[i]];
		
	}
	
	return copy;
	
};

module.exports = without;