const isObject = require("../../dependencies/isObject");

const toJson = require("../../dependencies/toJson");

const { toFargvStringArray, toFargvStringObject } = require("./fromArrayAndObject");

/*

Format:

	[
	
		{

			name | argName | n = string
			
			value | argValue | v = any
			
			flag | f | flagDC = number
			
			pre | p | prePush = function
			
			wes | withoutES | withoutEqualSym = boolean
			
		} | {
			
			_options: {
				
				useSpacesAsDelimiters = boolean | object{array = boolean, object = boolean}
				
			}
			
		},
		
		...?
		
	] || ![]

*/

const defaultNegativeResult = require("./generateModels/negativeResult");
const defaultOptions = require("./generateModels/_options");

const generateArgvFromTypesToString = function(argName, argValue, ...args) {
	
	/*
	
		argName, argValue === objects && [argName, argValue + ...args]
		
		argName === object && [argName]
		
		argName === array && argName[0] === object && argName
		
		args[0] === object && [{_options: ...}, {name, value}]
	
	*/
	
	const argvObj = (isObject(argName) && isObject(argValue)) ? 
	
							[argName, argValue].concat(args) 
							
						: isObject(argName) ? 
						
							[argName] 
							
						: (Array.isArray(argName) && isObject(argName[0])) ?
						
							argName
							
						: (typeof argName == "string" && isObject(args[0])) ?
						
							[
								{
									
									_options: args[0]._options || args[0]
									
								}, 
								
								{
									
									name: argName,

									value: argValue
									
								}
								
							]
							
						: (typeof argName == "string") ?
						
							[{name: argName, value: argValue}]
							
						: false;
						
	if(!argvObj) return defaultNegativeResult;
						
	const options = Object.assign({}, defaultOptions);
	
	const result = {};
	
	for(let i = 0; i < argvObj.length; i++) {
		
		const arg = argvObj[i];
		
		if(arg._options && isObject(arg._options)) {
			
			for(const option in arg._options) {
				
				const optionValue = arg._options[option];
				
				if(option == "useSpacesAsDelimiters" && /* ignore false and others */ (isObject(optionValue) || optionValue == true)) {
					
					options.useSpacesAsDelimiters = isObject(optionValue) ? Object.assign(options.useSpacesAsDelimiters, optionValue) : {"array": true, "object": true};
					
				}
				
			}
			
			continue;
			
		}
		
		const name = arg.name || arg.n || arg.argName;
		
		if(!name) continue;
		
		let val = arg.value || arg.v || arg.argValue || "";
		
		const flagRepeats = arg.flag || arg.f || /* flagDefinitionCharacters */ arg.flagDC || 2;
		
		const prePush = arg.pre || arg.p || arg.prePush // || undefined;
		
		const equalSym = (arg.wes || arg.withoutES || arg.withoutEqualSym) ? "" : "=";
		
		if(isObject(val)) {
			
			val = toFargvStringObject(val, options.useSpacesAsDelimiters["object"]);
			
		} else if(Array.isArray(val)) {
			
			val = toFargvStringArray(val, options.useSpacesAsDelimiters["array"]);
			
		} else if(typeof val == "bigint") {
			
			val = val + "n";
			
		}
	
		result[name] = {
			
			value: val ? '"' + (typeof prePush == "function" ? prePush(val) : val) + '"' : "",
			
			flagRepeats,
			
			equalSym
			
		};
		
	}
	
	return toJson(result) == "{}" ? defaultNegativeResult : {
		
		result,
		
		toString: function() {
			
			let result = "";
			
			for(const argName in this.result) {
				
				const arg = this.result[argName];
				
				result += "-".repeat(arg.flagRepeats) + `${argName}${arg.equalSym}${arg.value} `;
				
			}
			
			result = result.slice(0, -1);
			
			return result;
			
		},
		
		asString: function() {
			
			return this.toString();
			
		},
		
		asArray: function() {
			
			const result = [];
			
			for(const argName in this.result) {
				
				const arg = this.result[argName];
				
				result.push(["-".repeat(arg.flagRepeats) + `${argName}${arg.equalSym}`, arg.value]);
				
			}
			
			return result;
			
		},
		
		asObject: function() {
			
			const result = {};
			
			for(const argName in this.result) {
				
				const arg = this.result[argName];
				
				result["-".repeat(arg.flagRepeats) + `${argName}${arg.equalSym}`] = arg.value;
				
			}
			
			return result;
			
		},
		
	}
	
};

module.exports = generateArgvFromTypesToString;