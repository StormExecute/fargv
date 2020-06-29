const parseObject = function (argValue, callNumber) {
	
	callNumber = callNumber || 0;
	
	const objectOptions = this.usableOptions.objectParse;
	
	if(callNumber > objectOptions.maxRecursiveCalls) {
		
		this.errorHandler(["Maximum call stack size exceeded appears!", 1], {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
			nowCall: callNumber,
			
		}, "auto");
		
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
	
	//for no conflicts with options: objectParse: {array: true, object: false}
	/*
	
		Example:
		
			fargv.toObject("{a: {b: [], a: 2}, v: 3", {
				
				object: false,
				array: true,
				
			})
	
	*/
	let skipArrayParseIfNoParseObject = false;
	
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
				
				if(!objectInObjectForStr) skipArrayParseIfNoParseObject = true;
				
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
				
				if(!objectInObjectForStr) skipArrayParseIfNoParseObject = false;
				
			}
		
			if(objectOptions["array"] && thSym == "[" && !objectInObject && !skipArrayParseIfNoParseObject) {
				
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
				
				if(result[tempKey] != undefined) {
					
					if(this.usableOptions.throwInsteadWarns || objectOptions.ifDuplicateKey.warn) {
						
						this.errorHandler(["Duplicate object keys detected.", 304], {
							
							from: "parseObject",
							maxRecursiveCalls: objectOptions.maxRecursiveCalls,
							nowCall: callNumber,
							tempKey,
							
						}, "auto");
						
					}
					
					if(objectOptions.ifDuplicateKey.rewrite) {
						
						result[tempKey] = "";
						
					}
					
				} else {
					
					result[tempKey] = "";
					
				}
				
				if(!itHasAColon) itHasAColon = true;
				
				isKey = false;
				
				if((i + 1) == argValue.length) {
					
					//get defaultNoneValue
					result[tempKey] = this.parseArrayAndObjectEl(result[tempKey], "object");
					
					tempKey = "";
					
				}
				
				continue;
				
			}
			
			if(thSym != " ") tempKey += thSym;
		
		}
		
	}
	
	if(tempObjectInObjectSymbols) {
		
		this.errorHandler(["Can't parse object in object property.", 300], {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		}, "auto");
		
		return {};
		
	}
	
	if(!itHasAColon && argValue.length) {
		
		this.errorHandler(["Object doesn't have a colon.", 302], {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		}, "auto");
		
		return {};
		
	}
	
	if(tempArrayInArraySymbols) {
		
		this.errorHandler(["Can't parse array in object property.", 301], {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		}, "auto");
		
		return {};
		
	}
	
	if(tempKey) {
		
		this.errorHandler(["Parsing stuck on possible object prop value.", 303], {
			
			from: "parseObject",
			maxRecursiveCalls: objectOptions.maxRecursiveCalls,
			nowCall: callNumber,
			tempKey,
			
		}, "auto");
		
		return {};
		
	}
	
	return result
	
};

module.exports = parseObject;