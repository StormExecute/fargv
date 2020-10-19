const arrayEquals = require("../../dependencies/arrayEquals");

const fargv = require("../../src/main");

const requiredResults = [

	[
		'\n' +
		'Usage: someUsage [SOME-SUBCOMMAND] [SOME-FLAGS]\n' +
		'\n' +
		'Description: By using our site, you acknowledge that you have read and\n' +
		'understand our Cookie Policy, Privacy Policy, and our Terms of Service.\n' +
		'\n' +
		'Commands(name | description | usage):\n' +
		'\n' +
		'  someCommand             its simple description of           No usage desc\n' +
		'                          someCommand\n' +
		'\n' +
		'  lala, aliases: l, lol,  Second simple command description   lala [SOME]\n' +
		'  lolo, ll\n' +
		'\n' +
		'Flags:\n' +
		'\n' +
		'  --someFlag, aliases: -s,   Lorem ipsum dolor sit        [required: yeah]\n' +
		'  --ss, --AwesSomeFlagg      amet. Lorem!                 [must be with value]\n' +
		'\n' +
		'  --wowOW                    Lorem ipsum dolor sit        [deprecated: use:\n' +
		'                             amet, consectetur            wowOWOW2 instead!]\n' +
		'                             adipiscing elit, sed do\n' +
		'                             eiusmod tempor incididunt\n' +
		'                             ut labore et dolore magna\n' +
		'                             aliqua. Ut enim ad minim\n' +
		'                             veniam, quis nostrud\n' +
		'                             exercitation ullamco\n' +
		'                             laboris nisi ut aliquip\n' +
		'                             ex ea commodo consequat.\n' +
		'\n' +
		'  --hmm                      No description               [required]\n' +
		'                                                          [boolean]\n' +
		'\n' +
		'  --true                     No description               [array]\n' +
		'\n' +
		'  --notForLala, alias:       No description\n' +
		'  --nFl\n' +
		'\n' +
		'  --xera                     No description\n' +
		'\n' +
		'Flag examples:\n' +
		'\n' +
		'--hmm:\n' +
		'\n' +
		'hmm-example(any text)\n' +
		'\n' +
		'--true:\n' +
		'\n' +
		'someExampleOfTrueFlag\n' +
		'anotherExampleOfTrueFlag',
		''
	],

	[
		'\n' +
		'Help for command "lala" (aliases: l, lol, lolo, ll):\n' +
		'\n' +
		'Description: Second simple command description\n' +
		'\n' +
		'Usage: lala [SOME]\n' +
		'\n' +
		'Examples:\n' +
		'\n' +
		'lala wow\n' +
		'lala wow --someF\n' +
		'\n' +
		'Flags:\n' +
		'\n' +
		'  --someFlag, aliases: -s,   Lorem ipsum dolor sit        [required: yeah]\n' +
		'  --ss, --AwesSomeFlagg      amet. Lorem!                 [must be with value]\n' +
		'\n' +
		'  --hmm                      No description               [required]\n' +
		'                                                          [boolean]\n' +
		'\n' +
		'  --true                     No description               [array]\n' +
		'\n' +
		'  --wowOW                    Lorem ipsum dolor sit        [deprecated: use:\n' +
		'                             amet, consectetur            wowOWOW2 instead!]\n' +
		'                             adipiscing elit, sed do\n' +
		'                             eiusmod tempor incididunt\n' +
		'                             ut labore et dolore magna\n' +
		'                             aliqua. Ut enim ad minim\n' +
		'                             veniam, quis nostrud\n' +
		'                             exercitation ullamco\n' +
		'                             laboris nisi ut aliquip\n' +
		'                             ex ea commodo consequat.\n' +
		'\n' +
		'Flag examples:\n' +
		'\n' +
		'--hmm:\n' +
		'\n' +
		'hmm-example(any text)\n' +
		'\n' +
		'--true:\n' +
		'\n' +
		'someExampleOfTrueFlag\n' +
		'anotherExampleOfTrueFlag',
		''
	],

	[
		'\n' +
		'Help for flag "s" (alias of someFlag):\n' +
		'\n' +
		'  --someFlag, aliases: -s,   Lorem ipsum dolor sit        [required: yeah]\n' +
		'  --ss, --AwesSomeFlagg      amet. Lorem!                 [must be with value]',
		''
	] ,

];

let log = [];

const origConsoleLog = console.log;

console.log = function () {

	const args = [];

	for(let i = 0; i < arguments.length; ++i) {

		args.push(arguments[i]);

	}

	log = log.concat(args);

};

const { HELP } = fargv
	.help({

		mainUsage: "someUsage [SOME-SUBCOMMAND] [SOME-FLAGS]",
		mainDesc: "By using our site, you acknowledge that you have read and understand our Cookie Policy, Privacy Policy, and our Terms of Service.",
		exit: false,
		flagsToCall: "HELP"

	})
	.optionFlag("someFlag", {

		desc: "Lorem ipsum dolor sit amet. Lorem!",
		required: "yeah",
		empty: false,
		alias: ["s", "ss", "AwesSomeFlagg"]

	})
	.optionCommand("someCommand", {

		desc: "its simple description of someCommand",

	})
	.optionFlag("wowOW", {

		desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
		deprecated: "use: wowOWOW2 instead!",

	})
	.optionFlag("hmm", {

		type: "boolean",
		required: true,
		examples: "hmm-example(any text)",

	})
	.optionFlag("true", {

		type: "array",
		examples: ["someExampleOfTrueFlag", "anotherExampleOfTrueFlag"],

	})
	.optionFlag("notForLala", {

		a: "nFl",

	})
	.optionFlag("xera", {})
	.command("lala", function(){}, {

		a: ["l", "lol", "lolo", "ll"],
		usage: "lala [SOME]",
		desc: "Second simple command description",
		flags: ["someFlag", "hmm", "true", "wowOW"],
		examples: [

			"lala wow",
			"lala wow --someF"

		],

	})
	.returnFilter("flags").init();

for(let i = 0; i <= 2; ++i) {

	if(HELP == (i + 1)) {

		if(arrayEquals(log, requiredResults[i])) {

			origConsoleLog("OK.");
			process.exit(0);

		} else {

			console.error(log, requiredResults[i]);
			process.exit(1);

		}

	}

}