const isObject = require("../../dependencies/isObject");

const toJson = require("../../dependencies/toJson");

/*

The difference is that the options from objectOfConfigs._options are set once and cannot be changed. And fargv.generate can change options in subsequent objects.
Отличие в том, что опции из objectOfConfigs._options задаются один раз и не могут быть изменены. fargv.generate же может изменять опции в последующих объектах.

Format:

	{
		
		...[name]: [value]
		
	}, 
	
	{
		
		_options: {
			
			_more:? {
				
				_throwInsteadWarns = boolean<false>
				
				before: {
					
					"someArg": new _options{}
					
				}
				
				after: {
					
					"someArg": new _options{}
					
				}
				
			}
			
			useSpacesAsDelimiters = boolean | object{array = boolean, object = boolean}
			
		}?
		
		...[name]: {
			
			flag | f | flagDC = number
			
			pre | p | prePush = function
			
			wes | withoutES | withoutEqualSym = boolean
			
		}
		
	}?

*/

function fastGenerateError(position, throwInsteadWarns) {
	
	const errorMessage = `[fargv]->generateArgvFromObject._options._more.${position.toUpperCase()}: Option change detected immediately after announcement`;
	
	if(throwInsteadWarns) {
		
		throw new Error(errorMessage);
		
	} else {
		
		console.warn(errorMessage);
		
	}
	
}

const defaultNegativeResult = require("./models/generateNegativeResult");

const generate = require("./generateArgv");

const generateArgvFromUsuallyObject = function(getParsedArgs, objectOfValues, objectOfConfigs) {
	
	if(isObject(getParsedArgs)) {
		
		objectOfConfigs = objectOfValues;
		objectOfValues = getParsedArgs;
		getParsedArgs = false;
		
	}
	
	if(!isObject(objectOfValues) || toJson(objectOfValues) == "{}") return defaultNegativeResult;
	
	const result = [];
	let moreOptions = false;
	
	if(isObject(objectOfConfigs)) {
		
		if(objectOfConfigs._options) {
			
			const copyOptions = Object.assign({}, objectOfConfigs._options);
			
			if(copyOptions._more) {
				
				moreOptions = copyOptions._more;
				
				delete copyOptions._more;
				
			}
			
			result.push({
				
				_options: copyOptions
				
			});
			
			delete objectOfConfigs._options;
			
		}
		
	} else objectOfConfigs = {};
	
	for(const argName in objectOfValues) {
		
		const argValue = objectOfValues[argName];
		
		let arg = {
			
			name: argName,
			value: argValue,
			
		};
		
		if(isObject(objectOfConfigs[argName])) {
			
			const additional = objectOfConfigs[argName];
			
			arg = Object.assign(arg, additional);
			
		}
		
		result.push(arg);
		
	}
	
	if(moreOptions) {
		
		for(const position of ["before", "after"]) {
			
			const resultCopy = result;
			
			if(toJson(moreOptions[position]) != "{}") {
				
				for(const argName in moreOptions[position]) {
					
					for(let i = 1; i < resultCopy.length; i++) {
						
						if(resultCopy[i].name == argName) {
							
							if(
							
								(position == "before" && result[i - 1]._options) 
								
								||
								
								(position == "after" && result[i + 1]._options)
							
							) {
								
								fastGenerateError(position, moreOptions._throwInsteadWarns);
								
								continue;
								
							}
							
							result.splice(position == "before" ? i : i + 1, 0, moreOptions[position][argName]);
							
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	
	return getParsedArgs ? result : generate(result);
	
};

module.exports = generateArgvFromUsuallyObject;