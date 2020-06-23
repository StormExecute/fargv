const checkDemand = function(demandType, parsedArgs) {
	
	const copyOfDemandArgs = Object.assign([], this.usableOptions[demandType]);
	
	for(const argName in parsedArgs) {
		
		const indexOf = copyOfDemandArgs.indexOf(argName);
		
		if(indexOf != -1) {
			
			copyOfDemandArgs.splice(indexOf, 1);
			
		}
		
	}
	
	if(copyOfDemandArgs.length) {
		
		const error = `Missing required argument${copyOfDemandArgs.length > 1 ? "s" : ""}: ${copyOfDemandArgs.join(", ")}`;
		
		error.stack = "";
		
		throw error;
		
	}
	
};

module.exports = checkDemand;