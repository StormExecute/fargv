const isEmptyObject = function(obj) {
	
	for(const prop in obj) {
		
		//ignore functions
		if(typeof obj[prop] == "function") continue;
		
		return false;
		
	}
	
	return true;
	
};

module.exports = isEmptyObject;