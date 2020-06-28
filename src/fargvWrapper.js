const isObject = require("../dependencies/isObject");

const staticMethods = require("./static");

/*

	abstractALLFargvWrapperProperties:

		options,
		
		_default,
		custom,
		customWithGenerate,
		customWithGenerateFromObject,
		
		demand,
		undemand,
		
		exclude,
		
		noParse,
		noParseFlags,
		
		state,
		
		fromArray,
		fromObject,
		
		toArray,
		toObject,
		
		toFargvStringArray,
		toFargvStringObject,
		
		fromFargvStringArray,
		fromFargvStringObject,
		
		tryToArray,
		tryToObject,
		
		generate,
		generateFromObject,
		
		init,
	
*/

/*

	abstractSetFargvWrapperProperties:
	
		.options -> _options
		.default -> _options.defaultArgv
		.demand(..., true) -> _options.demandWithSkippedFlags
		.demand -> _options.demandFlags
		.custom -> _options.customArgv
		.exclude -> _options.excludeFlags
		.noParse -> _options.noParse
		.noParse(..., true) -> _options.noParseNoDefault
		.noParseFlags -> _options.noParseFlags
		.noParseFlags(..., true) -> _options.noParseNoDefaultFlags
		
*/

const fargv = require("./fargvConstructor");

function fargvWrapper(options) {
	
	//static fargv.options doesnt set they as default
	
	if(isObject(options)) {
		
		return new fargv(options);
		
	} else {
		
		return new fargv(fargvWrapper._options);
		
	}
	
}

fargvWrapper = Object.assign(fargvWrapper, staticMethods);

module.exports = fargvWrapper;