/*
 *
 *	arrayEquals.js
 *
 *	Array equality check tool
 *
 *	(c) 2020-10-05 Cameron Osakiski
 *
 *	This script may be freely distributed under the MIT license
 *
 *	Dependencies: isObject - from jQuery under the MIT license, objectEquals - from stackoverflow
 *
*/

const isObject = require("./isObject")
const objectEquals = require("./objectEquals");

const arrayEquals = (arr1, arr2) => {

	if(!Array.isArray(arr1) || !Array.isArray(arr2)) return null;

	if(arr1 == arr2) return true;
	if(arr1.length != arr2.length) return false;

	for(let i = 0; i < arr1.length; ++i) {

		if(Array.isArray(arr1[i])) {

			if(!arrayEquals(arr1[i], arr2[i])) return false;

		} else if(isObject(arr1[i])) {

			if(!isObject(arr2[i])) return false;

			if(!objectEquals(arr1[i], arr2[i])) return false;

		} else if(arr1[i] !== arr2[i]) {

			return false;

		}

	}

	return true;

};

module.exports = arrayEquals;