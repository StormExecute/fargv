const isObject = require("../../dependencies/isObject");

const mustConfigs = {

	throwInsteadWarns: false,

	showWarns: false,

	rememberWarns: true,

};

//!!!The main functionality is duplicated in the test specifications for better performance!!!

const tryToArray = function(sourceString, mergingOptions) {
	
	const configs = isObject(mergingOptions) ? Object.assign({}, mergingOptions, mustConfigs) : Object.assign({}, mustConfigs);
	
	const attemp = this.fromFargvStringArray(sourceString, configs);

	if(!attemp.warns) return attemp.value;

	return false;
	
};

const tryToObject = function(sourceString, mergingOptions) {

	const configs = isObject(mergingOptions) ? Object.assign({}, mergingOptions, mustConfigs) : Object.assign({}, mustConfigs);
	
	const attemp = this.fromFargvStringObject(sourceString, configs);

	if(!attemp.warns) return attemp.value;

	return false;
	
};

const sourceStringCanBeStrictFargvArray = function (sourceString, mergingOptions) {

	if(sourceString[0] != "[") return false;
	if(sourceString[sourceString.length - 1] != "]") return false;

	const configs = isObject(mergingOptions) ? Object.assign({}, mergingOptions, mustConfigs) : Object.assign({}, mustConfigs);

	const attemp = this.fromFargvStringArray(sourceString, configs);

	if(!attemp.warns) return attemp.value;

	return false;

};

const sourceStringCanBeStrictFargvObject = function (sourceString, mergingOptions) {

	if(sourceString[0] != "{") return false;
	if(sourceString[sourceString.length - 1] != "}") return false;

	const configs = isObject(mergingOptions) ? Object.assign({}, mergingOptions, mustConfigs) : Object.assign({}, mustConfigs);

	const attemp = this.fromFargvStringObject(sourceString, configs);

	if(!attemp.warns) return attemp.value;

	return false;

};

module.exports = {
	
	tryToArray,
	tryToObject,

	tryToStrictArray: sourceStringCanBeStrictFargvArray,
	tryToStrictObject: sourceStringCanBeStrictFargvObject,
	
};