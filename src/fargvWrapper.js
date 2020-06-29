const isObject = require("../dependencies/isObject");

const staticMethods = require("./static");

/*

	abstractALLFargvWrapperProperties:

		options,
		
		command,
		
		"default": _default,
		custom,
		customWithGenerate,
		customWithGenerateFromObject,
		
		demand,
		undemand,
		
		exclude,
		
		noParse,
		noParseFlags,
		
		allParse,
		
		remember,
		
		warns,
		
		arrayParse,
		objectParse,
		
		state,
		
		fromArray: toFargvStringArray,
		fromObject: toFargvStringObject,
		
		toArray: fromFargvStringArray,
		toObject: fromFargvStringObject,
		
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
		.custom, .customWithGenerate, .customWithGenerateFromObject -> _options.customArgv
		.exclude -> _options.excludeFlags
		.noParse -> _options.noParse
		.noParse(..., true) -> _options.noParseNoDefault
		.noParseFlags -> _options.noParseFlags
		.noParseFlags(..., true) -> _options.noParseNoDefaultFlags
		.arrayParse -> _options.arrayParse
		.objectParse -> _options.objectParse
		.warns -> _options -> rememberWarns, showWarns, throwInsteadWarns, parseWarn
		
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

module.exports = {
	
	fargvWrapper,
	fargv
	
};