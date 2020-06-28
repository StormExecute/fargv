const setCustomArgv = function(customArgv) {
	
	if(!Array.isArray(customArgv)) return this;
	
	this.options({
		
		customArgv
		
	});
	
	return this;
	
};

module.exports = setCustomArgv;