const without = (obj, fields) => {
	
	if(!Array.isArray(fields)) fields = [fields];
	
	for(let i = 0; i < fields.length; i++) {
		
		delete obj[fields[i]];
		
	}
	
	return obj;
	
};

module.exports = without;