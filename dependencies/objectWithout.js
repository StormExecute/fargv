const isObject = require("./isObject");

const without = (obj, fields) => {
	
	if(!isObject(obj)) return obj;
	
	if(!Array.isArray(fields)) fields = [fields];
	
	const copy = Object.assign({}, obj);
	
	for(let i = 0; i < fields.length; i++) {
		
		delete copy[fields[i]];
		
	}
	
	return copy;
	
};

module.exports = without;