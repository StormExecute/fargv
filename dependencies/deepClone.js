/*
 *
 *	deepClone.js
 *
 *	Tools for cloning objects and arrays
 *
 *	(c) 2020-06-26 Cameron Osakiski
 *
 *	This script may be freely distributed under the MIT license.
 *
 *	Dependencies: isPlainObject, isEmptyObject
 *
*/

const isObject = require("./isObject");
const isEmptyObject = require("./isEmptyObject");

//only arrays(with own objects)
const deepCloneArray = function(sourceArray, ...arrays) {
	
	if(!Array.isArray(sourceArray)) return [false];
	
	const result = !sourceArray.length ? [] : deepCloneArray([], sourceArray);
	
	for(let i = 0; i < arrays.length; ++i) {

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
	
};

//only objects
const deepCloneObject = function(mainObject, ...objects) {
	
	if(!isObject(mainObject)) return {"false": false};
	
	if(!objects.length) return mainObject;
	
	let result = isEmptyObject(mainObject) ? {} : deepCloneObject({}, mainObject);
	
	for(let i = 0; i < objects.length; ++i) {
		
		const thisObject = objects[i];
		
		//skip none-objects
		if(!isObject(thisObject)) continue;
		
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
				
				result[prop] = deepCloneArray([], thisValue);
				
			} else {
				
				result[prop] = thisValue;
				
			}
			
		}
		
	}
	
	return result;
	
};

module.exports = {
	
	deepCloneArray,
	deepCloneObject,
	
};