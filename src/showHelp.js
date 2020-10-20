const isObject = require("../dependencies/isObject");
const isEmptyObject = require("../dependencies/isEmptyObject");
const ObjectKeys = require("../dependencies/getObjectKeys");

const copyV = require("../dependencies/copyValWithoutBind");
const plural = require("../dependencies/possiblePlural");

const terminalWidth = (function () {

	if (typeof process === 'object' && process.stdout && process.stdout.columns) {
		return process.stdout.columns
	}

	return 80

})();

const terminalWidthOnePercent = terminalWidth / 100;

const flagsColumnWidth = Math.round(terminalWidth / 3);

//first - in percents, then - in pixels
const commandsColumnWidth = {
	name: 30,
	desc: 45,
	usage: 25,
};

for(const prop in commandsColumnWidth) {

	commandsColumnWidth[prop] = Math.round(terminalWidthOnePercent * commandsColumnWidth[prop])

}

const includeCommand = require("./includeCommand");

const cliui = require("cliui");

const examplesAndFlags = ["examples", "flags"];

const getHelpCommandPrefix = command => `\nHelp for command "${command}"`;
const getHelpFlagPrefix = flag => `\nHelp for flag "${flag}"`;

const getDescRequiredDeprecated = val => typeof val == "boolean" ? "" : ": " + val;

//flagValue: plainObject<usableOptions.help.flags[flagName]>; returns: array<string...,>
const parseFlagRightHelp = function(flagValue) {
	
	const rightHints = [];
	
	if(flagValue.required) {
									
		rightHints[rightHints.length] = `[required${getDescRequiredDeprecated(flagValue.required)}]`;
	
	} 
	
	if(flagValue.deprecated) {
		
		rightHints[rightHints.length] = `[deprecated${getDescRequiredDeprecated(flagValue.deprecated)}]`;
		
	}
	
	if(flagValue.type) {
		
		switch(flagValue.type) {
			
			case "string": case "number": case "array": case "object": case "bigint": case "boolean":
			
				rightHints[rightHints.length] = `[${flagValue.type}]`;
			
			break;
			
		}
		
	}
	
	if(flagValue.empty == false) {

		rightHints[rightHints.length] = "[must be with value]";

	} else if(flagValue.empty == true) {

		rightHints[rightHints.length] = "[must be empty]";

	}
	
	return rightHints;
	
};

//flagName: string, defaultArgv: plainObject<usableOptions.defaultArgv>; returns: array<string...,>
const getAliases = function(flagName, defaultArgv) {

	let aliases = [];

	if(Array.isArray(defaultArgv[flagName])) {

		aliases = copyV(defaultArgv[flagName][1]);

	}
	
	return aliases
	
};

/*
	ui: cliui(),
	flagName: string,
	flagValue: plainObject<usableOptions.help.flags[flagName]>,
	aliases: array<string...,>,
	rightHints: array<string...>,
	topPadding: number | undefined,
	bottomPadding: number | undefined,
*/
const addFlagBlock = (ui, flagName, flagValue, aliases, rightHints, topPadding, bottomPadding) => {
	
	if(!ui || !flagName || !flagValue) return;
	
	aliases = Array.isArray(aliases) ? aliases : [];
	rightHints = Array.isArray(rightHints) ? rightHints : [];
	
	topPadding = typeof topPadding == "undefined" ? 1 : topPadding;
	bottomPadding = typeof bottomPadding == "undefined" ? 1 : bottomPadding;
	
	ui.div({
		
		text: `--${flagName}${aliases.length ? ", alias" + (aliases.length > 1 ? "es: " : ": ") + aliases.map(el => (el.length > 1 ? "--" : "-") + el).join(", ") : ""}`,
		padding: [topPadding, 0, bottomPadding, 2],
		width: flagsColumnWidth
		
	}, {
		
		text: typeof flagValue.desc == "string" ? flagValue.desc : `No description`,
		padding: [topPadding, 0, bottomPadding, 2],
		width: flagsColumnWidth,
		
	}, {
		
		text: rightHints.map((el, i) => {
			
			if(rightHints.length == 1 || !rightHints[i + 1]) return el;
			
			return el + "\n"
			
		}).join(""),
		padding: [topPadding, 0, bottomPadding, 4],
		width: flagsColumnWidth

	});
	
};

//ui: cliui(), examples: array<string...,>, customHeader: null | string | undefined
const addExamplesBlock = (ui, examples, customHeader) => {

	if(customHeader !== null) {

		if(typeof customHeader == "string") {

			ui.span(customHeader);

		} else {

			ui.span(
				plural("Example", examples) + ":"
			);

		}

	}
	
	if(Array.isArray(examples)) {

		ui.div("\n");
		
		for(let i = 0; i < examples.length; i++) {
				
			const example = examples[i];
			
			if(typeof example == "string") {
			
				ui.span(example);
				
			}
				
		}
		
		ui.span();
		
	} else {
		
		const l = ObjectKeys(examples).length;
		
		for(const exampleName in examples) {
			
			const exampleValue = examples[exampleName];
			
			ui.span((l > 1 ? "\n" : "") + "--" + exampleName + ":");
			
			addExamplesBlock(ui, Array.isArray(exampleValue) ? exampleValue : [exampleValue], null);
			
		}
		
	}
	
};

/*
	ui: cliui(),
	usableOptions: plainObject<usableOptions>,
	flags: array<string...,> | null,
	forSpecific: boolean,
	missingInsteadNotSet: boolean,
*/
const showAllFlags = (ui, usableOptions, flags, forSpecific, missingInsteadNotSet) => {

	const hOptions = usableOptions.help;
	const showExamples = forSpecific ? hOptions.showExamplesForSpecific : hOptions.showExamples;

	const canHaveAliases = isObject(usableOptions.defaultArgv);
	
	ui.div("\nFlags:");
	
	let justFindAnyFlag = false;
						
	if(isObject(hOptions.flags)) {

		if(flags === null) flags = ObjectKeys(hOptions.flags);
	
		for(let i = 0; i < flags.length; i++) {
			
			const flagName = flags[i];
			
			if(!isObject(hOptions.flags[flagName])) continue;
			
			const flagValue = copyV(hOptions.flags[flagName]);
			
			const rightHints = parseFlagRightHelp(flagValue);
			const aliases = canHaveAliases ? getAliases(flagName, usableOptions.defaultArgv) : [];
			
			const topPadding = !justFindAnyFlag ? 1 : 0;
			const bottomPadding = (i + 1) == flags.length ? 0 : 1;

			addFlagBlock(ui, flagName, flagValue, aliases, rightHints, topPadding, bottomPadding);
			
			if(
				flagValue.examples
				&& 
				(showExamples == true || showExamples == "flags")
			) {
				
				const examples = Array.isArray(flagValue.examples) ? Object.assign([], flagValue.examples) : [flagValue.examples];
				
				if(isObject(justFindAnyFlag)) justFindAnyFlag[flagName] = examples;
				else justFindAnyFlag = { [flagName]: examples };
				
			} else if(!justFindAnyFlag) {
				
				justFindAnyFlag = true;
				
			}
			
		}
	
	}
	
	if(!justFindAnyFlag) {
		
		ui.div(missingInsteadNotSet ? "no flags set" : "present but not set");
		
	} else if(isObject(justFindAnyFlag)) {
		
		ui.span();
		
		addExamplesBlock(ui, justFindAnyFlag, `${plural("Flag example", justFindAnyFlag)}:\n`);
		
	}
	
};

//usableOptions: plainObject<usableOptions>, flagName: string, fromAlias: string | undefined
const showFlagHelp = function (usableOptions, flagName, fromAlias) {

	const hOptions = usableOptions.help;

	const ui = cliui();

	if(fromAlias) {

		ui.div(getHelpFlagPrefix(fromAlias) + ` (alias of ${flagName}):`);

	} else {

		ui.div(getHelpFlagPrefix(flagName) + ":");

	}

	if(!isObject(hOptions.flags[flagName])) {

		ui.div("present but not set");

	} else {

		const flagValue = copyV(hOptions.flags[flagName]);

		const rightHints = parseFlagRightHelp(flagValue);
		const aliases = getAliases(flagName, usableOptions.defaultArgv);

		addFlagBlock(ui, flagName, flagValue, aliases, rightHints, 1, 0);

		if(
			flagValue.examples
			&&
			(hOptions.showExamplesForSpecific == true || hOptions.showExamplesForSpecific == "flags")
		) {

			if (Array.isArray(flagValue.examples)) {

				ui.span();

				addExamplesBlock(ui, flagValue.examples);

			} else if (typeof flagValue.examples == "string") {

				ui.span();

				addExamplesBlock(ui, [flagValue.examples]);

			}

		}

	}

	ui.toString() && console.log(ui.toString());

};

//ui: cliui(), hOptions: plainObject<usableOptions.help>
const showAllCommands = function (ui, hOptions) {

	ui.span();

	ui.div("Commands(name | description | usage):");

	for(const commandName in hOptions.commands) {

		const hCommand = hOptions.commands[commandName];

		const description = typeof hCommand.desc == "string" ? hCommand.desc : "No description";
		const usage = typeof hCommand.usage == "string" ? hCommand.usage : "No usage desc";

		const aliases = Array.isArray(hCommand.alias) ? hCommand.alias : [];

		ui.span();

		ui.div({

			text: `${commandName}${aliases.length ? ", alias" + (aliases.length > 1 ? "es: " : ": ") + aliases.join(", ") : ""}`,
			padding: [0, 0, 0, 2],
			width: commandsColumnWidth.name,

		}, {

			text: description,
			padding: [0, 0, 0, 2],
			width: commandsColumnWidth.desc,

		}, {

			text: usage,
			padding: [0, 0, 0, 2],
			width: commandsColumnWidth.usage,

		})

	}

};

//exitProcess: boolean, rememberAllCommands: array<string...,>, rememberAllFlags: plainObject = { ...[prop]: 1 }
const showMainHelp = function(exitProcess, rememberAllCommands, rememberAllFlags) {

	let showAll = true;

	const hOptions = this.usableOptions.help;

	//show help for specific command
	if(rememberAllCommands.length && hOptions.showForSpecificCommand && isObject(hOptions.commands)) {
		
		const commands = ObjectKeys(hOptions.commands).sort((a, b) => b.split(" ").length - a.split(" ").length);
		
		const argvCommandsToStr = rememberAllCommands.join(" ");
		
		for(let i = 0; i < commands.length; i++) {
			
			const command = commands[i];
			
			if(!isObject(hOptions.commands[command]) || isEmptyObject(hOptions.commands[command])) continue;
			
			if(includeCommand(argvCommandsToStr, command)) {

				showAll = false;
				
				const helpToThisCommand = copyV(hOptions.commands[command]);

				//desc, usage, alias, examples, flags
				const hints = [];
				
				if(typeof helpToThisCommand.desc == "string") {
					
					hints[0] = helpToThisCommand.desc;
					
				}
				
				if(typeof helpToThisCommand.usage == "string") {
					
					hints[1] = helpToThisCommand.usage;
					
				}

				if(Array.isArray(helpToThisCommand.alias)) {

					hints[2] = " (alias"
						+ (helpToThisCommand.alias.length > 1 ? "es" : "")
						+ ": "
						+ helpToThisCommand.alias.join(", ")
						+ "):";

				}
				
				for(let i = 3; i <= 4; ++i) {
					
					const whatOf = examplesAndFlags[i - 3];
					
					if(Array.isArray(helpToThisCommand[whatOf])) {
					
						hints[i] = helpToThisCommand[whatOf];
						
					} else if(typeof helpToThisCommand[whatOf] == "string") {
						
						hints[i] = [helpToThisCommand[whatOf]];
						
					}
					
				}
				
				const ui = hints.length ? cliui() : false;
				
				if(ui) {
				
					ui.span(getHelpCommandPrefix(command) + (hints[2] ? hints[2] : ":"));
					
					if(hints[0]) ui.div("\n\nDescription: " + hints[0]);
					
					if(hints[1]) ui.div((hints[0] ? "\nU" : "u") + "sage: " + hints[1]);
					
					if(
						hints[3]
						&& 
						(hOptions.showExamplesForSpecific == true || hOptions.showExamplesForSpecific == "commands")
					) {
						
						ui.span();
						
						addExamplesBlock(ui, hints[3]);
						
					}
					
					if(hints[4]) {
						
						showAllFlags(ui, this.usableOptions, hints[4], true);
						
					}
					
					ui.toString() && console.log(ui.toString());
				
				}
				
			}
			
		}
		
	} else if(
		//show help for specific flag
		hOptions.showForSpecificFlag &&
		!rememberAllCommands.length &&
		isObject(this.usableOptions.help.flags) &&
		//slice -h
		ObjectKeys(rememberAllFlags).slice(0, -1).length == 1
	) {
		
		const helpForFlagName = ObjectKeys(rememberAllFlags)[0];

		if(hOptions.flags[helpForFlagName]) {

			showAll = false;

			showFlagHelp(this.usableOptions, helpForFlagName, false);

		} else if(isObject(this.usableOptions.defaultArgv)) {
			
			for(const name in this.usableOptions.defaultArgv) {
				
				if(Array.isArray(this.usableOptions.defaultArgv[name]) && ~this.usableOptions.defaultArgv[name][1].indexOf(helpForFlagName)) {

					showAll = false;

					showFlagHelp(this.usableOptions, name, helpForFlagName);
					
				}
				
			}
			
		}
		
	}

	if(showAll) {

		//show all help
		
		const ui = cliui();

		if(hOptions.mainUsage) ui.div("\nUsage: " + hOptions.mainUsage);

		if(hOptions.mainDesc) ui.div("\nDescription: " + hOptions.mainDesc);
		
		if(isObject(hOptions.commands) && hOptions.showMainCommands) {

			showAllCommands(ui, hOptions);
			
		}
		
		hOptions.showMainFlags && showAllFlags(ui, this.usableOptions, null, false, true);

		typeof hOptions.mainCustomEndText == "string" && ui.span("\n" + hOptions.mainCustomEndText);
		
		ui.toString() && console.log(ui.toString());
		
	}

	console.log("");
	
	if(exitProcess) process.exit(0);
	
};

module.exports = showMainHelp;