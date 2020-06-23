/*

	deepClone
	(c) 2020 Cameron Osakiski
	deepClone(by Cameron Osakiski) may be freely distributed under the MIT license.
	
	dependencies:
	
		isObject from jQuery under the MIT license,
		toJson from github

*/

const isObject = require("./isObject");
const toJson = require("./toJson");

//only arrays
const deepCloneArray = function(sourceArray, ...arrays) {
	
	if(!Array.isArray(sourceArray)) return [false];
	
	const result = toJson(sourceArray) == "[]" ? [] : deepCloneArray([], sourceArray);
	
	for(let i = 0; i < arrays.length; i++) {
		
		const thisArray = arrays[i];
		
		if(!Array.isArray(thisArray)) continue;
		
		for(let j = 0; j < thisArray.length; j++) {
			
			let thisArrayEl = thisArray[j];
			
			if(Array.isArray(thisArrayEl)) thisArrayEl = deepCloneArray([], thisArrayEl);
			if(isObject(thisArrayEl)) thisArrayEl = deepCloneObject({}, thisArrayEl);
			
			result[result.length] = thisArrayEl;
			
		}
		
	}
	
	return result;
	
}

//arrays + objects
const deepCloneObject = function(mainObject, ...objects) {
	
	//only objects and arrays
	if(!isObject(mainObject) && !Array.isArray(mainObject)) return {"false": false};
	
	if(!objects.length) return mainObject;
	
	let result = toJson(mainObject) == "[]" ? []
	: toJson(mainObject) == "{}" ? {} 
	: Array.isArray(mainObject) ? deepCloneArray([], mainObject) 
	: deepCloneObject({}, mainObject);
	
	for(let i = 0; i < objects.length; i++) {
		
		const thisObject = objects[i];
		
		//skip none-objects && none-arrays
		if(!isObject(thisObject) && !Array.isArray(thisObject)) continue;
		
		//skip objects with wrong type
		if(Array.isArray(result) && isObject(thisObject)) continue;
		
		//if it is an array return deepCloneArray
		if(!isObject(result) && Array.isArray(thisObject)) {
			
			result = deepCloneArray(result, thisObject);
			
			continue;
			
		}
		
		for(const prop in thisObject) {
			
			const thisValue = thisObject[prop];
			const resultValue = result[prop];
			
			if(isObject(thisValue)) {
				
				if(isObject(resultValue)) {
					
					result[prop] = deepCloneObject(resultValue, thisValue);
					
				} else {
					
					result[prop] = deepCloneObject({}, thisValue);
					
				}
				
			} else if(Array.isArray(thisValue)) {
				
				if(Array.isArray(resultValue)) {
					
					result[prop] = deepCloneArray(resultValue, thisValue);
					
				} else {
					
					result[prop] = deepCloneArray([], thisValue);
					
				}
				
			} else {
				
				result[prop] = thisValue;
				
			}
			
		}
		
	}
	
	return result;
	
};

module.exports = {
	
	deepCloneArray,
	deepCloneObject
	
};