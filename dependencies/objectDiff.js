/*

	objectDiff
	(c) 2020 Cameron Osakiski
	objectDiff(by Cameron Osakiski) may be freely distributed under the MIT license.
	
	dependencies:
	
		isObject from jQuery under the MIT license,
		toJson from github,
		sortObject from stackoverflow

*/

const isObject = require("./isObject");
const toJson = require("./toJson");

const sortObject = require("./objectSort");

const delimiter = "-";

const objectDifference = (obj1, obj2) => {
	
	if(!isObject(obj1) || !isObject(obj2)) return null;
	
	let result = {};

	for(const thisObjStr of ["obj1", "obj2"]) {
		
		let thisObj = obj1;
		let thisObj2 = obj2;
		
		if(thisObjStr == "obj2") {
			
			thisObj = obj2;
			thisObj2 = obj1;
			
		}
		
		let thatObjStr = thisObjStr == "obj1" ? "obj2" : "obj1";
	
		for(const key in thisObj) {
			
			const obj1prop = thisObj[key];
			const obj2prop = thisObj2[key];
			
			const thisDiffName = key + delimiter + thisObjStr;
			const thatDiffName = key + delimiter + thatObjStr;
			
			if(thisObj2.hasOwnProperty(key)) {
				
				if(typeof obj1prop != typeof obj2prop) {
					
					result[thisDiffName] = obj1prop;
					
				} else if(isObject(obj1prop) && isObject(obj2prop) && !result[thatDiffName + delimiter + thisObjStr]) {
					
					// !result[thatDiffName + delimiter + thisDiffName] for ignore dublicates
					
					const diff = objectDifference(obj1prop, obj2prop);
					
					if(diff) {
						
						result[thisDiffName + delimiter + thatObjStr] = diff;
						
					}
					
				} else if(isObject(obj1prop) && isObject(obj2prop) && result[thatDiffName + delimiter + thisObjStr]) {
					
					//catch for ignore dublicates
					
				} else if(Array.isArray(obj1prop) && Array.isArray(obj2prop)) {
					
					if(toJson(obj1prop) != toJson(obj2prop)) {
						
						result[thisDiffName] = obj1prop;
						
					}
					
				} else if(obj1prop != obj2prop) {
					
					result[thisDiffName] = obj1prop;
					
				}
				
			} else {
				
				result[thisDiffName] = obj1prop;

				result[thatDiffName] = undefined;
				
			}
			
		}
		
	}
	
	return JSON.stringify(result) == "{}" ? false : sortObject(result);
	
};

module.exports = objectDifference;