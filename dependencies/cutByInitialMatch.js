/*
 *
 *	cutByInitialMatch.js
 *
 *	Tool to cut the initial string match from the beginning
 *
 *	(c) 2020-08-31 Cameron Osakiski
 *
 *	This script may be freely distributed under the MIT license
 *
 *	Dependencies: cachInitialMatchClass
 *
*/

class cachInitialMatchClass {
	
	constructor(initialMatch) {
		
		this.initialMatch = initialMatch;
		this.$length = initialMatch.length;
		
	}
	
	getSym(index) {
		
		if(this.$length > index) {
			
			return this.initialMatch[index];
			
		} else {
			
			return null;
			
		}
		
	}
	
}

const cutByInitialMatch = function(sourceStr, initialMatch) {
	
	if(initialMatch.length > sourceStr.length) return sourceStr;
	
	const cachedIM = new cachInitialMatchClass(initialMatch);
	let resultSubstrStart = 0;
	
	for(let i = 0; i < sourceStr.length; ++i) {
		
		const sourceStrSym = sourceStr[i];
		const imSym = cachedIM.getSym(i);
		
		if(imSym === null) {
			
			if(resultSubstrStart == 0) return sourceStr;
			
			return sourceStr.substr(resultSubstrStart);
		
		} else if(sourceStrSym != imSym) {
			
			return sourceStr;
			
		} else { //sourceStrSym == imSym
			
			++resultSubstrStart;
			
		}
		
	}
	
	if(resultSubstrStart == 0) return sourceStr;
	
	return sourceStr.substr(resultSubstrStart);
	
};

module.exports = cutByInitialMatch;