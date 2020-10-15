const isObject = require("../dependencies/isObject");

const { deepCloneObject } = require("../dependencies/deepClone");

const staticMethods = require("./static/index");

let abstractStaticMethods = {

	//abstractALLFargvWrapperProperties:

	_options: {},

	options(options, redefine){},

	createOptions(){},

	reset(option){},
	resetAll(){},

	command(command, handler, help){},
	separateCommand(handler, alwaysCallSeparateCommandHanler){},

	option(optionName, optionConfig){},

	help(objectOfHelp){},

	"default": (objectOfValues, redefine) => {},
	custom(customArgv){},
	customWithGenerate(...args){},
	customWithGenerateFromObject(...args){},

	demand(args, withSkipArgs){},
	undemand(args, withSkipArgs){},

	exclude(excludeFlags, redefine){},

	noParse(state, isNoParseNoDefault){},
	noParseFlags(noParseFlags, isNoParseNoDefaultFlags){},

	allParse(allParseState){},

	returnFilter(newReturnFilterValue){},

	remember(rememberState){},

	warns(optionsState){},

	arrayParse(arrayParse, redefine){},
	objectParse(objectParse, redefine){},

	state(about){},

	fromArray(sourceArray, useSpacesAsDelimiters){},
	fromObject(sourceObject, useSpacesAsDelimiters){},

	toArray(sourceString, mergingOptions){},
	toObject(sourceString, mergingOptions){},

	toFargvStringArray(sourceArray, useSpacesAsDelimiters){},
	toFargvStringObject(sourceObject, useSpacesAsDelimiters){},

	fromFargvStringArray(sourceString, mergingOptions){},
	fromFargvStringObject(sourceString, mergingOptions){},

	strIsArray(sourceString, mergingOptions){},
	strIsObject(sourceString, mergingOptions){},

	strIsStrictArray(sourceString, mergingOptions){},
	strIsStrictObject(sourceString, mergingOptions){},

	generate(argName, argValue, ...args){},
	generateFromObject(getParsedArgs, objectOfValues, objectOfConfigs){},

	init(options, mergingWithFargvWrapperOptions){},

	initF(options, mergingWithFargvWrapperOptions){},
	initC(options, mergingWithFargvWrapperOptions){},
	initFC(options, mergingWithFargvWrapperOptions){},
	initCF(options, mergingWithFargvWrapperOptions){},

}

abstractStaticMethods = Object.assign(abstractStaticMethods, staticMethods);

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

function fargvWrapper(options, mergingWithFargvWrapperOptions) {
	
	//static fargv.options doesnt set they as default
	if(isObject(options)) {

		if(mergingWithFargvWrapperOptions) {

			fargvWrapper.createOptions();

			fargvWrapper._options = deepCloneObject(fargvWrapper._options, options);

			return (new fargv(fargvWrapper._options)).result;

		}

		return (new fargv(options)).result;
		
	} else {

		return (new fargv(fargvWrapper._options)).result;
		
	}
	
}

fargvWrapper = Object.assign(fargvWrapper, abstractStaticMethods);

module.exports = {
	
	fargvWrapper,
	fargv
	
};