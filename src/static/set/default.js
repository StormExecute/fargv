const isObject = require("../../../dependencies/isObject");
const isEmptyObject = require("../../../dependencies/isEmptyObject");

const copyV = require("../../../dependencies/copyValWithoutBind");
const getValue = require("../../../dependencies/getAnyPropValIfExists");

//to avoid a conflict with the value that can be passed by the user
const sign = "$fargvSetDefault";

/*

Format:

	objectOfValues: plainObject = {
	
		...[name]: value<any> | {
			
			_options: { //for no conflict if value is object
			
				value | argValue | v = any
				
				alias | a | aliases = string | array
				
			}
			
		} | ["$fargvSetDefault", value<any>, alias<string | array>]
	
	} | "reset"
	
*/

//plainObject | string, boolean
const staticSetDefaultArgValues = function(objectOfValues, redefine) {
	
	if(objectOfValues == "reset" || redefine) {
		
		this.createOptions();
	
		this._options.defaultArgv = null;
		
		if(objectOfValues == "reset") return this;
	
	}
	
	if(!isObject(objectOfValues) || isEmptyObject(objectOfValues)) return this;
	
	const defaultArgv = {};
	
	for(const argName in objectOfValues) {
		
		let argValue = copyV(objectOfValues[argName]);
		
		if(isObject(argValue) && isObject(argValue._options)) {
			
			argValue = argValue._options;
			
			const $sign = sign + Math.random();
			
			const value = getValue(argValue, ["value", "v", "argValue"], $sign);
			
			if(value == $sign) continue;
			
			const alias = getValue(argValue, ["alias", "a", "aliases"], $sign);

			if(alias == $sign) continue;
			
			defaultArgv[argName] = [value, []];
			
			if(Array.isArray(alias)) {
				
				for(let i = 0; i < alias.length; ++i) {
					
					if(typeof alias[i] == "string") {
						
						defaultArgv[argName][1].push(alias[i]);
						
					}
					
				}
				
			} else if(typeof alias == "string") {
				
				defaultArgv[argName][1] = [alias];
				
			}
			
		} else if(Array.isArray(argValue) && argValue[0] == sign) {
			
			if(argValue.length > 3 || argValue.length < 2) continue;

			if(argValue.length == 2) {

				defaultArgv[argName] = [copyV(argValue[1]), []];

			} else {

				if(!Array.isArray(argValue[2]) && typeof argValue[2] != "string") continue;

				if(typeof argValue[2] == "string") argValue[2] = [argValue[2]];

				argValue.splice(0, 1);

				defaultArgv[argName] = copyV(argValue);

			}
			
		} else {
		
			defaultArgv[argName] = [copyV(argValue), []];
			
		}
		
	}
	
	return this.options({
	
		defaultArgv,
		
		defaultNoneValue: undefined
		
	});
	
};

module.exports = staticSetDefaultArgValues;