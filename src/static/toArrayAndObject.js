const isObject = require("../../dependencies/isObject");

const copyV = require("../../dependencies/copyValWithoutBind");

const toJson = require("../../dependencies/toJson");

const sysAlgo = "fargvToArrayAndObject";

const defaultOptions = require("../data/_options");

const defaultConfigs = {
	
	throwInsteadWarns: false,
	
	showWarns: true,
		
	rememberWarns: false
	
};

const main = function(_from, sourceString, mergingOptions, fargvWrapper) {
	
	const configs = Object.assign({}, defaultConfigs, {
		
		customArgv: [`--${sysAlgo}=` + sourceString],
		
	});
	
	//mainParse
	if(_from == "arrayParse") configs.array = true;
	else if(_from == "objectParse") configs.object = true;
	
	if(!isObject(configs[_from])) configs[_from] = {};
	
	configs[_from].allTypes = true;
	
	if(isObject(mergingOptions)) {
		
		const mergingOptionsCopy = Object.assign({}, mergingOptions);
		
		if(mergingOptionsCopy.hasOwnProperty("showWarns")) {
			
			configs.showWarns = mergingOptionsCopy.showWarns;
			
			delete mergingOptionsCopy.showWarns;
			
		}
		
		if(mergingOptionsCopy.hasOwnProperty("rememberWarns")) {
			
			configs.rememberWarns = mergingOptionsCopy.rememberWarns;
			
			delete mergingOptionsCopy.rememberWarns;
			
		}
		
		if(mergingOptionsCopy.hasOwnProperty("throwInsteadWarns")) {
			
			configs.throwInsteadWarns = mergingOptionsCopy.throwInsteadWarns;
			
			delete mergingOptionsCopy.throwInsteadWarns;
			
		}
		
		if(_from == "arrayParse" && isObject(mergingOptionsCopy.objectParse)) {
			
			const copyObjectParse = copyV(mergingOptionsCopy.objectParse);
			
			configs.objectParse = copyObjectParse;
			
			delete mergingOptions.objectParse;
			
		}
		
		if(_from == "objectParse" && isObject(mergingOptionsCopy.arrayParse)) {
			
			const copyArrayParse = copyV(mergingOptionsCopy.arrayParse);
			
			configs.arrayParse = copyArrayParse;
			
			delete mergingOptions.arrayParse;
			
		}
		
		if(toJson(mergingOptionsCopy) != "{}") {
			
			configs[_from].allTypes = false;
			
			for(const optionName in mergingOptionsCopy) {
				
				const optionValue = mergingOptionsCopy[optionName];
				
				configs[_from][optionName] = copyV(optionValue);
				
			}
		
		}

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
	
	return main("arrayParse", sourceString, mergingOptions, this);
	
};
const fromFargvStringObject = function(sourceString, mergingOptions) { 
	
	if(!sourceString.startsWith("{")) sourceString = "{" + sourceString;
	if(!sourceString.endsWith("}")) sourceString += "}";
	
	return main("objectParse", sourceString, mergingOptions, this);
	
};

module.exports = {
	
	fromFargvStringArray,
	fromFargvStringObject
	
};