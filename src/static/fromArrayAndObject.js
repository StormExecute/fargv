const isObject = require("../../dependencies/isObject");

const toFargvStringObject = (sourceObject, useSpacesAsDelimiters) => {
	
	if(!isObject(sourceObject)) return "{}";
	
	const possibleSpace = useSpacesAsDelimiters ? " " : "";
	
	let result = "";
	
	for(const key in sourceObject) {
		
		let el = sourceObject[key];
		
		if(Array.isArray(el)) {
			
			el = toFargvStringArray(el, useSpacesAsDelimiters);
			
		} else if(isObject(el)) {
			
			el = toFargvStringObject(el, useSpacesAsDelimiters);
			
		} else if(typeof el == "bigint") {
			
			el = el + "n";
			
		}
		
		result += `${key}:${el},${possibleSpace}`;
		
	}
	
	if(result.endsWith(",")) result = result.slice(0, -1);
	else if(result.endsWith(", ")) result = result.slice(0, -2);
	
	return "{" + result + "}"
	
};

const toFargvStringArray = (sourceArray, useSpacesAsDelimiters) => {
	
	if(!Array.isArray(sourceArray)) return "[]";
	
	const possibleSpace = useSpacesAsDelimiters ? " " : "";
	
	let result = "";
	
	for(let i = 0; i < sourceArray.length; i++) {
		
		let el = sourceArray[i];
		
		if(Array.isArray(el)) {
			
			el = toFargvStringArray(el, useSpacesAsDelimiters);
			
		} else if(isObject(el)) {
			
			el = toFargvStringObject(el, useSpacesAsDelimiters);
			
		} else if(typeof el == "bigint") {
			
			el = el + "n";
			
		}
		
		result += `${el},${possibleSpace}`;
		
	}
	
	if(result.endsWith(",")) result = result.slice(0, -1);
	else if(result.endsWith(", ")) result = result.slice(0, -2);
	
	return "[" + result + "]"
	
};

module.exports = {
	
	toFargvStringArray,
	toFargvStringObject
	
};