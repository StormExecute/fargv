const minorAndBooleanParse = function (argValue, from) {
	
	const options = !from ? this.usableOptions.mainParse : from == "array" ? this.usableOptions.arrayParse : from == "object" ? this.usableOptions.objectParse : {};
	
	switch(argValue) {
		
		case "true":
		case "false":
		
			if(!options["boolean"]) break;
			
			if(argValue == "true") argValue = true;
			else argValue = false;
		
		break;
		
		case "null":
		
			if(!options["null"]) break;
			
			argValue = null;
		
		break;
		
		case "undefined":
		
			if(!options["undefined"]) break;
			
			argValue = undefined;
		
		break;
		
		case "NaN":
		
			if(!options["NaN"]) break;
			
			argValue = NaN;
		
		break;
		
		case "Infinity":
		
			if(!options["Infinity"]) break;
			
			argValue = Infinity;
		
		break;
		
	}
	
	return argValue;
	
}

module.exports = minorAndBooleanParse;