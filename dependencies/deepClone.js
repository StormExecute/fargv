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
	
	const result = [].slice.call(sourceArray);
	
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
	
	let result = toJson(mainObject) == "{}" ? {} 
	: Array.isArray(mainObject) ? [].slice.call(mainObject)
	: deepCloneObject.___spawnRecursionChild({}, mainObject);
	
	for(let i = 0; i < objects.length; i++) {
		
		const thisObject = objects[i];
		
		//skip none-objects && none-arrays
		if(!isObject(thisObject) && !Array.isArray(thisObject)) continue;
		
		//if these are arrays return deepCloneArray
		if(Array.isArray(result) && Array.isArray(thisObject)) {
			
			result = deepCloneArray(result, thisObject);
			
			continue;
			
		}
		
		//skip if second argument is of the wrong type
		if(Array.isArray(result) && isObject(thisObject)) continue;
		if(isObject(result) && Array.isArray(thisObject)) continue;
		
		for(const prop in thisObject) {
			
			const thisValue = thisObject[prop];
			const resultValue = result[prop];
			
			if(isObject(thisValue)) {
				
				if(isObject(resultValue)) {
					
					result[prop] = deepCloneObject.___spawnRecursionChild(resultValue, thisValue);
					
				} else {
					
					result[prop] = deepCloneObject.___spawnRecursionChild({}, thisValue);
					
				}
				
			} else if(Array.isArray(thisValue)) {
				
				if(Array.isArray(resultValue) && deepCloneObject._concatArrays.status) {
					
					result[prop] = deepCloneArray(resultValue, thisValue);
					
				} else {
					
					result[prop] = [].slice.call(thisValue);
					
				}
				
			} else {
				
				result[prop] = thisValue;
				
			}
			
		}
		
	}
	
	if(!deepCloneObject._concatArrays.always && deepCloneObject._concatArrays.status) {
		
		deepCloneObject._concatArrays.status = false;
		
	}
	
	return result;
	
};

deepCloneObject._concatArrays = {};

deepCloneObject.concatArrays = function(state) {
	
	if(!isObject(state)) {
		
		state = {
			
			status: state,
			always: false
			
		};
		
	}
	
	deepCloneObject._concatArrays = {
		
		status: state.status || deepCloneObject._concatArrays.status || false,
		always: state.always || deepCloneObject._concatArrays.always || false
		
	};
	
	return deepCloneObject
	
};

//to save _concatArrays state for main process
deepCloneObject.___spawnRecursionChild = function(mainObject, ...objects) {
	
	const _concatArraysState = {status: deepCloneObject._concatArrays.status, always: deepCloneObject._concatArrays.always};
	
	const result = deepCloneObject(mainObject, ...objects);
	
	deepCloneObject._concatArrays = {status: _concatArraysState.status, always: _concatArraysState.always};
	
	return result;
	
}

module.exports = {
	
	deepCloneArray,
	deepCloneObject
	
};