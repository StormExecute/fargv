type anyObjectT = { [key: string]: any };

type commandHandlerOne = (state: fargvReturns, nextCommands: string[]) => void;
type commandHandlerTwo = (state: fargvReturns, ...nextCommands: string[]) => void;
type commandHandlerT = commandHandlerOne | commandHandlerTwo;

interface fargvReturns {

	_?: {

		execNodePath?: string,
		execFilePath?: string,
		execFileBasename?: string,

	},

	warns: null | string[],

	flags: {

		[key: string]: any,

	},

	commands: string[],

}


interface mainParse {

	defaultNoneValue?: any,

	allTypes?: boolean,

	mainTypes?: boolean,
	minorTypes?: boolean,

	numericSeparator?: boolean,

	number?: boolean,

	bigint?: boolean,

	boolean?: boolean,
	array?: boolean,
	object?: boolean,

	null?: boolean,
	undefined?: boolean,
	NaN?: boolean,
	Infinity?: boolean,

}

interface fargvOptions extends mainParse {

	help?: {

		flagsToCall?: string[],

		status?: boolean,

		mainUsage?: string,
		mainDesc?: string,

		mainCustomEndText?: string,

		showMainCommands?: boolean,
		showMainFlags?: boolean,

		showForSpecificCommand?: boolean,
		showForSpecificFlag?: boolean,

		showExamples?: boolean | "commands" | "flags",
		showExamplesForSpecific?: boolean | "commands" | "flags",

		exit?: boolean,

		commands?: {

			[key: string]: {

				alias?: Array<string> | string,

				desc?: string,
				usage?: string,
				flags?: Array<string> | string,
				examples?: Array<string> | string,

			},

		},

		flags?: {

			[key: string]: {

				desc?: string,
				required?: boolean | string,
				deprecated?: boolean | string,
				empty?: boolean,
				type?: "string" | "number" | "array" | "object" | "bigint" | "boolean",
				alias?: Array<string> | string,
				examples?: Array<string> | string,

			}

		},

	},

	//commandName, handler, aliases
	commands?: ([string, commandHandlerT, string[]])[],

	separateCommandHandler?: commandHandlerT,

	callAppropriateCommandHandlerOnlyOnce?: boolean,
	alwaysCallSeparateCommandHanler?: boolean,
	nextCommandsAsArray?: boolean,

	customArgv?: string[],

	defaultArgv?: {

		//value, aliases
		[key: string]: [any, string[]]

	},

	demandWithSkippedFlags?: string[],
	demandFlags?: string[],

	excludeFlags?: string[],

	noParseFlags?: string[],
	noParseNoDefaultFlags?: string[],

	returnFilter?: string | string[],

	rememberExecNodePath?: boolean,
	rememberExecFilePath?: boolean,
	rememberExecFileBasename?: boolean,

	rememberWarns?: boolean,
	showWarns?: boolean,

	parseWarn?: ({}: { mainMessage: string, debugDetails: { [key: string]: any }, code: number, fullMessage: string }) => void,

	throwInsteadWarns?: boolean,

	includeEmptyFlags?: boolean,
	unlimitedFlagDefinitionCharacters?: boolean,
	supportOnlyLatinArgs?: boolean,

	defaultCommaSplitSym?: string,
	allowSpacesAsValues?: boolean,
	useDnvForFirstSpaceOP?: boolean,

	noParse?: boolean,
	noParseNoDefault?: boolean,
	allParse?: boolean,

	mainParse?: mainParse,

	arrayParse?: {

		maxRecursiveCalls?: number,

	} & mainParse,

	objectParse?: {

		ifDuplicateKey?: {
			rewrite?: boolean,
			warn?: boolean,
		},

		maxRecursiveCalls?: number,

	} & mainParse,

}

interface commandHelpConfigI {

	a?: Array<string> | string,
	aliases?: Array<string> | string,
	alias?: Array<string> | string,

	desc?: string,
	usage?: string,
	flags?: Array<string> | string,
	examples?: Array<string> | string,

}

interface optionConfigI {

	desc?: string,
	required?: boolean | string,
	deprecated?: boolean | string,
	empty?: boolean,
	type?: "string" | "number" | "array" | "object" | "bigint" | "boolean",
	a?: Array<string> | string,
	aliases?: Array<string> | string,
	alias?: Array<string> | string,
	examples?: Array<string> | string,

}

interface staticIntegrateHelp {

	flagsToCall: string[] | string,
	concatFlagsToCall: true | boolean,

	mainUsage: string,
	mainDesc: string,

	mainCustomEndText: string,

	showMainCommands: boolean,
	showMainFlags: boolean,

	showForSpecificCommand: boolean,
	showForSpecificFlag: boolean,

	showExamples: boolean | "commands" | "flags",
	showExamplesForSpecific: boolean | "commands" | "flags",

	exit: boolean,

	commands: commandHelpConfigI,
	flags: optionConfigI,

}

type staticSetDefaultArgv = "reset" | {

	[key: string] : any | {

		_options: {

			v?: any,
			value?: any,
			argValue?: any,

			a?: Array<string> | string,
			aliases?: Array<string> | string,
			alias?: Array<string> | string,

		}

	} | ["$fargvSetDefault", any, string | string[]]

};

type staticSetCustomArgv = string[][];

interface staticSetRemember {

	file?: boolean,
	fileName?: boolean,
	execFileBasename?: boolean,
	filePath?: boolean,
	execFilePath?: boolean,
	node?: boolean,
	nodePath?: boolean,
	execNodePath?: boolean,

}

interface staticSetWarns {

	remember?: boolean,
	show?: boolean,
	throw?: boolean,
	throwInsteadWarns?: boolean,
	parser: Function,

}

interface generateElementStructure {

	name?: string,
	argName?: string,
	n?: string,

	value?: any,
	argValue?: any,
	v?: any,

	flag?: number,
	f?: number,
	flagDC?: number,

	pre?: (res: string) => string,
	p?: (res: string) => string,
	prePush?: (res: string) => string,

	wes?: boolean,
	withoutES?: boolean,
	withoutEqualSym?: boolean,

}

interface generate_OptionsStructure {

	useSpacesAsDelimiters: boolean | {
		array?: boolean,
		object?: boolean,
	}

}

interface generateOptionsStructure {

	_options: generate_OptionsStructure

}

type generateElementOrOptions = generateElementStructure | generateOptionsStructure;

interface generateFromObjectElementStructure {

	[key: string]: any

}

interface generateFrom_ObjectOptionsStructure {

	_options: generate_OptionsStructure & {

		_more: {

			_throwInsteadWarns: false | boolean,

			before: {
				[key: string]: generate_OptionsStructure
			},

			after: {
				[key: string]: generate_OptionsStructure
			}

		}

	}

}

type generateFromObjectOptionsStructure = generateFrom_ObjectOptionsStructure & {

	[key: string]: {

		flag?: number,
		f?: number,
		flagDC?: number,

		pre?: (res: string) => string,
		p?: (res: string) => string,
		prePush?: (res: string) => string,

		wes?: boolean,
		withoutES?: boolean,
		withoutEqualSym?: boolean,

	}

}

//

declare namespace fargv {}

declare const fargv: {

	(options: ["useConfigsFromFile", string] | fargvOptions, mergingWithFargvWrapperOptions?: boolean | undefined): fargvReturns;

	options(options: fargvOptions | "reset", redefine?: any): typeof fargv;
	createOptions(): typeof fargv;

	reset(option: string): typeof fargv;
	resetAll(): typeof fargv;

	command(command: "reset" | Function | string | string[], handler: commandHandlerT, help?: commandHelpConfigI): typeof fargv;
	separateCommand(handler: Function, alwaysCallSeparateCommandHanler?: boolean): typeof fargv;

	optionFlag(optionName: string, optionConfig: optionConfigI): typeof fargv;
	optionCommand(commandName: string, commandHelpConfig: commandHelpConfigI): typeof fargv;
	optionVersion(version: string, noExit?: boolean, optionConfig?: optionConfigI): typeof fargv;

	help(objectOfHelp: staticIntegrateHelp | "reset"): typeof fargv;

	default(objectOfValues: staticSetDefaultArgv, redefine?: any): typeof fargv;

	custom(customArgv: staticSetCustomArgv): typeof fargv;
	customWithGenerate(...args): typeof fargv;
	customWithGenerateFromObject(...args): typeof fargv;

	demand(args: "reset" | string | string[], withSkipArgs?: boolean): typeof fargv;
	undemand(args: string | string[], withSkipArgs?: boolean): typeof fargv;

	exclude(excludeFlags: "reset" | string | string[], redefine?: any): typeof fargv;

	noParse(state: boolean, isNoParseNoDefault?: boolean): typeof fargv;
	noParseFlags(noParseFlags: "reset" | string | string[], isNoParseNoDefaultFlags?: boolean): typeof fargv;

	allParse(allParseState: boolean): typeof fargv;

	returnFilter(newReturnFilterValue: string | string[]): typeof fargv;

	remember(rememberState: staticSetRemember): typeof fargv;

	warns(optionsState: staticSetWarns): typeof fargv;

	arrayParse(arrayParse: "reset" | {}, redefine: any): typeof fargv;
	objectParse(objectParse: "reset" | {}, redefine: any): typeof fargv;

	state(about: string): string | fargvOptions;

	fromArray(sourceArray: any[], useSpacesAsDelimiters: boolean): string;
	fromObject(sourceObject: anyObjectT, useSpacesAsDelimiters: boolean): string;

	toArray(sourceString: string, mergingOptions: anyObjectT): any[];
	toObject(sourceString: string, mergingOptions: anyObjectT): anyObjectT;

	strIsArray(sourceString: string, mergingOptions: anyObjectT): boolean;
	strIsObject(sourceString: string, mergingOptions: anyObjectT): boolean;

	strIsStrictArray(sourceString: string, mergingOptions: anyObjectT): boolean;
	strIsStrictObject(sourceString: string, mergingOptions: anyObjectT): boolean;

	generate(argName: generateElementOrOptions, argValue: generateElementOrOptions, ...args: generateElementOrOptions[]): string;
	generate(argName: generateElementOrOptions, argValue: generateElementOrOptions): string;
	generate(argValue: generateElementOrOptions): string;
	generate(argValue: Array<generateElementOrOptions>): string;
	generate(argName: string, argValue: any, options: generateOptionsStructure | generate_OptionsStructure): string;
	generate(argName: string, argValue: any): string;

	generateFromObject(objectOfValues: generateFromObjectElementStructure, objectOfConfigs?: generateFromObjectOptionsStructure): string;
	generateFromObject(getParsedArgs: true, objectOfValues: generateFromObjectElementStructure, objectOfConfigs?: generateFromObjectOptionsStructure): Array<generateElementOrOptions>;

	init(options: fargvOptions, mergingWithFargvWrapperOptions?: boolean | undefined): fargvReturns;
	initF(options: fargvOptions, mergingWithFargvWrapperOptions?: boolean | undefined): fargvReturns;
	initC(options: fargvOptions, mergingWithFargvWrapperOptions?: boolean | undefined): fargvReturns;
	initFC(options: fargvOptions, mergingWithFargvWrapperOptions?: boolean | undefined): fargvReturns;
	initCF(options: fargvOptions, mergingWithFargvWrapperOptions?: boolean | undefined): fargvReturns;

}

export = fargv;