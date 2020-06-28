const isObject = require("../../../dependencies/isObject");

const copyV = require("../../../dependencies/copyValWithoutBind");

const toJson = require("../../../dependencies/toJson");

const getValue = require("../../../dependencies/getAnyPropValIfExists");

/*

Format:

	{
	
		...[name]: value | {
			
			value | argValue | v = any
			
			alias | a = string | array
			
		}
	
	}
	
*/

const staticSetDefaultArgValues = function(objectOfValues) {
	
	if(!isObject(objectOfValues) || toJson(objectOfValues) == "{}") return this;
	
	const defaultArgv = {};
	
	for(const argName in objectOfValues) {
		
		let argValue = copyV(objectOfValues[argName]);
		
		if(isObject(argValue) && isObject(argValue._options)) {
			
			argValue = argValue._options;
			
			const value = getValue(argValue, ["value", "v", "argValue"]);
			
			const alias = getValue(argValue, ["alias", "a", "aliases"]);
			
			if(Array.isArray(alias)) {
				
				for(let i = 0; i < alias.length; i++) {
					
					defaultArgv[alias[i]] = value;
					
				}
				
			} else if(typeof alias == "string") {
				
				defaultArgv[alias] = value;
				
			}
			
			argValue = value;
			
		}
		
		defaultArgv[argName] = argValue;
		
	}
	
	return this.options({
	
		defaultArgv,
		
		defaultNoneValue: undefined
		
	});
	
};

module.exports = staticSetDefaultArgValues;