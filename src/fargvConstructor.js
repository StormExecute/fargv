const nodePath = require("path");

const isObject = require("../dependencies/isObject");
const isEmptyObject = require("../dependencies/isEmptyObject");

const copyV = require("../dependencies/copyValWithoutBind");

const parseOptions = require("./parseOptions");

/*

	Fargv props:

		usableOptions,
		errors

	parsedArgs props:

		_?: plainObject = {

			execNodePath?: string,
			execFilePath?: string,
			execFileBasename?: string,

		},

		_warns: Array<...string,>,



		...[others]: any,

*/

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
			if(this.usableOptions.rememberExecFileBasename) parsedArgs["_"].execFileBasename = nodePath.basename(process.argv[1]);
			
		}
		
		if((!this.usableOptions.rememberExecNodePath && !this.usableOptions.rememberExecFilePath) || this.usableOptions.customArgv) delete parsedArgs["_"];

		const optionsHaveCommands = Array.isArray(this.usableOptions.commands);
		const optionsHaveSeparateCommandHandler = typeof this.usableOptions.separateCommandHandler == "function";

		const rememberAllFlags = {};
		const rememberAllCommands = [];
		
		//rememberAllFlags && rememberAllCommands can change
		/*parsedArgs = */this.parseFlags(argsList, parsedArgs, rememberAllFlags, rememberAllCommands);
		
		if(Array.isArray(this.usableOptions.demandWithSkippedFlags) && !isEmptyObject(rememberAllFlags)) {
			
			this.checkDemand("demandWithSkippedFlags", rememberAllFlags);
			
		}
		
		if(Array.isArray(this.usableOptions.demandFlags) && !isEmptyObject(parsedArgs)) {
			
			this.checkDemand("demandFlags", parsedArgs);
			
		}
		
		if(isObject(this.usableOptions.defaultArgv)) {
			
			for(const defaultArgName in this.usableOptions.defaultArgv) {

				const [defaultValue, aliases] = copyV(this.usableOptions.defaultArgv[defaultArgName]);
				
				let findAliasStatus = false;
				
				//we must delete aliases anyway
				for(let i = 0; i < aliases.length; i++) {
					
					if(findAliasStatus) {
						
						delete parsedArgs[aliases[i]];
						
						continue;
						
					}
					
					if(typeof parsedArgs[aliases[i]] != "undefined") {
						
						findAliasStatus = true;
						
						if(typeof parsedArgs[defaultArgName] == "undefined") parsedArgs[defaultArgName] = copyV(parsedArgs[aliases[i]]);
						
						delete parsedArgs[aliases[i]];
						
					}
					
				}
				
				if(!findAliasStatus && typeof parsedArgs[defaultArgName] == "undefined") parsedArgs[defaultArgName] = defaultValue;
				
			}
			
		}
		
		if(this.usableOptions.rememberWarns) {
			
			parsedArgs._warns = this.errors ? Object.assign([], this.errors) : [];
			
		}
		
		if(optionsHaveCommands && rememberAllCommands.length) {

			this.parseCommands(rememberAllCommands, parsedArgs);

		} else if(optionsHaveSeparateCommandHandler) {

			this.parseCommands.callSeparateCommandHandler(
				this.usableOptions,
				this.parseCommands.makeState(parsedArgs),
				rememberAllCommands
			);

		}

		return parsedArgs
		
	}

	//abstract methods

	checkDemand(demandType, parsedArgs){}
	parseFlags(argsList, parsedArgs, rememberAllFlags, rememberCommands){}
	parseCommands(rememberCommands, parsedArgs){}

}

module.exports = fargv;