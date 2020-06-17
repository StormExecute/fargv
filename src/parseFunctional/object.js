const parseObject = function (argValue, callNumber) {
	
	callNumber = callNumber || 0;
	
	if(callNumber > this.usableOptions.objectParse.maxRecursiveCalls) {
		
		throw new Error(this.errorHandler("Maximum call stack size exceeded appears!", {
			
			from: "parseObject",
			maxRecursiveCalls: this.usableOptions.objectParse.maxRecursiveCalls,
			nowCall: callNumber,
			
		}));
		
	}
	
	const result = {};
	
	let itHasAColon = false;
	
	let isKey = true;
	
	let tempKey = "";
	
	let skipComma = false;
	
	let arrayInArray = 0;
	let tempArrayInArraySymbols = "";
	
	for(let i = 0; i < argValue.length; i++) {
		
		const thSym = argValue[i];
		
		if(skipComma) {
			
			if(thSym == ",") skipComma = false;
			
			continue;
			
		}
		
		if(!isKey) {
		
			if(thSym == "[") {
				
				//for concat deep arrays
				if(arrayInArray) tempArrayInArraySymbols += thSym;
				
				arrayInArray += 1;
				
				continue;
				
			}
			
			if(thSym == "]" && arrayInArray) {
				
				if((arrayInArray - 1) == 0) {
					
					result[tempKey] = this.parseArray(tempArrayInArraySymbols, callNumber + 1);
					
					arrayInArray = 0;
					tempArrayInArraySymbols = "";
					
					tempKey = "";
					
					isKey = true;
					
					skipComma = true;
					
				} else {
					
					tempArrayInArraySymbols += thSym;
					
					arrayInArray -= 1;
					
				}
				
				continue;
				
			}
			
			if(arrayInArray) {
				
				tempArrayInArraySymbols += thSym;
				
				continue;
				
			}
			
			if(thSym == ",") {
			
				result[tempKey] = this.parseArrayAndObjectEl(result[tempKey], "object");
				
				tempKey = "";
				
				isKey = true;
				
				continue;
				
			}
			
			result[tempKey] += thSym;
			
			if((i + 1) == argValue.length) {
				
				result[tempKey] = this.parseArrayAndObjectEl(result[tempKey], "object");
				
				tempKey = "";
				
			}
			
		} else {
		
			if(thSym == ":") {
				
				result[tempKey] = "";
				
				if(!itHasAColon) itHasAColon = true;
				
				isKey = false;
				
				continue;
				
			}
			
			if(thSym != " ") tempKey += thSym;
		
		}
		
	}
	
	if(!itHasAColon && argValue.length) {
		
		const error = this.errorHandler("Object doesn't have a colon.", {
			
			from: "parseObject",
			maxRecursiveCalls: this.usableOptions.objectParse.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		});
		
		if(this.usableOptions.throwInsteadWarns) throw new Error(error);
		else console.warn(error);
		
		return {};
		
	}
	
	if(tempArrayInArraySymbols) {
		
		const error = this.errorHandler("Can't parse array in object property.", {
			
			from: "parseObject",
			maxRecursiveCalls: this.usableOptions.objectParse.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		});
		
		if(this.usableOptions.throwInsteadWarns) throw new Error(error);
		else console.warn(error);
		
		return {};
		
	}
	
	if(tempKey) {
		
		const error = this.errorHandler("Something went wrong.", {
			
			from: "parseObject",
			maxRecursiveCalls: this.usableOptions.objectParse.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		});
		
		if(this.usableOptions.throwInsteadWarns) throw new Error(error);
		else console.warn(error);
		
		return {};
		
	}
	
	return result
	
};

module.exports = parseObject;