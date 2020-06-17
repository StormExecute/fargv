const parseArray = function (argValue, callNumber) {
	
	callNumber = callNumber || 0;
	
	if(callNumber > this.usableOptions.arrayParse.maxRecursiveCalls) {
		
		throw new Error(this.errorHandler("Maximum call stack size exceeded appears!", {
			
			from: "parseArray",
			maxRecursiveCalls: this.usableOptions.objectParse.maxRecursiveCalls,
			nowCall: callNumber,
			
		}));
		
	}
	
	const result = [];
	
	let resultI = 0;
	
	let skipComma = false;
	
	let arrayInArray = 0;
	let tempArrayInArraySymbols = "";
	
	for(let i = 0; i < argValue.length; i++) {
		
		const thSym = argValue[i];
		
		if(thSym == "[") {
			
			//for concat deep arrays
			if(arrayInArray) tempArrayInArraySymbols += thSym;
			
			arrayInArray += 1;
			
			continue;
			
		}
		
		if(thSym == "]" && arrayInArray) {
			
			if((arrayInArray - 1) == 0) {
				
				result[resultI] = this.parseArray(tempArrayInArraySymbols, callNumber + 1);
				
				arrayInArray = 0;
				tempArrayInArraySymbols = "";
				
				resultI++;
				
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
		
		if(skipComma) {
			
			if(thSym == ",") skipComma = false;
			
			continue;
			
		}
		
		if(thSym == ",") {
			
			result[resultI] = this.parseArrayAndObjectEl(result[resultI], "array");
			
			resultI++;
			
			continue;
			
		}
		
		if(!result[resultI]) result[resultI] = "";
		
		result[resultI] += thSym;
		
		if((i + 1) == argValue.length) {
			
			result[resultI] = this.parseArrayAndObjectEl(result[resultI], "array");
			
		}
		
	}
	
	if(tempArrayInArraySymbols) {
		
		const error = this.errorHandler("Can't parse array in array.", {
			
			from: "parseArray",
			maxRecursiveCalls: this.usableOptions.objectParse.maxRecursiveCalls,
			nowCall: callNumber,
			
		});
		
		if(this.usableOptions.throwInsteadWarns) throw new Error(error);
		else console.warn(error);
		
		return [];
		
	}
	
	return result
	
};

module.exports = parseArray;