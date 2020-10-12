const checkDemandFlags = function(demandType, parsedArgs) {

	const copyOfDemandFlags = [];

	for (let i = 0; i < this.usableOptions[demandType].length; ++i) {

		copyOfDemandFlags.push(this.usableOptions[demandType][i]);

	}
	
	for(const argName in parsedArgs) {
		
		const indexOf = copyOfDemandFlags.indexOf(argName);
		
		if(~indexOf) {
			
			copyOfDemandFlags.splice(indexOf, 1);
			
		}
		
	}
	
	if(copyOfDemandFlags.length) {
		
		const error = `Missing required argument${copyOfDemandFlags.length > 1 ? "s" : ""}: ${copyOfDemandFlags.join(", ")}`;
		
		error.stack = "";
		
		throw error;
		
	}
	
};

module.exports = checkDemandFlags;