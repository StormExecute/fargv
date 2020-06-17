const isObject = require("../dependencies/isObject");

const parseOptions = require("./parseOptions");

const errorHandler = require("./errorHandler");

const parseMinorAndBoolean = require("./parseFunctional/minorAndBoolean");
const parseArray = require("./parseFunctional/array");
const parseObject = require("./parseFunctional/object");
const parseBigInt = require("./parseFunctional/bigint");

const parseArrayAndObjectEl = require("./parseFunctional/arrayAndObjectEl");

const parseThisArgument = require("./parseThisArgument");

const {
	
	options,
	_default,
	
	state,
	
	init,
	
} = require("./static"); 

function abstractSetFargvWrapperProperties() {
	
	if(!fargvWrapper._options) fargvWrapper._options = null;
	
	if(!fargvWrapper._default) fargvWrapper._default = null;
	
}

function fargvWrapper(options) {
	
	abstractSetFargvWrapperProperties();
	
	//static fargv.options doesnt set they as default
	
	if(isObject(options)) {
		
		return new fargv(options);
		
	} else {
		
		return new fargv(fargvWrapper._options);
		
	}
	
}

function mainExport() {
	
	fargv.prototype = Object.assign(fargv.prototype, {
		
		errorHandler,
		
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
		
		state,
		
		init,
		
	});
	
	module.exports = fargvWrapper
	
}

class fargv {
	
	constructor(options) {
		
		this.usableOptions = parseOptions(options);
		
		const argsList = Array.isArray(this.usableOptions.customArgsList) ? this.usableOptions.customArgsList : process.argv.slice(2);

		const parsedArgs = {
			
			_: {}
			
		};
		
		if(!this.usableOptions.customArgsList) {
		
			if(this.usableOptions.rememberExecNodePath) parsedArgs["_"].execNodePath = process.argv[0];
			if(this.usableOptions.rememberExecFilePath) parsedArgs["_"].execFilePath = process.argv[1];
			
		}
		
		if((!this.usableOptions.rememberExecNodePath && !this.usableOptions.rememberExecFilePath) || this.usableOptions.customArgsList) delete parsedArgs["_"];

		for(let a = 0; a < argsList.length; a++) {

			const thArg = argsList[a];
			
			const isArgument = this.usableOptions.unlimitedFlagDefinitionCharacters ? thArg.startsWith("-") : thArg.startsWith("--") || thArg.match(/^-\w/i);

			if(isArgument && (!this.usableOptions.supportEmptyFlags ? thArg.includes("=") : true)) {

				const thPArg = thArg.split("=");
				
				const argName = thPArg[0].replace(/^-+/, "");
				
				if(this.usableOptions.supportOnlyLatinArgs && argName.match(/[^a-z]/i)) continue;

				let argValue = thPArg[1];
				
				if(!argValue) argValue = this.usableOptions.mainParse.defaultNoneValue;
				
				if(!this.usableOptions.noParse && argValue) argValue = this.parseThisArgument(argName, argValue);

				parsedArgs[argName] = argValue
				
			}

		}

		return parsedArgs
		
	}
	
}

mainExport();