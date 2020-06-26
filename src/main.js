const isObject = require("../dependencies/isObject");

const errorHandler = require("./errorHandler");

const checkDemand = require("./checkDemand");

const parseMinorAndBoolean = require("./parseFunctional/minorAndBoolean");
const parseArray = require("./parseFunctional/array");
const parseObject = require("./parseFunctional/object");
const parseBigInt = require("./parseFunctional/bigint");

const parseArrayAndObjectEl = require("./parseFunctional/arrayAndObjectEl");

const getDefaultNoneValue = require("./getDefaultNoneValue");

const parseFlags = require("./parseFlags");
const parseThisFlag = require("./parseThisFlag");

const fargv = require("./fargvConstructor");

const {
	
	options,
	_default,
	
	demand,
	undemand,
	
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
	
} = require("./static"); 

function abstractSetFargvWrapperProperties() {
	
	if(!fargvWrapper._options) fargvWrapper._options = null;
	
	/*
	
		.default -> _options.defaultArgv
		.demand(..., true) -> _options.demandWithSkippedFlags
		.demand -> _options.demandFlags
		.custom -> _options.customArgv
	
	*/
	
}

function fargvWrapper(options) {
	
	//static fargv.options doesnt set they as default
	
	if(isObject(options)) {
		
		return new fargv(options);
		
	} else {
		
		return new fargv(fargvWrapper._options);
		
	}
	
}

abstractSetFargvWrapperProperties();

fargv.prototype = Object.assign(fargv.prototype, {
	
	errorHandler,
	
	checkDemand,
	
	getDefaultNoneValue,
	
	parseFlags,
	parseThisFlag,
	
	parseMinorAndBoolean,
	parseArray,
	parseObject,
	parseBigInt,
	
	parseArrayAndObjectEl,
	
});

fargvWrapper = Object.assign(fargvWrapper, {
	
	options,
	default: _default,
	
	demand,
	undemand,
	
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
	
});

module.exports = fargvWrapper;