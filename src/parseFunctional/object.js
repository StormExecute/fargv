const parseObject = function (argValue, callNumber) {
	
	callNumber = callNumber || 0;
	
	const objectOptions = this.usableOptions.objectParse;
	
	if(callNumber > objectOptions.maxRecursiveCalls) {
		
		throw new Error(this.errorHandler("Maximum call stack size exceeded appears!", {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
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
	
	let objectInObject = 0;
	let tempObjectInObjectSymbols = "";
	
	//for no conflicts strings and possible arrays | objects
	let arrayInArrayForStr = 0;
	let objectInObjectForStr = 0;
	
	for(let i = 0; i < argValue.length; i++) {
		
		const thSym = argValue[i];
		
		if(skipComma) {
			
			if(thSym == ",") skipComma = false;
			
			continue;
			
		}
		
		if(!isKey) {
			
			if(objectOptions["object"] && thSym == "{" && !arrayInArray) {
			
				if(objectInObject) tempObjectInObjectSymbols += thSym;
			
				objectInObject += 1;
				
				continue;
			
			} else if(thSym == "{") {
				
				objectInObjectForStr += 1;
				
			}
			
			if(objectOptions["object"] && thSym == "}" && objectInObject && !arrayInArray) {
				
				if((objectInObject - 1) == 0) {
					
					result[tempKey] = this.parseObject(tempObjectInObjectSymbols, callNumber + 1);
					
					objectInObject = 0;
					tempObjectInObjectSymbols = "";
					
					tempKey = "";
					
					isKey = true;
					
					skipComma = true;
					
				} else {
					
					tempObjectInObjectSymbols += thSym;
					
					objectInObject -= 1;
					
				}
				
				continue;
				
			} else if(thSym == "}") {
				
				objectInObjectForStr -= 1;
				
			}
		
			if(objectOptions["array"] && thSym == "[" && !objectInObject) {
				
				//for concat deep arrays
				if(arrayInArray) tempArrayInArraySymbols += thSym;
				
				arrayInArray += 1;
				
				continue;
				
			} else if(thSym == "[") {
				
				arrayInArrayForStr += 1;
				
			}
			
			if(objectOptions["array"] && thSym == "]" && arrayInArray && !objectInObject) {
				
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
				
			} else if(thSym == "]") {
				
				arrayInArrayForStr -= 1;
				
			}
			
			if(objectOptions["object"] && objectInObject) {
				
				tempObjectInObjectSymbols += thSym;
				
				continue;
				
			}
			
			if(objectOptions["array"] && arrayInArray) {
				
				tempArrayInArraySymbols += thSym;
				
				continue;
				
			}
			
			if(thSym == "," && !arrayInArrayForStr && !objectInObjectForStr) {
			
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
	
	if(tempObjectInObjectSymbols) {
		
		const error = this.errorHandler("Can't parse object in object property.", {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		});
		
		if(this.usableOptions.throwInsteadWarns) throw new Error(error);
		else console.warn(error);
		
		return {};
		
	}
	
	if(!itHasAColon && argValue.length) {
		
		const error = this.errorHandler("Object doesn't have a colon.", {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
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
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
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
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
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