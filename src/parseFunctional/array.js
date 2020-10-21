const parseArray = function (argValue, callNumber) {
	
	callNumber = callNumber || 0;
	
	const arrayOptions = this.usableOptions.arrayParse;
	
	if(callNumber > arrayOptions.maxRecursiveCalls) {
		
		this.errorHandler(["Maximum call stack size exceeded appears!", 1], {
			
			"from": "parseArray",
			maxRecursiveCalls: arrayOptions.maxRecursiveCalls,
			nowCall: callNumber,
			
		}, "auto");
		
	}
	
	const result = [];
	
	let resultI = 0;
	
	let skipComma = false;
	
	let arrayInArray = 0;
	let tempArrayInArraySymbols = "";
	
	let objectInObject = 0;
	let tempObjectInObjectSymbols = "";
	
	//for no conflicts strings and possible arrays | objects
	let arrayInArrayForStr = 0;
	let objectInObjectForStr = 0;
	
	//for no conflicts with options: arrayParse: {array: true, object: false}
	/*
	
		Example:
		
			fargv.toArray("[{a: [], b: 3}]", {
				
				object: false,
				array: true,
				
			}
	
	*/
	let skipArrayParseIfNoParseObject = false;
	
	for(let i = 0; i < argValue.length; i++) {
		
		const thSym = argValue[i];
		
		if(arrayOptions["array"] && thSym == "[" && !objectInObject && !skipArrayParseIfNoParseObject) {
			
			//for concat deep arrays
			if(arrayInArray) tempArrayInArraySymbols += thSym;
			
			arrayInArray += 1;
			
			continue;
			
		} else if(thSym == "[") {
			
			arrayInArrayForStr += 1;
			
		}
		
		if(arrayOptions["array"] && thSym == "]" && arrayInArray && !objectInObject) {
			
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
			
		} else if(thSym == "]") {
			
			arrayInArrayForStr -= 1;
			
		}
		
		if(arrayOptions["object"] && thSym == "{" && !arrayInArray) {
		
			if(objectInObject) tempObjectInObjectSymbols += thSym;
		
			objectInObject += 1;
			
			continue;
		
		} else if(thSym == "{") {
			
			if(!objectInObjectForStr) skipArrayParseIfNoParseObject = true;
			
			objectInObjectForStr += 1;
			
		}
		
		if(arrayOptions["object"] && thSym == "}" && objectInObject && !arrayInArray) {
			
			if((objectInObject - 1) == 0) {
				
				result[resultI] = this.parseObject(tempObjectInObjectSymbols, callNumber + 1);
				
				objectInObject = 0;
				tempObjectInObjectSymbols = "";
				
				resultI++;
				
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
		
		if(arrayOptions["array"] && arrayInArray) {
			
			tempArrayInArraySymbols += thSym;
			
			continue;
			
		}
		
		if(arrayOptions["object"] && objectInObject) {
			
			tempObjectInObjectSymbols += thSym;
			
			continue;
			
		}
		
		if(skipComma) {
			
			if(thSym == this.usableOptions.defaultCommaSplitSym) skipComma = false;
			
			continue;
			
		}
		
		if(thSym == this.usableOptions.defaultCommaSplitSym && !arrayInArrayForStr && !objectInObjectForStr) {
			
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
		
		this.errorHandler(["Can't parse array in array.", 200], {
			
			"from": "parseArray",
			maxRecursiveCalls: arrayOptions.maxRecursiveCalls,
			nowCall: callNumber,
			
		}, "auto");
		
		return [];
		
	}
	
	if(tempObjectInObjectSymbols) {
		
		this.errorHandler(["Can't parse object in array.", 201], {
			
			"from": "parseArray",
			maxRecursiveCalls: arrayOptions.maxRecursiveCalls,
			nowCall: callNumber,
			
		}, "auto");
		
		return [];
		
	}
	
	return result
	
};

module.exports = parseArray;