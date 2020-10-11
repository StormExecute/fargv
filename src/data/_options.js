/*

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