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

		warns: null | Array<...string,>,

		flags: Object<...any,>,
		commands: Array<...string,>

*/

class fargv {
	
	constructor(options) {
		
		this.usableOptions = parseOptions(options);
		
		const argsList = Array.isArray(this.usableOptions.customArgv) ? copyV(this.usableOptions.customArgv) : process.argv.slice(2);

		const parsedArgs = {
			
			//_: {},

			warns: null,

			flags: {},
			commands: [],
			
		};

		const returnFilter = typeof this.usableOptions.returnFilter == "string" ?
			[this.usableOptions.returnFilter] : this.usableOptions.returnFilter === null
				? null : [];

		if(returnFilter && !returnFilter.length) {

			for (let i = 0; i < this.usableOptions.returnFilter.length; ++i) {

				returnFilter.push(this.usableOptions.returnFilter[i]);

			}

		}

		if(
			!this.usableOptions.customArgv
			&&
			(this.usableOptions.rememberExecNodePath || this.usableOptions.rememberExecFilePath || this.usableOptions.rememberExecFileBasename)
			&&
			(
				!returnFilter
				||
				~returnFilter.indexOf("_")
			)
		) {

			parsedArgs._ = {};

			if(this.usableOptions.rememberExecNodePath) parsedArgs["_"].execNodePath = process.argv[0];
			if(this.usableOptions.rememberExecFilePath) parsedArgs["_"].execFilePath = process.argv[1];
			if(this.usableOptions.rememberExecFileBasename) parsedArgs["_"].execFileBasename = nodePath.basename(process.argv[1]);

		}

		const optionsHaveCommands = Array.isArray(this.usableOptions.commands);
		const optionsHaveSeparateCommandHandler = typeof this.usableOptions.separateCommandHandler == "function";

		const rememberAllFlags = {};
		const rememberAllCommands = [];
		
		//rememberAllFlags && rememberAllCommands can change
		/*parsedArgs = */this.parseFlags(argsList, parsedArgs, rememberAllFlags, rememberAllCommands);
		
		if(Array.isArray(this.usableOptions.demandWithSkippedFlags)) {
			
			this.checkDemand("demandWithSkippedFlags", rememberAllFlags);
			
		}
		
		if(Array.isArray(this.usableOptions.demandFlags)) {
			
			this.checkDemand("demandFlags", parsedArgs.flags);
			
		}
		
		if(isObject(this.usableOptions.defaultArgv)) {
			
			for(const defaultArgName in this.usableOptions.defaultArgv) {

				const [defaultValue, aliases] = copyV(this.usableOptions.defaultArgv[defaultArgName]);
				
				let findAliasStatus = false;
				
				//we must delete aliases anyway
				for(let i = 0; i < aliases.length; i++) {
					
					if(findAliasStatus) {
						
						delete parsedArgs.flags[aliases[i]];
						
						continue;
						
					}
					
					if(typeof parsedArgs.flags[aliases[i]] != "undefined") {
						
						findAliasStatus = true;
						
						if(typeof parsedArgs.flags[defaultArgName] == "undefined") {

							parsedArgs.flags[defaultArgName] = copyV(parsedArgs.flags[aliases[i]]);

						}
						
						delete parsedArgs.flags[aliases[i]];
						
					}
					
				}
				
				if(!findAliasStatus && typeof parsedArgs.flags[defaultArgName] == "undefined") {

					parsedArgs.flags[defaultArgName] = defaultValue;

				}
				
			}
			
		}
		
		if(
			this.usableOptions.rememberWarns
			&&
			Array.isArray(this.errors)  && this.errors.length
			&&
			(
				!returnFilter
				||
				~returnFilter.indexOf("warns")
			)
		) {

			parsedArgs.warns = [];

			for (let i = 0; i < this.errors.length; ++i) {

				parsedArgs.warns.push(this.errors[i]);

			}
			
		}
		
		if(optionsHaveCommands && rememberAllCommands.length) {

			this.parseCommands(rememberAllCommands, parsedArgs.flags);

		} else if(optionsHaveSeparateCommandHandler) {

			this.parseCommands.callSeparateCommandHandler(
				this.usableOptions,
				this.parseCommands.makeState(parsedArgs),
				rememberAllCommands
			);

		}

		if(
			!returnFilter
			||
			~returnFilter.indexOf("commands")
		) {

			for (let i = 0; i < rememberAllCommands.length; ++i) {

				parsedArgs.commands.push(rememberAllCommands[i]);

			}

		}

		if(!returnFilter) {

			return parsedArgs;

		} else if(returnFilter.length == 1) {

			if(!parsedArgs[returnFilter[0]]) return {};

			//return it on top-level

			return parsedArgs[returnFilter[0]];

		} else {

			const returnArgs = {};

			for (let i = 0; i < returnFilter.length; ++i) {

				if(parsedArgs.hasOwnProperty(returnFilter[i])) {

					returnArgs[returnFilter[i]] = copyV(parsedArgs[returnFilter[i]]);

				}

			}

			return returnArgs;

		}
		
	}

	//abstract methods

	checkDemand(demandType, parsedArgs){}
	parseFlags(argsList, parsedArgs, rememberAllFlags, rememberCommands){}
	parseCommands(rememberCommands, parsedArgs){}

}

module.exports = fargv;