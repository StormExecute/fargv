/*
 *
 *	objectDiff.js
 *
 *	Object difference comparison tool
 *
 *	(c) 2020-06-26 Cameron Osakiski
 *
 *	This script may be freely distributed under the MIT license
 *
 *	Dependencies: isObject - from jQuery under the MIT license, sortObject - from stackoverflow, isEmptyObject, arrayEquals
 *
*/

const isObject = require("./isObject");
const isEmptyObject = require("./isEmptyObject");

const arrayEquals = require("./arrayEquals");

const sortObject = require("./objectSort");

const delimiter = "-";
const objStrArr = ["obj1", "obj2"];

const objectDifference = (obj1, obj2) => {
	
	if(!isObject(obj1) || !isObject(obj2)) return null;
	
	let result = {};

	for(let i = 0; i < 2; ++i) {
		
		const thisObjStr = objStrArr[i];
		
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

					if(!arrayEquals(obj1prop, obj2prop)) {

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
	
	return isEmptyObject(result) ? false : sortObject(result);
	
};

module.exports = objectDifference;