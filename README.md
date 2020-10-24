# fargv (fast-argv) [![NPM version][npm-image]][npm-url]

Multi-customizable parser of process.argv for nodejs.

# Description

*Fargv* is a flag and command parser with the ability to configure options that tell *fargv* exactly how to handle a particular flag or command.

*Fargv* also provides processing of constructs such as objects and arrays using a special syntax that is very similar to javascript.

*Fargv* is sensitive to passed arguments and by default supports only the passed Latin alphabet, and ***the flags themselves must be passed using an equal sign***.

If the first described situation can be expanded, ***then nothing can be done for the second, since this is the principle of correct operation of fargv.***

*Fargv* has its own flag generator, which makes it easy to pass complex constructs between processes.

In General, *Fargv* can be a good option if you really need to configure argv parsing.

# Changelog

[HERE!](https://github.com/StormExecute/fargv/blob/master/CHANGELOG.md)

# Table of Contents

* [Install](#install)
* [Usage](#usage)
* [API](#api)
    * [fargv](#apiFargv)
    * [fargvReturns interface](#apiFargvReturns)
    * [Description of fargvReturns](#apiFargvReturnsDesc)
        * [_](#apiFargvReturns_)
            * [_.execNodePath](#apiFargvReturns_execNodePath)
            * [_.execFilePath](#apiFargvReturns_execFilePath)
            * [_.execFileBasename](#apiFargvReturns_execFileBasename)
        * [warns](#apiFargvReturnsWarns)
        * [flags](#apiFargvReturnsFlags)
        * [commands](#apiFargvReturnsCommands)
    * [fargvOptions interface](#apiFargvOptions)
    * [Description of options](#descOfOptions)
        * [help](#descOfOptionsHelp)
            * [flagsToCall](#descOfOptionsHelpFlagsToCall)
            * [status](#descOfOptionsHelpStatus)
            * [mainUsage](#descOfOptionsHelpMainUsage)
            * [mainDesc](#descOfOptionsHelpMainDesc)
            * [mainCustomEndText](#descOfOptionsHelpMainCustomEndText)
            * [showMainCommands](#descOfOptionsHelpShowMainCommands)
            * [showMainFlags](#descOfOptionsHelpShowMainFlags)
            * [showForSpecificCommand](#descOfOptionsHelpShowForSpecificCommand)
            * [showForSpecificFlag](#descOfOptionsHelpShowForSpecificFlag)
            * [showExamples](#descOfOptionsHelpShowExamples)
            * [showExamplesForSpecific](#descOfOptionsHelpShowExamplesForSpecific)
            * [exit](#descOfOptionsHelpExit)
            * [commands](#descOfOptionsHelpCommands)
                * [commands.command.alias](#descOfOptionsHelpCommandsAlias)
                * [commands.command.desc](#descOfOptionsHelpCommandsDesc)
                * [commands.command.usage](#descOfOptionsHelpCommandsUsage)
                * [commands.command.flags](#descOfOptionsHelpCommandsFlags)
                * [commands.command.examples](#descOfOptionsHelpCommandsExamples)
            * [flags](#descOfOptionsHelpFlags)
                * [flags.flag.desc](#descOfOptionsHelpFlagsDesc)
                * [flags.flag.required](#descOfOptionsHelpFlagsRequired)
                * [flags.flag.deprecated](#descOfOptionsHelpFlagsDeprecated)
                * [flags.flag.empty](#descOfOptionsHelpFlagsEmpty)
                * [flags.flag.type](#descOfOptionsHelpFlagsType)
                * [flags.flag.alias](#descOfOptionsHelpFlagsAlias)
                * [flags.flag.examples](#descOfOptionsHelpFlagsExamples)
        * [commands](#descOfOptionsCommands)
        * [separateCommandHandler](#descOfOptionsSeparateCommandHandler)
        * [callAppropriateCommandHandlerOnlyOnce](#descOfOptionsCallCommandHandlerOnlyOnce)
        * [alwaysCallSeparateCommandHanler](#descOfOptionsAlwaysCallSCH)
        * [nextCommandsAsArray](#descOfOptionsNextCommandsAsArray)
        * [customArgv](#descOfOptionsCustomArgv)
        * [defaultArgv](#descOfOptionsDefaultArgv)
        * [demandWithSkippedFlags](#descOfOptionsDemandWSF)
        * [demandFlags](#descOfOptionsDemandF)
        * [excludeFlags](#descOfOptionsExcludeFlags)
        * [noParseFlags](#descOfOptionsNoParseFlags)
        * [noParseNoDefaultFlags](#descOfOptionsNoParseNoDefaultFlags)
        * [returnFilter](#descOfOptionsReturnFilter)
        * [rememberExecNodePath](#descOfOptionsRememberExecNodePath)
        * [rememberExecFilePath](#descOfOptionsRememberExecFilePath)
        * [rememberExecFileBasename](#descOfOptionsRememberExecFileBasename)
        * [rememberWarns](#descOfOptionsRememberWarns)
        * [showWarns](#descOfOptionsShowWarns)
        * [parseWarn](#descOfOptionsParseWarn)
        * [throwInsteadWarns](#descOfOptionsThrowInsteadWarns)
        * [includeEmptyFlags](#descOfOptionsIncludeEmptyFlags)
        * [unlimitedFlagDefinitionCharacters](#descOfOptionsUFDC)
        * [supportOnlyLatinArgs](#descOfOptionsSupportOnlyLatinArgs)
        * [defaultCommaSplitSym](#descOfOptionsDefaultCommaSplitSym)
        * [allowSpacesAsValues](#descOfOptionsAllowSpacesAsValues)
        * [useDnvForFirstSpaceOP](#descOfOptionsUDFFSOP)
        * [noParse](#descOfOptionsNoParse)
        * [noParseNoDefault](#descOfOptionsNoParseNoDefault)
        * [allParse](#descOfOptionsAllParse)
        * [mainParse.defaultNoneValue](#descOfOptionsDefaultNoneValue)
        * [mainParse.allTypes](#descOfOptionsAllTypes)
        * [mainParse.mainTypes](#descOfOptionsMainTypes)
        * [mainParse.minorTypes](#descOfOptionsMinorTypes)
        * [mainParse.numericSeparator](#descOfOptionsNumericSeparator)
        * [mainParse.number](#descOfOptionsNumber)
        * [mainParse.bigint](#descOfOptionsBigInt)
        * [mainParse.boolean](#descOfOptionsBoolean)
        * [mainParse.array](#descOfOptionsArray)
        * [mainParse.object](#descOfOptionsObject)
        * [mainParse.null](#descOfOptionsNull)
        * [mainParse.undefined](#descOfOptionsUndefined)
        * [mainParse.NaN](#descOfOptionsNaN)
        * [mainParse.Infinity](#descOfOptionsInfinity)
        * [arrayParse](#descOfOptionsArrayParse)
        * [objectParse](#descOfOptionsObjectParse)
    * [Static methods](#staticMethods)
        * [options](#staticMethodsOptions)
        * [createOptions](#staticMethodsCreateOptions)
        * [reset](#staticMethodsReset)
        * [resetAll](#staticMethodsResetAll)
        * [command](#staticMethodsCommand)
        * [separateCommand](#staticMethodsSeparateCommand)
        * [optionFlag](#staticMethodsOptionFlag)
        * [optionCommand](#staticMethodsOptionCommand)
        * [help](#staticMethodsHelp)
        * [default](#staticMethodsDefault)
        * [custom](#staticMethodsCustom)
        * [customWithGenerate](#staticMethodsCustomWithGenerate)
        * [customWithGenerateFromObject](#staticMethodsCustomWithGenerateFromObject)
        * [demand](#staticMethodsDemand)
        * [undemand](#staticMethodsUndemand)
        * [exclude](#staticMethodsExclude)
        * [noParse](#staticMethodsNoParse)
        * [noParseFlags](#staticMethodsNoParseFlags)
        * [allParse](#staticMethodsAllParse)
        * [returnFilter](#staticMethodsReturnFilter)
        * [remember](#staticMethodsRemember)
        * [warns](#staticMethodsWarns)
        * [arrayParse](#staticMethodsArrayParse)
        * [objectParse](#staticMethodsObjectParse)
        * [state](#staticMethodsState)
        * [fromArray](#staticMethodsFromArray)
        * [fromObject](#staticMethodsFromObject)
        * [toArray](#staticMethodsToArray)
        * [toObject](#staticMethodsToObject)
        * [strIsArray](#staticMethodsStrIsArray)
        * [strIsObject](#staticMethodsStrIsObject)
        * [strIsStrictArray](#staticMethodsStrIsStrictArray)
        * [strIsStrictObject](#staticMethodsStrIsStrictObject)
        * [generate](#staticMethodsGenerate)
        * [generateFromObject](#staticMethodsGenerateFromObject)
        * [init](#staticMethodsInit)
* [Contacts](#contacts)

<a name="install"></a>
# Install

```bash
$ npm install fargv
```

<a name="usage"></a>
# Usage

### Example WITHOUT using static methods:

```javascript

const fargv = require("fargv");

const argv = fargv({
	returnFilter: "flags",
	defaultNoneValue: "someDefault",
	noParseFlags: ["cc"],
	numericSeparator: true,
	boolean: true,
	minorTypes: true,
});

console.log(argv);

```

```bash

$ node ./withoutStaticMethods.js ---a=true --b=2_000_000 -cc=1_000_000 -d=NaN -e
{ a: true, b: 2000000, cc: '1_000_000', d: NaN, e: 'someDefault' }

```

### Example WITH using static methods:

```javascript

const fargv = require("fargv");

const { flags } = fargv
	.options({ defaultNoneValue: "someDefault" })
	.noParseFlags("c")
	.options({ minorTypes: true, array: true })
	.arrayParse({ bigint: true })
	.init()

console.log(flags);

```

```bash

$ node ./withStaticMethods.js -a=NaN -b -cc="[1n, 2_000n]" --d=1n
{ a: NaN, b: 'someDefault', cc: [ 1n, '2_000n' ], d: '1n' }

```

<a name="api"></a>
# API

<a name="apiFargv"></a>
### fargv(options: {} | array<string, string>, mergingWithFargvWrapperOptions: boolean | undefined)

Returns an `object` with the following interface:

<a name="apiFargvReturns"></a>
```typescript

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

```

<a name="apiFargvReturnsDesc"></a>
## Description of fargvReturns

<a name="apiFargvReturns_"></a>
### _
An additional object that remembers some paths and names based on the first 2 "system" arguments.

<a name="apiFargvReturns_execNodePath"></a>
### _.execNodePath
Path to node js.

<a name="apiFargvReturns_execFilePath"></a>
### _.execFilePath
Path to the executable file.

<a name="apiFargvReturns_execFileBasename"></a>
### _.execFileBasename
Executable file name.

<a name="apiFargvReturnsWarns"></a>
### warns
If there are no errors and the "rememberWarns" parameter is not set - null. Otherwise, it is a string array of warnings that occur during parsing.

<a name="apiFargvReturnsFlags"></a>
### flags
A flag object, where the name of the property is the flag name, and its value is the possibly parsed flag value.

<a name="apiFargvReturnsCommands"></a>
### commands
String array of commands that were stored during parsing.

<a name="apiFargvOptions"></a>
## fargvOptions interface
If you need to pass options from .js or .json file - the following structure is used:

```typescript

type fargvOptionsFromFile = ["useConfigsFromFile", string]

```

Where the element at index 0 indicates that fargv really needs to process the incoming parameter as connecting a third-party configuration file. The second element is the path to the configuration file (we recommend using process.cwd with the path wrapper from the node.js).

The standard interface for options that are passed to fargv is as follows(fargvOptions):

```typescript

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

				alias?: array<string> | string,

				desc?: string,
				usage?: string,
				flags?: array<string> | string,
				examples?: array<string> | string,

			},

		},

		flags?: {

			[key: string]: {

				desc?: string,
				required?: boolean | string,
				deprecated?: boolean | string,
				empty?: boolean,
				type?: "string" | "number" | "array" | "object" | "bigint" | "boolean",
				alias?: array<string> | string,
				examples?: array<string> | string,

			}

		},

	},

	commands?: [

		//commandName, handler, aliases
		...array<string, Function, [...string]>

	],

	separateCommandHandler?: (state: fargvReturns, ...nextCommands: string[]) => void,

	callAppropriateCommandHandlerOnlyOnce?: boolean,
	alwaysCallSeparateCommandHanler?: boolean,
	nextCommandsAsArray?: boolean,

	customArgv?: string[],

	defaultArgv?: {

		//value, aliases
		[key: string]: array<any, string[]>

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

	parseWarn?: ({ mainMessage: string, debugDetails: { [string]: any }, code: number, fullMessage: string }) => void,

	throwInsteadWarns?: boolean,

	includeEmptyFlags?: boolean,
	unlimitedFlagDefinitionCharacters?: boolean,
	supportOnlyLatinArgs?: boolean,

	defaultCommaSplitSym: string,
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

```

<a name="descOfOptions"></a>
## Description of options

<a name="descOfOptionsHelp"></a>
### help
Required to display the help menu.

<a name="descOfOptionsHelpFlagsToCall"></a>
### help.flagsToCall
Array of flags that will display the help menu.

**Example**:

```javascript

fargv({
	help: {
		status: true,
		flagsToCall: ["h", "help", "HELP", "otherHelpAlias"]
	}
})

```

<a name="descOfOptionsHelpStatus"></a>
### help.status
Status that tells fargv whether to show the help menu.

<a name="descOfOptionsHelpMainUsage"></a>
### help.mainUsage
Text of the main **usage** section.

<a name="descOfOptionsHelpMainDesc"></a>
### help.mainDesc
Text of the main **description** section.

<a name="descOfOptionsHelpMainCustomEndText"></a>
### help.mainCustomEndText
Additional text that is displayed at the end. Can be used as a custom help menu.

<a name="descOfOptionsHelpShowMainCommands"></a>
### help.showMainCommands
Responsible for displaying help about **commands**.

<a name="descOfOptionsHelpShowMainFlags"></a>
### help.showMainFlags
Responsible for displaying help about **flags**.

<a name="descOfOptionsHelpShowForSpecificCommand"></a>
### help.showForSpecificCommand
Responsible for displaying help about a specific **command** that is passed to the only one.

<a name="descOfOptionsHelpShowForSpecificFlag"></a>
### help.showForSpecificFlag
Responsible for displaying help about a specific **flag** that is passed to the only one.

<a name="descOfOptionsHelpShowExamples"></a>
### help.showExamples
Responsible for displaying examples in the main section of the help menu. It can take the values "commands" and "flags" to display examples in these sections.

<a name="descOfOptionsHelpShowExamplesForSpecific"></a>
### help.showExamplesForSpecific
Responsible for showing examples for a specific flag or command in the help menu. It can take the values "commands" and "flags" to display examples in these sections.

<a name="descOfOptionsHelpExit"></a>
### help.exit
Answers - whether to end the process after displaying the help menu.

<a name="descOfOptionsHelpCommands"></a>
### help.commands
Object of **commands** that parameters will be read from when creating the help menu.

**Example**:

```javascript

fargv({
	help: {
		status: true,
		commands: {

			someCommand: {

				a: "aliasOfSomeCommand",
				desc: "some description of someCommand",
				usage: "someCommand [someOther]",
				flags: ["a", "b"],
				examples: ["someCommand someSubCommand", "someCommand someSecondSubCommand"]

			},

			someSecondCommand: {

				desc: "some description of someSecondCommand"

			}

		}
	}
})

```

<a name="descOfOptionsHelpCommandsAlias"></a>
### help.commands[command].alias
Array of aliases for this command. It can be a string that turns into an array during parsing.

<a name="descOfOptionsHelpCommandsDesc"></a>
### help.commands[command].desc
Text for the **description** section in this command.

<a name="descOfOptionsHelpCommandsUsage"></a>
### help.commands[command].usage
Text for the **usage** section in this command.

<a name="descOfOptionsHelpCommandsFlags"></a>
### help.commands[command].flags
Flags that this command is associated with and that will be shown next.

<a name="descOfOptionsHelpCommandsExamples"></a>
### help.commands[command].examples
An array of examples consisting of strings that will be shown in the examples section. Can be a string.

<a name="descOfOptionsHelpFlags"></a>
### help.flags
Object of **flags** that parameters will be read from when creating the help menu.

<a name="descOfOptionsHelpFlagsDesc"></a>
### help.flags[flag].desc
Text for the **description** section in this flag.

<a name="descOfOptionsHelpFlagsRequired"></a>
### help.flags[flag].required
If Boolean true - shows [required], if string - shows [required: text].

<a name="descOfOptionsHelpFlagsDeprecated"></a>
### help.flags[flag].deprecated
A string that shows text like this in the flags section: [deprecated: text].

<a name="descOfOptionsHelpFlagsEmpty"></a>
### help.flags[flag].empty
If true, it shows [must be empty], if false, it shows [must be with value], otherwise it doesn't show anything in the flags section.

<a name="descOfOptionsHelpFlagsType"></a>
### help.flags[flag].type
Shows the passed type in the flags section. Must be one of the following values: "string" | "number" | "array" | "object" | "bigint" | "boolean".

<a name="descOfOptionsHelpFlagsAlias"></a>
### help.flags[flag].alias
Array of aliases for this flag. It can be a string that turns into an array during parsing.

<a name="descOfOptionsHelpFlagsExamples"></a>
### help.flags[flag].examples
An array of examples consisting of strings that will be shown in the examples section. Can be a string.

descOfOptions
<a name="descOfOptionsCommands"></a>
### commands
An array of commands that should include arrays containing the command name, the command handler, and an array of command aliases.

**Example**:

```javascript

fargv({ 
	commands: [ 
		["commandName", function (){}, []],
		["secondCommand", state => {}, []]
	]
})

```

<a name="descOfOptionsSeparateCommandHandler"></a>
### separateCommandHandler
A separate handler for any commands that will be called if no other handlers were called or if the alwaysCallSeparateCommandHanler option is true.

<a name="descOfOptionsCallCommandHandlerOnlyOnce"></a>
### callAppropriateCommandHandlerOnlyOnce
If true, stops calling other possible command handlers. The default value is **true**.

<a name="descOfOptionsAlwaysCallSCH"></a>
### alwaysCallSeparateCommandHanler
If true, it calls separateCommandHandler in any case. By default, it is **false**.

<a name="descOfOptionsNextCommandsAsArray"></a>
### nextCommandsAsArray
If true, the second argument to the command handler will pass an array of the remaining commands. Otherwise, the spread format will work. By default, it is **false**.

<a name="descOfOptionsCustomArgv"></a>
### customArgv
An array of strings that can be used as an alternative parsing of your own arguments. Must accept syntax-correct arguments like equal-sign flags.

**Example**:

```javascript

fargv({
	customArgv: [
		"--flagName=flagValue",
		"--secondFlagName=secondFlagValue"
	]
})

```

<a name="descOfOptionsDefaultArgv"></a>
### defaultArgv
An object where the property name is a flag to which default values can be applied, and the property value is an array, where the first element is the default value itself, and the second is an array of aliases for this flag.

**Example**:

```javascript

fargv({
	defaultArgv: {
		someFlagName: ["someDefaultFlagValue", ["someFlagAlias"]]
	}
})

```

<a name="descOfOptionsDemandF"></a>
### demandFlags
An array of string flags which are required to be transferred in this process. If any of the flags are not present, regardless of the throwInsteadWarns option throws an exception of the type "required flags are missing".

**Example**:

```javascript

fargv({
	demandFlags: ["a", "b"]
})

```

<a name="descOfOptionsDemandWSF"></a>
### demandWithSkippedFlags
Same as demandFlags, but given the missing from the parsing of the flags. We recommend using this option if some flags were excluded from the returned object using excludeFlags, but need to be passed to this process.

<a name="descOfOptionsExcludeFlags"></a>
### excludeFlags
Array of string flags that should be skipped and not returned in the flag sections.

**Example**:

```javascript

fargv({
	excludeFlags: ["someFlag", "someOtherFlag"]
})

```

<a name="descOfOptionsNoParseFlags"></a>
### noParseFlags
Array of string flags that don't need to be parsed. Important note - defaultNoneValue and defaultArgv take priority over this option, respectively, the default values will be set if the flag does not have a value.

<a name="descOfOptionsNoParseNoDefaultFlags"></a>
### noParseNoDefaultFlags
Same as noParseFlags, but excludes the priority of defaultNoneValue (without defaultArgv). If the flag has no value, the default value is assigned from defaultArgv or undefined.

<a name="descOfOptionsReturnFilter"></a>
### returnFilter
A string or array of strings that tells fargv in which format to return a particular property. If a string or array with a single element is passed, it returns a property that is equal to the passed argument (if the property is missing, an empty object is returned). If an array of strings is passed, a filtered object is returned, where the properties are the same as the array elements.

**Example**:

```javascript

fargv({
	returnFilter: ["flags", "commands"]
})

```

<a name="descOfOptionsRememberExecNodePath"></a>
### rememberExecNodePath
Logical option. If true, it remembers the path to the node in the _ property of the returned object. By default, **false**.

<a name="descOfOptionsRememberExecFilePath"></a>
### rememberExecFilePath
Logical option. If true, it remembers the path to the main executable file in the _ property of the returned object. By default, **true**.

<a name="descOfOptionsRememberExecFileBasename"></a>
### rememberExecFileBasename
Logical option. If true, remembers the name of the main executable file in the _ property of the returned object. By default, **true**.

<a name="descOfOptionsRememberWarns"></a>
### rememberWarns
Logical option. If true, it remembers all errors that occur during parsing in the "warns" array property. By default, **false**.

<a name="descOfOptionsShowWarns"></a>
### showWarns
Logical option. If true, it shows warnings that occur during parsing using the console.warn . By default, **true**.

<a name="descOfOptionsParseWarn"></a>
### parseWarn
User-defined function, if set - fargv tells it the details of the warning.

<a name="descOfOptionsThrowInsteadWarns"></a>
### throwInsteadWarns
Logical option. If true, throws an exception instead of storing or logging the error during parsing. By default, it is **false**.

<a name="descOfOptionsIncludeEmptyFlags"></a>
### includeEmptyFlags
Logical option. If true, parses flags without the value passed through the equal sign. The default value is **true**.

<a name="descOfOptionsUFDC"></a>
### unlimitedFlagDefinitionCharacters
Logical option. If true, it doesn't matter how many characters that say that this argument is a flag is needed. The default value is **true**.

<a name="descOfOptionsSupportOnlyLatinArgs"></a>
### supportOnlyLatinArgs
Logical option. If true, fargv considers that flags are passed only through the Latin alphabet of any case. The default value is **true**.

<a name="descOfOptionsDefaultCommaSplitSym"></a>
### defaultCommaSplitSym
The symbol that will be used for splitting arrays and objects in parsing. The default value is **,** .

**Example with ,** :

```javascript

const argv = fargv({
	returnFilter: "flags",
	allParse: true
});

console.log(argv);

```

```bash

$ node ./exampleWithComma.js -a="[some, value, v, true]"
{ a: [ 'some', 'value', 'v', true ] }

```

**Example with #** :

```javascript

const argv = fargv({
	returnFilter: "flags",
	allParse: true,
	defaultCommaSplitSym: "#",
});

console.log(argv);

```

```bash

$ node ./exampleWithHash.js -a="[some# value, v# true]"
{ a: [ 'some', 'value, v', true ] }

```

<a name="descOfOptionsAllowSpacesAsValues"></a>
### allowSpacesAsValues
This is an option for arrays and objects. The default value is **true**.

Functionality in an array: if true, allows spaces between delimiters to be an independent value. Otherwise, the value is taken from arrayParse.defaultNoneValue.

**Example with true value**:

```javascript

const argv = fargv({
	returnFilter: "flags",
	allParse: true,
	allowSpacesAsValues: true,
});

console.log(argv);

```

```bash

$ node ./allowSpacesAsValuesTrue.js -a="[some, value, v, ,true]"
{ a: [ 'some', 'value', 'v', ' ', true ] }

```

**Example with false value**:

```javascript

const argv = fargv({
	returnFilter: "flags",
	allParse: true,
	allowSpacesAsValues: false,
});

console.log(argv);

```

```bash

$ node ./allowSpacesAsValuesFalse.js -a="[some, value, v, ,true]"
{ a: [ 'some', 'value', 'v', null, true ] }

```

Functionality in the object - **depends on the useDnvForFirstSpaceOP option**.

<a name="descOfOptionsUDFFSOP"></a>
### useDnvForFirstSpaceOP (useDefaultNoneValueForFirstSpaceInObjectProp)
Logical option for parsing object properties. The default value is **true**.

Answers whether to apply objectParse.defaultNoneValue to possible properties consisting of a single space.

Allows a space in a possible object property only if the allowSpacesAsValues option is set to true and useDnvForFirstSpaceOP is false.

**Example**:

```javascript

const argv = fargv.objectParse({
	defaultNoneValue: 4,
}).init({
	returnFilter: "flags",
	allParse: true,
	allowSpacesAsValues: true,
	useDnvForFirstSpaceOP: false,
}, true);

console.log(argv);

```

```bash

$ node ./useDnvForFirstSpaceOP.js -f="{a: 1, b: , c: 3, d:  ,}"
{ f: { a: 1, b: ' ', c: 3, d: 4 } }

```

The example shows that the property b was assigned the value ' ', and d got the value 4. This happened because b had one space, and d had 2 spaces.

<a name="descOfOptionsNoParse"></a>
### noParse
Logical option. It has the same purpose as **noParseFlags**, but it can be set for all flags at once. By default, it is **false**.

<a name="descOfOptionsNoParseNoDefault"></a>
### noParseNoDefault
Logical option. It has the same purpose as **noParseNoDefaultFlags**, but it can be set for all flags at once. By default, it is **false**.

<a name="descOfOptionsAllParse"></a>
### allParse
Logical option. If true - sets true on all properties in mainParse, arrayParse, and objectParse, which allows you to parse absolutely everything. By default, it is **false**.

<a name="descOfOptionsDefaultNoneValue"></a>
### defaultNoneValue or mainParse.defaultNoneValue
The default value that a flag should get that doesn't have a value for one reason or another (for example, passing the flag as follows: --flag, --flag= ). By default, **null**.

<a name="descOfOptionsAllTypes"></a>
### allTypes or mainParse.allTypes
Logical option. If true, it parses everything within the main level(without affecting the parsing settings for arrays and objects). By default, it is **false**.

<a name="descOfOptionsMainTypes"></a>
### mainTypes or mainParse.mainTypes
Logical option. If true, sets the values of properties mainParse.boolean, mainParse.array and mainParse.object to true. By default, **false**.

<a name="descOfOptionsMinorTypes"></a>
### minorTypes or mainParse.minorTypes
Logical option. If true, sets the values of properties mainParse.null, mainParse.undefined, mainParse.NaN and mainParse.Infinity to true. By default, **false**.

<a name="descOfOptionsNumericSeparator"></a>
### numericSeparator or mainParse.numericSeparator
Logical option. If true, values with underscores are parsed as numbers in accordance with the new standard. By default, it is **false**.

<a name="descOfOptionsNumber"></a>
### number or mainParse.number
Logical option. If true, the values will try to be parsed as numbers. By default, it is **true**.

<a name="descOfOptionsBigInt"></a>
### bigint or mainParse.bigint
Logical option. If true, the values will try to be parsed as BigInt. By default, it is **false**.

<a name="descOfOptionsBoolean"></a>
### boolean or mainParse.boolean
Logical option. If true, the values will try to be parsed as Boolean values (true or false). By default, it is **false**.

<a name="descOfOptionsArray"></a>
### array or mainParse.array
Logical option. If true, the values will try to be parsed as arrays. By default, it is **false**.

<a name="descOfOptionsObject"></a>
### object or mainParse.object
Logical option. If true, the values will try to be parsed as objects. By default, it is **false**.

<a name="descOfOptionsNull"></a>
### null or mainParse.null
Logical option. If true and the flag value is null, it equates the value to null. By default, it is **false**.

<a name="descOfOptionsUndefined"></a>
### undefined or mainParse.undefined
Logical option. If true and the flag value is undefined, it equates the value to undefined. By default, it is **false**.

<a name="descOfOptionsNaN"></a>
### NaN or mainParse.NaN
Logical option. If true and the flag value is NaN, it equates the value to NaN. By default, it is **false**.

<a name="descOfOptionsInfinity"></a>
### Infinity or mainParse.Infinity
Logical option. If true and the flag value is Infinity, it equates the value to Infinity. By default, it is **false**.

<a name="descOfOptionsArrayParse"></a>
### arrayParse.maxRecursiveCalls
The number responsible for the number of maximum recursions, if, for example, an array is parsed in an array. The default value is **10**.

### arrayParse.defaultNoneValue, allTypes, ...
arrayParse takes over from mainParse properties that regulate parsing values, but only now in the area of parsing array elements.

The only difference here is in the default values. Instead of false, the following properties have true: boolean, null, undefined.

<a name="descOfOptionsObjectParse"></a>
### objectParse.ifDuplicateKey
Answers what to do if duplicate properties are found during object parsing.

### objectParse.ifDuplicateKey.rewrite
Logical option. If true, it enters a new value in an existing property. The default value is **true**.

### objectParse.ifDuplicateKey.warn
Logical option. If true, it indicates whether fargv should use errorHandler in the current situation. The default value is **true**.

### objectParse.maxRecursiveCalls
The number responsible for the number of maximum recursions, if, for example, an object is parsed in an object. The default value is **10**.

### arrayParse.defaultNoneValue, allTypes, ...
objectParse takes over from mainParse properties that regulate parsing values, but only now in the area of parsing object elements.

The only difference here is in the default values. Instead of false, the following properties have true: boolean, null, undefined.

<a name="staticMethods"></a>
## Static methods

<a name="staticMethodsOptions"></a>
### fargv.options(options: {} | "reset", redefine: any)
Sets parsing options in fargvWrapper._options. By default, a merge is performed if the redefine argument is not passed. Can be called with the 1st "reset" argument, which will set fargvWrapper._options to null.

<a name="staticMethodsCreateOptions"></a>
### fargv.createOptions()
If fargvWrapper._options is not an object, this method will set the object.

<a name="staticMethodsReset"></a>
### fargv.reset(option: string)
Resets the option passed in the option argument

<a name="staticMethodsResetAll"></a>
### fargv.resetAll()
Resets all options.

<a name="staticMethodsCommand"></a>
### fargv.command(command, handler, help)
Sets the commands option. If only one function is passed as a single argument, the separateCommandHandler option is set.

Interface:

```typescript

interface staticFargvCommand {
	
	command: "reset" | Function | string | string[],
	handler: (state: fargvReturns, ...nextCommands: string[]) => void,
	help?: {

		[a | alias | aliases]?: array<string> | string,
		desc?: string,
		usage?: string,
		flags?: array<string> | string,
		examples?: array<string> | string,
		
	}
	
}

```

<a name="staticMethodsSeparateCommand"></a>
### fargv.separateCommand(handler: Function, alwaysCallSeparateCommandHanler: boolean)
Sets the separateCommandHandler and/or alwaysCallSeparateCommandHanler option.

<a name="staticMethodsOptionFlag"></a>
### fargv.optionFlag(optionName: string, optionConfig: {})
Sets the help.flags[optionName] option.

Interface:

```typescript

interface optionConfig {

	desc?: string,
	required?: boolean | string,
	deprecated?: boolean | string,
	empty?: boolean,
	type?: "string" | "number" | "array" | "object" | "bigint" | "boolean",
	[a | alias | aliases]?: array<string> | string,
	examples?: array<string> | string,

}

interface staticSetOptionFlag {

	optionName: string,
	optionConfig: optionConfig

}

```

<a name="staticMethodsOptionCommand"></a>
### fargv.optionCommand(commandName: string, commandHelpConfig: {})
Sets the help.commands[commandName] option.

Interface:

```typescript

interface commandHelpConfig {

	[a | alias | aliases]?: array<string> | string,
	desc?: string,
	usage?: string,
	flags?: array<string> | string,
	examples?: array<string> | string,

}

interface staticSetOptionCommand {

	commandName: string,
	commandHelpConfig: commandHelpConfig

}

```

<a name="staticMethodsHelp"></a>
### fargv.help(objectOfHelp: staticIntegrateHelp | "reset")
Sets the help object with properties.

Interface:

```typescript

interface staticIntegrateHelp {

	flagsToCall: array | string,
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

	commands: commandHelpConfig,
	flags: optionConfig,

}

```

<a name="staticMethodsDefault"></a>
### fargv.default(objectOfValues, redefine)
Sets the defaultArgv option.

Interface:

```typescript

interface staticSetDefaultArgv {

	objectOfValues: "reset" | {
		
		[key: string] : any | {

			_options: {
				
				[value | argValue | v]: any,
				[alias | a | aliases]: string | string[],
				
			}
			
		} | ["$fargvSetDefault", any, string | string[]]
		
	},
	redefine: any
	
}

```

<a name="staticMethodsCustom"></a>
### fargv.custom(customArgv)
Sets the customArgv option.

Interface:

```typescript

interface staticSetCustomArgv {

	customArgv: [
		
		...array<string, string>
		
	]
	
}

```

<a name="staticMethodsCustomWithGenerate"></a>
### fargv.customWithGenerate(...args)
Sets the customArgv option by generating (see fargv.generate interface).

<a name="staticMethodsCustomWithGenerateFromObject"></a>
### fargv.customWithGenerateFromObject(...args)
Sets the customArgv option by generating from an object (see fargv.generateFromObject interface).

<a name="staticMethodsDemand"></a>
### fargv.demand(args: "reset" | string | string[], withSkipArgs: boolean)
Sets the demandFlags or demandWithSkippedFlags option.

<a name="staticMethodsUndemand"></a>
### fargv.undemand(args: string | string[], withSkipArgs: boolean)
Unsets the demandFlags or demandWithSkippedFlags option.

<a name="staticMethodsExclude"></a>
### fargv.exclude(excludeFlags: "reset" | string | string[], redefine: any)
Sets the excludeFlags option.

<a name="staticMethodsNoParse"></a>
### fargv.noParse(state: boolean, isNoParseNoDefault: boolean)
Sets the noParse or noParseNoDefault option.

<a name="staticMethodsNoParseFlags"></a>
### fargv.noParseFlags(noParseFlags: "reset" | string | string[], isNoParseNoDefaultFlags: boolean)
Sets the noParseFlags or noParseNoDefaultFlags option.

<a name="staticMethodsAllParse"></a>
### fargv.allParse(allParseState: boolean)
Sets the allParse option.

<a name="staticMethodsReturnFilter"></a>
### fargv.returnFilter(newReturnFilterValue: string | string[])
Sets the returnFilter option.

<a name="staticMethodsRemember"></a>
### fargv.remember(rememberState: staticSetRemember)
Sets the following options: rememberExecNodePath, rememberExecFilePath, rememberExecFileBasename.

Interface:

```typescript

interface staticSetRemember {
	
	[file | fileName | execFileBasename]?: boolean,
	[filePath | execFilePath]?: boolean,
	[node | nodePath | execNodePath]?: boolean,
	
}

```

<a name="staticMethodsWarns"></a>
### fargv.warns(optionsState: staticSetWarns)
Sets the following options: rememberWarns, showWarns, throwInsteadWarns, parseWarn.

Interface:

```typescript

interface staticSetWarns {

	remember?: boolean,
	show?: boolean,
	["throw" | throwInsteadWarns]?: boolean,
	parser: Function,

}

```

<a name="staticMethodsArrayParse"></a>
### fargv.arrayParse(arrayParse: "reset" | {}, redefine: any)
Sets the arrayParse option.

<a name="staticMethodsObjectParse"></a>
### fargv.objectParse(objectParse: "reset" | {}, redefine: any)
Sets the objectParse option.

<a name="staticMethodsState"></a>
### fargv.state(about)
Returns the current state based on the passed about argument.

<a name="staticMethodsFromArray"></a>
### fargv.fromArray(sourceArray: [], useSpacesAsDelimiters: boolean)
Returns a string with special syntax based on an array.

<a name="staticMethodsFromObject"></a>
### fargv.fromObject(sourceObject: {}, useSpacesAsDelimiters: boolean)
Returns a string with special syntax based on an object.

<a name="staticMethodsToArray"></a>
### fargv.toArray(sourceString: string, mergingOptions: {})
Returns an array based on a string with special fargv syntax.

<a name="staticMethodsToObject"></a>
### fargv.toObject(sourceString: string, mergingOptions: {})
Returns an object based on a string with special fargv syntax.

<a name="staticMethodsStrIsArray"></a>
### fargv.strIsArray(sourceString: string, mergingOptions: {})
Checks whether a string can be an array using the fargv syntax.

<a name="staticMethodsStrIsObject"></a>
### fargv.strIsObject(sourceString: string, mergingOptions: {})
Checks whether a string can be an object using the fargv syntax.

<a name="staticMethodsStrIsStrictArray"></a>
### fargv.strIsStrictArray(sourceString: string, mergingOptions: {})
Returns the same as fargv.strIsArray, but the check is more strict.

<a name="staticMethodsStrIsStrictObject"></a>
### fargv.strIsStrictObject(sourceString: string, mergingOptions: {})
Returns the same as fargv.strIsObject, but the check is more strict.

<a name="staticMethodsGenerate"></a>
### fargv.generate(argName, argValue, ...args)
Transforms arrays, objects, and other values into a string-specific syntax that allows fargv to parse these as values.

Interface:

```typescript

interface generateElementStructure {

	[name | argName | n]: string,
	[value | argValue | v]: any,
	[flag | f | flagDC]: number,
	[pre | p | prePush]: (res: string) => string,
	[wes | withoutES | withoutEqualSym]: boolean,

}

interface generate_OptionsStructure {

	useSpacesAsDelimiters: boolean | {
		array: boolean,
		object: boolean,
	}

}

interface generateOptionsStructure {

	_options: generate_OptionsStructure

}

type generateElementOrOptions = generateElementStructure | generateOptionsStructure;

function generate(argName: generateElementOrOptions, argValue: generateElementOrOptions, ...args: generateElementOrOptions[]): string {}
function generate(argName: generateElementOrOptions, argValue: generateElementOrOptions): string {}
function generate(argValue: generateElementOrOptions): string {}
function generate(argValue: array<generateElementOrOptions>): string {}
function generate(argName: string, argValue: any, options: generateOptionsStructure | generate_OptionsStructure): string {}
function generate(argName: string, argValue: any): string {}

```

<a name="staticMethodsGenerateFromObject"></a>
### fargv.generateFromObject(getParsedArgs, objectOfValues, objectOfConfigs)
The same as fargv.generate only with a different interface.

Interface:

```typescript

interface generateFromObjectElementStructure {

	[key: string]: any

}

interface generateFromObjectOptionsStructure {

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

	[key: string]: {

		[flag | f | flagDC]: number,
		[pre | p | prePush]: (res: string) => string,
		[wes | withoutES | withoutEqualSym]: boolean,

	}

}

function generateFromObject(objectOfValues: generateFromObjectElementStructure, objectOfConfigs?: generateFromObjectOptionsStructure): string {}
function generateFromObject(getParsedArgs: true, objectOfValues: generateFromObjectElementStructure, objectOfConfigs?: generateFromObjectOptionsStructure): array<generateElementOrOptions> {}

```

<a name="staticMethodsInit"></a>
### fargv.init(options, mergingWithFargvWrapperOptions)
The initialization parsing. If nothing is passed, it is based on fargvWrapper._options. If an object is passed without a subsequent true argument, it is based solely on this object. If the first argument is passed an object, and the second is true - merges the received object with fargvWrapper._options and starts initialization.

### fargv.initF()
Alias of fargv.returnFilter("flags").init(...arguments)

### fargv.initC()
Alias of fargv.returnFilter("commands").init(...arguments)

### fargv.initFC() && fargv.initCF()
Alias of fargv.returnFilter(["flags", "commands"]).init(...arguments)

<a name="contacts"></a>
# Contacts

**Yandex Mail** - vladimirvsevolodovi@yandex.ru

**Github** - https://github.com/StormExecute/

# Platforms

**Github** - https://github.com/StormExecute/fargv/

**NPM** - https://www.npmjs.com/package/fargv/

# License

**MIT** - https://mit-license.org/

[npm-url]: https://www.npmjs.com/package/fargv
[npm-image]: https://img.shields.io/npm/v/fargv.svg