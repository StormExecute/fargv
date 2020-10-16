/*

	help: plainObject = {

		flagsToCall: Array<...string,>,

		status: boolean,

		showForSpecificCommand: boolean,
		showForSpecificFlag: boolean,

		showExamples && showExamplesForSpecific: boolean | "commands" | "flags",

		exit: boolean,

		commands: plainObject = {

			...[commandName]: plainObject = {

				a | alias | aliases: array | string,
				desc: string,
				usage: string,
				flags: array | string,
				examples: array | string,

			},

		},

		flags: plainObject = {

			...[flagName]: plainObject = {

				desc: string,
				required: boolean | string,
				deprecated: boolean | string,
				empty: boolean,
				type: "string" | "number" | "array" | "object" | "bigint" | "boolean",
				default: any,
				a | alias | aliases: array | string,
				examples: array | string,

			},

		},

	},

	commands: array = [

		...Array < command<string>, handler<function>, aliases: array<...string,> >,

	],
	separateCommandHandler: void (user) function(state, nextCommands || ...nextCommands),

	callAppropriateCommandHandlerOnlyOnce: boolean,
	alwaysCallSeparateCommandHanler: boolean,
	nextCommandsAsArray: boolean,

	customArgv: array = [

		...Array < flagName<string>, flagValue<string> >,

	],

	defaultArgv: plainObject = {
,
		...[name]: Array < value<any>, aliases: array<...string,> >,

	},

	demandWithSkippedFlags && demandFlags &&
	excludeFlags && noParseFlags && noParseNoDefaultFlags:

		Array<...string,>,

	returnFilter: string | Array<...string,>,

	rememberExecNodePath && rememberExecFilePath && rememberExecFileBasename &&
	rememberWarns && showWarns:

		boolean,

	parseWarn: void (user) function({ mainMessage, debugDetails, code, fullMessage }),

	throwInsteadWarns && includeEmptyFlags &&
	unlimitedFlagDefinitionCharacters &&
	supportOnlyLatinArgs && allowSpacesAsValues &&
	useDnvForFirstSpaceOP && noParse && noParseNoDefault &&
	allParse:

		boolean,

	mainParse: plainObject = {

		defaultNoneValue: any(default: null),

		...[others]: boolean,

	},

	arrayParse: {

		maxRecursiveCalls: number,

		defaultNoneValue: any(default: null),

		...[others]: boolean,

	},

	objectParse: {

		ifDuplicateKey: {

			rewrite: boolean(default: true),

			warn: boolean(default: true)

		},

		maxRecursiveCalls: number,

		defaultNoneValue: any(default: null),

		...[others]: boolean,

	},

*/

module.exports = {

	help: {

		flagsToCall: ["h", "help"],

		status: false,

		showForSpecificCommand: true,
		showForSpecificFlag: true,

		showExamples: true,

		showExamplesForSpecific: true,

		exit: true,

		commands: null,
		flags: null,

	},

	commands: null,
	separateCommandHandler: null,

	callAppropriateCommandHandlerOnlyOnce: true,
	alwaysCallSeparateCommandHanler: false,
	
	//else spread format
	nextCommandsAsArray: false,

	customArgv: null,
	defaultArgv: null,
	
	demandWithSkippedFlags: null,
	demandFlags: null,
	
	excludeFlags: null,
	noParseFlags: null,
	noParseNoDefaultFlags: null,

	returnFilter: null,
	
	rememberExecNodePath: false,
	rememberExecFilePath: true,
	rememberExecFileBasename: true,
	
	rememberWarns: false,
	
	showWarns: true,
	parseWarn: null, //function(warn)
	
	//for demandFlags always true
	throwInsteadWarns: false,
	
	includeEmptyFlags: true,
	unlimitedFlagDefinitionCharacters: true,
	
	supportOnlyLatinArgs: true,
	
	allowSpacesAsValues: true,
	
	//useDefaultNoneValueForFirstSpaceInObjectProp
	useDnvForFirstSpaceOP: true,
	
	noParse: false,
	noParseNoDefault: false,
	allParse: false,
	
	mainParse: {
		
		defaultNoneValue: null,
		
		allTypes: false,
		
		mainTypes: false,
		minorTypes: false,

		numericSeparator: false,
		
		"number": true,
		
		"bigint": false,
		
		"boolean": false,
		"array": false,
		"object": false,
		
		"null": false,
		"undefined": false,
		"NaN": false,
		"Infinity": false,
		
	},
	
	arrayParse: {
		
		maxRecursiveCalls: 10,
		
		defaultNoneValue: null,
		
		allTypes: false,
		
		mainTypes: false,
		minorTypes: false,

		numericSeparator: false,
		
		"number": true,
		
		"bigint": false,
		
		"boolean": true,
		
		"array": false,
		"object": false,
		
		"null": true,
		"undefined": true,
		"NaN": false,
		"Infinity": false,
		
	},
	
	objectParse: {
		
		ifDuplicateKey: {
			
			rewrite: true,
			
			warn: true
			
		},
		
		maxRecursiveCalls: 10,
		
		defaultNoneValue: null,
		
		allTypes: false,
		
		mainTypes: false,
		minorTypes: false,

		numericSeparator: false,
		
		"number": true,
		
		"bigint": false,
		
		"boolean": true,
		
		"array": false,
		"object": false,
		
		"null": true,
		"undefined": true,
		"NaN": false,
		"Infinity": false,
		
	},
	
};