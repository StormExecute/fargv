const isObject = require("../../dependencies/isObject");

const sysAlgo = "fargvToArrayAndObject";

const defaultOptions = require("../data/_options");

const defaultConfigs = {
	
	throwInsteadWarns: false,
	
	showWarns: true,
		
	rememberWarns: false,
		
	allParse: true
	
};

const addPossibleConfig = function(from, configs, mergingOptions, configName) {
	
	let configValue;
	
	const parseWhat = from == "object" ? "objectParse" : "arrayParse";
	
	if(!configs[parseWhat]) configs[parseWhat] = {};
	
	if(mergingOptions.hasOwnProperty(configName)) configValue = mergingOptions[configName];
	else if(mergingOptions.parse.hasOwnProperty(configName)) configValue = mergingOptions.parse[configName];
	else if(mergingOptions[parseWhat].hasOwnProperty(configName)) configValue = mergingOptions[parseWhat][configName];
	
	if(!configValue) return;
		
	configs[parseWhat][configName] = configValue;
	
};

const main = function(from, sourceString, mergingOptions, fargvWrapper) {
	
	const configs = Object.assign({}, defaultConfigs, {
		
		customArgv: [`--${sysAlgo}=` + sourceString],
		
	});
	
	if(isObject(mergingOptions)) {
		
		if(mergingOptions.hasOwnProperty("showWarns")) configs.showWarns = mergingOptions.showWarns;
		if(mergingOptions.hasOwnProperty("rememberWarns")) configs.rememberWarns = mergingOptions.rememberWarns;
		if(mergingOptions.hasOwnProperty("throwInsteadWarns")) configs.throwInsteadWarns = mergingOptions.throwInsteadWarns;
		
		const mergingOptionsCopy = Object.assign({}, mergingOptions);
		
		if(!isObject(mergingOptionsCopy.parse)) mergingOptionsCopy.parse = {};
		
		if(from == "object") {
			
			if(!isObject(mergingOptionsCopy.objectParse)) mergingOptionsCopy.objectParse = {};
			
			addPossibleConfig(from, configs, mergingOptionsCopy, "ifDuplicateKey");
			
		} else if(from == "array") {
			
			if(!isObject(mergingOptionsCopy.arrayParse)) mergingOptionsCopy.arrayParse = {};
			
		}

		addPossibleConfig(from, configs, mergingOptionsCopy, "maxRecursiveCalls");
		addPossibleConfig(from, configs, mergingOptionsCopy, "defaultNoneValue");

		
	} else {
		
		mergingOptions = {};
		
	}
	
	const emulateParse = fargvWrapper(configs);
	
	if(mergingOptions.rememberWarns) {
		
		return {
			
			value: emulateParse[sysAlgo],
			
			_warns: emulateParse._warns //|| []
			
		};
		
	} else {
		
		return emulateParse[sysAlgo];
		
	}
	
};

const fromFargvStringArray = function(sourceString, mergingOptions) {
	
	if(!sourceString.startsWith("[")) sourceString = "[" + sourceString;
	if(!sourceString.endsWith("]")) sourceString += "]";
	
	return main("array", sourceString, mergingOptions, this);
	
};
const fromFargvStringObject = function(sourceString, mergingOptions) { 
	
	if(!sourceString.startsWith("{")) sourceString = "{" + sourceString;
	if(!sourceString.endsWith("}")) sourceString += "}";
	
	return main("object", sourceString, mergingOptions, this);
	
};

module.exports = {
	
	fromFargvStringArray,
	fromFargvStringObject
	
};