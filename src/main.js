const isObject = require("../dependencies/isObject");

const parseOptions = require("./parseOptions");

const errorHandler = require("./errorHandler");

const checkDemand = require("./checkDemand");

const parseMinorAndBoolean = require("./parseFunctional/minorAndBoolean");
const parseArray = require("./parseFunctional/array");
const parseObject = require("./parseFunctional/object");
const parseBigInt = require("./parseFunctional/bigint");

const parseArrayAndObjectEl = require("./parseFunctional/arrayAndObjectEl");

const parseThisArgument = require("./parseThisArgument");

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
	
		.default -> _options.defaultArgs
		.demand(..., true) -> _options.demandWithSkipArgs
		.demand -> _options.demandArgs
		.custom -> _options.customArgs
	
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

function mainExport() {
	
	fargv.prototype = Object.assign(fargv.prototype, {
		
		errorHandler,
		
		checkDemand,
		
		parseThisArgument,
		
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
	
	module.exports = fargvWrapper
	
}

class fargv {
	
	constructor(options) {
		
		this.usableOptions = parseOptions(options);
		
		const argsList = Array.isArray(this.usableOptions.customArgs) ? this.usableOptions.customArgs : process.argv.slice(2);

		const parsedArgs = {
			
			_: {}
			
		};
		
		if(!this.usableOptions.customArgs) {
		
			if(this.usableOptions.rememberExecNodePath) parsedArgs["_"].execNodePath = process.argv[0];
			if(this.usableOptions.rememberExecFilePath) parsedArgs["_"].execFilePath = process.argv[1];
			
		}
		
		if((!this.usableOptions.rememberExecNodePath && !this.usableOptions.rememberExecFilePath) || this.usableOptions.customArgs) delete parsedArgs["_"];
		
		const rememberAllForDemandWithSkipArgs = Array.isArray(this.usableOptions.demandWithSkipArgs) ? {} : false;

		for(let a = 0; a < argsList.length; a++) {

			const thArg = argsList[a];
			
			if(rememberAllForDemandWithSkipArgs) {
				
				const thPArg = thArg.split("=");
				
				const argName = thPArg[0].replace(/^-+/, "");
				
				rememberAllForDemandWithSkipArgs[argName] = 1;
				
			}
			
			const isArgument = this.usableOptions.unlimitedFlagDefinitionCharacters ? thArg.startsWith("-") : thArg.startsWith("--") || thArg.match(/^-\w/i);

			if(isArgument && (!this.usableOptions.supportEmptyFlags ? thArg.includes("=") : true)) {

				const thPArg = thArg.split("=");
				
				const argName = thPArg[0].replace(/^-+/, "");
				
				if(this.usableOptions.supportOnlyLatinArgs && argName.match(/[^a-z]/i)) continue;

				let argValue = thPArg[1];
				
				if(Array.isArray(this.usableOptions.excludeArgs) && this.usableOptions.excludeArgs.indexOf(argValue) != -1) continue;
				
				if(!(Array.isArray(this.usableOptions.excludeArgsButSave) && this.usableOptions.excludeArgsButSave.indexOf(argValue) != -1)) {
					
					if(!argValue) argValue = this.usableOptions.mainParse.defaultNoneValue;
					
					if(!this.usableOptions.noParse && argValue) argValue = this.parseThisArgument(argName, argValue);
				
				}

				parsedArgs[argName] = argValue
				
			}

		}
		
		if(rememberAllForDemandWithSkipArgs) {
			
			this.checkDemand("demandWithSkipArgs", rememberAllForDemandWithSkipArgs);
			
		}
		
		if(Array.isArray(this.usableOptions.demandArgs)) {
			
			this.checkDemand("demandArgs", parsedArgs);
			
		}
		
		if(this.usableOptions.rememberWarns) {
			
			parsedArgs._warns = this.errors ? Object.assign([], this.errors) : [];
			
		}

		return parsedArgs
		
	}
	
}

mainExport();