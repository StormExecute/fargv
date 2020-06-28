const setCustomArgv = function(customArgv) {
	
	if(!Array.isArray(customArgv)) return this;
	
	for(let i = 0; i < customArgv.length; i++) {
		
		if(Array.isArray(customArgv[i]) && customArgv[i][0] && customArgv[i][0].startsWith("-") && typeof customArgv[i][1] == "string") {
			
			customArgv[i] = customArgv[i][0] + customArgv[i][1];
			
		}
		
	}
	
	this.options({
		
		customArgv
		
	});
	
	return this;
	
};

module.exports = setCustomArgv;