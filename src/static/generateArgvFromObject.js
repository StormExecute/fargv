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
	
	const errorMessage = position ? 
	`[fargv]->generateArgvFromObject._options._more.${position.toUpperCase()}: Option change detected immediately after announcement.` :
	`[fargv]->generateArgvFromObject._options._more.AFTER: Found pointless adding options to the end.`;
	
	if(throwInsteadWarns) {
		
		throw new Error(errorMessage);
		
	} else {
		
		console.warn(errorMessage);
		
	}
	
}

const defaultNegativeResult = require("./generateModels/negativeResult");

const generate = require("./generateArgv");

const generateArgvFromUsuallyObject = function(getParsedArgs, objectOfValues, objectOfConfigs) {
	
	if(isObject(getParsedArgs)) {
		
		objectOfConfigs = objectOfValues;
		objectOfValues = getParsedArgs;
		getParsedArgs = false;
		
	}
	
	if(!isObject(objectOfValues) || toJson(objectOfValues) == "{}") return Object.assign({}, defaultNegativeResult);
	
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
		
		if(isObject(argValue)) continue;
		
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
			
			const resultCopy = Object.assign([], result);
			
			if(isObject(moreOptions[position]) && toJson(moreOptions[position]) != "{}") {
				
				for(const argName in moreOptions[position]) {
					
					if(!isObject(moreOptions[position][argName])) continue;
					
					for(let i = 1; i < resultCopy.length; i++) {
						
						if(resultCopy[i].name == argName) {
							
							if(position == "after" && !result[i + 1]) {
								
								fastGenerateError(null, moreOptions._throwInsteadWarns);
								
								continue;
								
							}
							
							if(
							
								(position == "before" && result[i - 1] && result[i - 1]._options) 
								
								||
								
								(position == "after" && result[i + 1]._options)
							
							) {
								
								fastGenerateError(position, moreOptions._throwInsteadWarns);
								
								continue;
								
							}
							
							const thisPosOptions = moreOptions[position][argName]._options ? 
								Object.assign({}, moreOptions[position][argName]._options) :
								{_options: Object.assign({}, moreOptions[position][argName])};
							
							result.splice(position == "before" ? i : i + 1, 0, Object.assign({}, thisPosOptions));
							
						}
						
					}
					
				}
				
			}
			
		}
		
	}
	
	return getParsedArgs ? result : generate(result);
	
};

module.exports = generateArgvFromUsuallyObject;