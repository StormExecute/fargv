const isObject = require("../../dependencies/isObject");

const defaultConfigs = {
	
	showWarns: false,
	rememberWarns: true,
	
	//getPositiveResultIfIsItPossible: false
	
	getPositiveResult: false,
	getNegativeResult: false,
	
};

const main = (attemp, getPositiveResult, getNegativeResult) => {
	
	if(attemp._warns.length && getNegativeResult) {
		
		return attemp._warns;
		
	} else if(attemp._warns.length) {
		
		return false;
	
	} else if(getPositiveResult) {
		
		return attemp.value;
		
	} else {
	
		return true;
	
	}
	
};

const tryToArray = function(sourceString, mergingOptions) {
	
	const configs = isObject(mergingOptions) ? Object.assign({}, defaultConfigs, mergingOptions) : Object.assign({}, defaultConfigs);
	
	const attemp = this.fromFargvStringArray(sourceString, configs);
	
	return main(attemp, configs.getPositiveResult, configs.getNegativeResult);
	
};

const tryToObject = function(sourceString, mergingOptions) {
	
	const configs = isObject(mergingOptions) ? Object.assign({}, defaultConfigs, mergingOptions) : Object.assign({}, defaultConfigs);
	
	const attemp = this.fromFargvStringObject(sourceString, configs);
	
	return main(attemp, configs.getPositiveResult, configs.getNegativeResult);
	
};

module.exports = {
	
	tryToArray,
	tryToObject
	
};