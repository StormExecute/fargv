const checkDemand = function(demandType, parsedArgs) {
	
	const copyOfDemandFlags = Object.assign([], this.usableOptions[demandType]);
	
	for(const argName in parsedArgs) {
		
		const indexOf = copyOfDemandFlags.indexOf(argName);
		
		if(indexOf != -1) {
			
			copyOfDemandFlags.splice(indexOf, 1);
			
		}
		
	}
	
	if(copyOfDemandFlags.length) {
		
		const error = `Missing required argument${copyOfDemandFlags.length > 1 ? "s" : ""}: ${copyOfDemandFlags.join(", ")}`;
		
		error.stack = "";
		
		throw error;
		
	}
	
};

module.exports = checkDemand;