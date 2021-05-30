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
			
				value | argValue | v = [undefined, "$notFill"] | any
				
				alias | a | aliases = string | array
				
			}
			
		} | ["$fargvSetDefault", value<[undefined, "$notFill"] | any>, alias<string | array>]
	
	} | "reset"
	
*/

//defaultArgv: plainObject<usableOptions.defaultArgv>, alias: string; returns boolean
const checkDuplicateAliases = (defaultArgv, alias) => {

	for(const prop in defaultArgv) {

		const v = defaultArgv[prop];

		if(Array.isArray(v)) {

			if(~v[1].indexOf(alias)) return true;

		}

	}

	return false;

};

//objectOfValues: plainObject | string, redefine: boolean; returns this<fargvWrapper>
const staticSetDefaultArgValues = function(objectOfValues, redefine) {
	
	if(objectOfValues == "reset" || redefine) {
		
		this.createOptions();
	
		this._options.defaultArgv = null;
		
		if(objectOfValues == "reset") return this;
	
	}
	
	if(!isObject(objectOfValues) || isEmptyObject(objectOfValues)) return this;

	const isObjectDefaultArgv = isObject(this._options.defaultArgv);
	
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
					
					if(
						typeof alias[i] == "string"
						&&
						alias[i] != argName
						&&
						!(isObjectDefaultArgv && this._options.defaultArgv[alias[i]])
						&&
						!(isObjectDefaultArgv && checkDuplicateAliases(this._options.defaultArgv, alias[i]))
						&&
						!defaultArgv[alias[i]]
						&&
						!checkDuplicateAliases(defaultArgv, alias[i])
						&&
						!~defaultArgv[argName][1].indexOf(alias[i])
					) {
						
						defaultArgv[argName][1].push(alias[i]);
						
					}
					
				}
				
			} else if(
				typeof alias == "string"
				&&
				alias != argName
				&&
				!(isObjectDefaultArgv && this._options.defaultArgv[alias])
				&&
				!(isObjectDefaultArgv && checkDuplicateAliases(this._options.defaultArgv, alias))
				&&
				!defaultArgv[alias]
				&&
				!checkDuplicateAliases(defaultArgv, alias)
			) {
				
				defaultArgv[argName][1] = [alias];
				
			}
			
		} else if(Array.isArray(argValue) && argValue[0] == sign) {
			
			if(argValue.length > 3 || argValue.length < 2) continue;

			if(argValue.length == 2) {

				defaultArgv[argName] = [copyV(argValue[1]), []];

			} else {

				if(
					typeof argValue[2] == "string"
					&&
					argValue[2] != argName
					&&
					!(isObjectDefaultArgv && this._options.defaultArgv[argValue[2]])
					&&
					!defaultArgv[argValue[2]]
					&&
					!checkDuplicateAliases(defaultArgv, argValue[2])
					&&
					!(isObjectDefaultArgv && checkDuplicateAliases(this._options.defaultArgv, argValue[2]))
				) {

					argValue[2] = [argValue[2]];

				} else if(Array.isArray(argValue[2])) {

					const temp = [];

					for(let i = 0; i < argValue[2].length; ++i) {

						const v = argValue[2][i];

						if(
							typeof v == "string"
							&&
							v != argName
							&&
							!(isObjectDefaultArgv && this._options.defaultArgv[v])
							&&
							!(isObjectDefaultArgv && checkDuplicateAliases(this._options.defaultArgv, v))
							&&
							!defaultArgv[v]
							&&
							!checkDuplicateAliases(defaultArgv, v)
							&&
							!~temp.indexOf(v)
						) {

							temp.push(v);

						}

					}

					if(temp.length) argValue[2] = temp;
					else continue;

				} else {

					continue;

				}

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