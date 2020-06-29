const isObject = require("../dependencies/isObject");

const copyV = require("../dependencies/copyValWithoutBind");

const parseOptions = require("./parseOptions");

class fargv {
	
	constructor(options) {
		
		this.usableOptions = parseOptions(options);
		
		const argsList = Array.isArray(this.usableOptions.customArgv) ? copyV(this.usableOptions.customArgv) : process.argv.slice(2);

		let parsedArgs = {
			
			_: {}
			
		};
		
		if(!this.usableOptions.customArgv) {
		
			if(this.usableOptions.rememberExecNodePath) parsedArgs["_"].execNodePath = process.argv[0];
			if(this.usableOptions.rememberExecFilePath) parsedArgs["_"].execFilePath = process.argv[1];
			
		}
		
		if((!this.usableOptions.rememberExecNodePath && !this.usableOptions.rememberExecFilePath) || this.usableOptions.customArgv) delete parsedArgs["_"];
		
		const rememberAllForDemandWithSkippedFlags = Array.isArray(this.usableOptions.demandWithSkippedFlags) ? {} : false;
		const rememberCommands = Array.isArray(this.usableOptions.commands) ? [] : false;
		
		//rememberAllForDemandWithSkippedFlags && rememberCommands can change
		parsedArgs = this.parseFlags(argsList, parsedArgs, rememberAllForDemandWithSkippedFlags, rememberCommands);
		
		if(rememberAllForDemandWithSkippedFlags) {
			
			this.checkDemand("demandWithSkippedFlags", rememberAllForDemandWithSkippedFlags);
			
		}
		
		if(Array.isArray(this.usableOptions.demandFlags)) {
			
			this.checkDemand("demandFlags", parsedArgs);
			
		}
		
		if(isObject(this.usableOptions.defaultArgv)) {
			
			for(const defaultArgName in this.usableOptions.defaultArgv) {
				
				if(typeof parsedArgs[defaultArgName] == "undefined") {
					
					parsedArgs[defaultArgName] = copyV(this.usableOptions.defaultArgv[defaultArgName]);
					
				}
				
			}
			
		}
		
		if(this.usableOptions.rememberWarns) {
			
			parsedArgs._warns = this.errors ? Object.assign([], this.errors) : [];
			
		}
		
		if(rememberCommands.length) this.parseCommands(rememberCommands, parsedArgs);

		return parsedArgs
		
	}
	
}

module.exports = fargv;