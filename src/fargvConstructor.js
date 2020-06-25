const parseOptions = require("./parseOptions");

class fargv {
	
	constructor(options) {
		
		this.usableOptions = parseOptions(options);
		
		const argsList = Array.isArray(this.usableOptions.customArgv) ? this.usableOptions.customArgv : process.argv.slice(2);

		let parsedArgs = {
			
			_: {}
			
		};
		
		if(!this.usableOptions.customArgv) {
		
			if(this.usableOptions.rememberExecNodePath) parsedArgs["_"].execNodePath = process.argv[0];
			if(this.usableOptions.rememberExecFilePath) parsedArgs["_"].execFilePath = process.argv[1];
			
		}
		
		if((!this.usableOptions.rememberExecNodePath && !this.usableOptions.rememberExecFilePath) || this.usableOptions.customArgv) delete parsedArgs["_"];
		
		const rememberAllForDemandWithSkippedFlags = Array.isArray(this.usableOptions.demandWithSkippedFlags) ? {} : false;
		
		parsedArgs = this.parseFlags(argsList, parsedArgs, rememberAllForDemandWithSkippedFlags);
		
		if(rememberAllForDemandWithSkippedFlags) {
			
			this.checkDemand("demandWithSkippedFlags", rememberAllForDemandWithSkippedFlags);
			
		}
		
		if(Array.isArray(this.usableOptions.demandFlags)) {
			
			this.checkDemand("demandFlags", parsedArgs);
			
		}
		
		if(this.usableOptions.rememberWarns) {
			
			parsedArgs._warns = this.errors ? Object.assign([], this.errors) : [];
			
		}

		return parsedArgs
		
	}
	
}

module.exports = fargv;