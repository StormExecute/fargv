const isObject = require("../../../dependencies/isObject");

const defaultOptions = require("../../data/_options");

/*

	Format: {
		
		flagsToCall: array | string,
		concatFlagsToCall: boolean(default = true)
		
		exit: boolean,
		
		showForSpecificCommand: boolean,
		showForSpecificFlag: boolean,

		showExamples: boolean | "commands" | "flags",
		showExamplesForSpecific: boolean | "commands" | "flags",
		
		commands: {
			
			...command: {

				a | alias | aliases: array | string,
				desc: string,
				usage: string,
				flags: array | string,
				examples: array | string,
				
			},
			
		},
		
		flags: {
			
			...option: {
			
				desc: string,
				required: boolean | string,
				deprecated: boolean | string,
				empty: boolean,
				type: "string" | "number" | "array" | "object" | "bigint" | "boolean",
				default: any,
				a | alias | aliases: array | string,
				examples: array | string,
				
			},
			
		}
		
	}

*/

const staticIntegrateHelp = function(objectOfHelp, redefine) {
	
	if(!isObject(objectOfHelp)) return this;
	
	this.createOptions();

	if(objectOfHelp == "reset" || redefine) {

		this._options.help = null;

		if(objectOfHelp == "reset") return this;

	}
	
	if(!isObject(this._options.help)) {
		
		this._options.help = Object.assign({}, defaultOptions.help, {status: true});
		
	}
	
	if(Array.isArray(objectOfHelp.flagsToCall) || typeof objectOfHelp.flagsToCall == "string") {

		const flagsToCall = typeof objectOfHelp.flagsToCall != "string" ? [] : [objectOfHelp.flagsToCall];

		if(!flagsToCall.length) {

			for (let i = 0; i < objectOfHelp.flagsToCall.length; ++i) {

				//push only strings
				if(typeof objectOfHelp.flagsToCall[i] == "string") {

					flagsToCall.push(objectOfHelp.flagsToCall[i]);

				}

			}

		}

		if(!Array.isArray(this._options.help.flagsToCall)) this._options.help.flagsToCall = [];

		if(objectOfHelp["concatFlagsToCall"] === false && this._options.help.flagsToCall.length) {

			this._options.help.flagsToCall = [];

		}

		for (let i = 0; i < flagsToCall.length; ++i) {

			this._options.help.flagsToCall.push(flagsToCall[i]);

		}

	}

	if(typeof objectOfHelp.mainUsage == "string") this._options.help.mainUsage = objectOfHelp.mainUsage;
	if(typeof objectOfHelp.mainDesc == "string") this._options.help.mainDesc = objectOfHelp.mainDesc;
	if(typeof objectOfHelp.mainCustomEndText == "string") this._options.help.mainCustomEndText = objectOfHelp.mainCustomEndText;

	if(objectOfHelp.hasOwnProperty("exit")) this._options.help.exit = !!objectOfHelp.exit;
	
	if(objectOfHelp.hasOwnProperty("showForSpecificCommand")) this._options.help.showForSpecificCommand = !!objectOfHelp.showForSpecificCommand;
	if(objectOfHelp.hasOwnProperty("showForSpecificFlag")) this._options.help.showForSpecificFlag = !!objectOfHelp.showForSpecificFlag;
	
	if(objectOfHelp.hasOwnProperty("showExamples")) {

		if(objectOfHelp.showExamples == "commands" || objectOfHelp.showExamples == "flags") {

			this._options.help.showExamples = objectOfHelp.showExamples;

		} else {

			this._options.help.showExamples = !!objectOfHelp.showExamples;

		}

	}

	if(objectOfHelp.hasOwnProperty("showExamplesForSpecific")) {

		if(objectOfHelp.showExamplesForSpecific == "commands" || objectOfHelp.showExamplesForSpecific == "flags") {

			this._options.help.showExamplesForSpecific = objectOfHelp.showExamplesForSpecific;

		} else {

			this._options.help.showExamplesForSpecific = !!objectOfHelp.showExamplesForSpecific;

		}

	}
	
	if(isObject(objectOfHelp.flags)) {
		
		for(const flagName in objectOfHelp.flags) {

			//this.option copies the value itself
			const flagValue = objectOfHelp.flags[flagName];
			
			//to no double parse alias && default
			this.optionFlag(flagName, flagValue);
			
		}
		
	}
	
	if(isObject(objectOfHelp.commands)) {
		
		for(const commandName in objectOfHelp.commands) {
			
			const commandValue = objectOfHelp.commands[commandName];
			
			this.optionCommand(commandName, commandValue);
			
		}
		
	}
	
	return this;
	
};

module.exports = staticIntegrateHelp;