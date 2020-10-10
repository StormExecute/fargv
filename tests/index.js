/*

	node tests/main.js --someNumber=1 -a="[1, 2, 4n, [1, 2, 3, [string, [string and string, and others, []], yeah, true], 9, .], test test, NaN,,]" -b=22n ---099=123 --none= --noneWithoutEqSym -object="{someProp: 123, noneDefault: , array: [yeah, it, s, supported!], q: {}}"
	
	node tests/main.js --someNumber=1 -a=[1,2,4n,[1,2,3,[string,[string and string,and others,[]],yeah,true],9,.],test test,NaN,,] -b=22n ---099=123 --none= --noneWithoutEqSym -object={someProp:123,noneDefault:123,array:[yeah,it,s,supported!],q:{}}
	
*/

const path = require("path");

const { exec } = require('child_process');

const fargv = require("../src/main");

const parsedArray = require("./defaultModels/parsedArray");
const parsedObject = require("./defaultModels/parsedObject");

const args = fargv.generate({
	
	_options: {
		
		useSpacesAsDelimiters: true,
		
	},
	
}, {
	
	n: "someNumber",
	v: 1,
	
}, {
	
	f: 1,
	n: "a",
	value: parsedArray,
	pre: res => res.replace(" 444", ","),
	
}, {
	
	n: "b",
	f: 1,
	v: 22n,
	
}, {
	
	n: "099",
	f: 3,
	v: 123,
	
}, {
	
	n: "none",
	v: "",
	
}, {
	
	n: "noneWithoutEqSym",
	v: "",
	withoutEqualSym: true,
	
}, {
	
	f: 1,
	n: "object",
	v: parsedObject,
	pre: res => res.replace("noneDefault:123", "noneDefault: ")
	
});

function capitalizeFirstLetter(string) {
	
	return string.charAt(0).toUpperCase() + string.slice(1);
  
}

const defaultRunObject = name => "node " + path.join(__dirname, "objects/" + name + ".js") + " ";

const repeats = 15;

console.log("-".repeat(repeats) + "Tests started" + "-".repeat(repeats) + "\n");

process.on("exit", () => console.log("-".repeat(repeats) + "Tests finished" + "-".repeat(repeats) + "\n"));

//[taskName, command]
let commands = [

	["generateIndexModel", "node " + path.join(__dirname, "generate/generateStringIndexModel.js")],

	["commandsWithoutFlags", defaultRunObject("commandsWithoutFlags") + "configure someProp someValue"],

	["commandsWithFlags", defaultRunObject("commandsWithFlags") + "install someFirstPacket,someSecondPacket,someThirdPacket someNext " + fargv.generateFromObject({

		useSome: true,
		save: true,
		someArgs: [1, 2324, 4242, true, "yes"],

	})],

	["demandFlags", defaultRunObject("demandFlags") + args],

	["defaultFlags", defaultRunObject("defaultFlags") + fargv.generateFromObject({

		flagA: undefined,
		flagB: 3,
		flagC: "value",
		//flagD
		flagE: ["default", "non-standard"],
		flagF: {

			a: "non-standard",
			b: "default",

		},


	})],

	["customFlags", defaultRunObject("customFlags")],

	["excludeAndNoParseFlags", defaultRunObject("excludeAndNoParseFlags") + fargv.generateFromObject({

		a: true,
		b: 1,
		c: "str",

		d: 123,
		none: "",
		noneTwo: "",
		noneThree: "",

		someOther: [1, 2, 3n],

	}, {

		noneTwo: {

			withoutEqualSym: true

		},

		noneThree: {

			withoutEqualSym: true

		}

	})],

	["arrayAndObjectStaticParse", defaultRunObject("arrayAndObjectStaticParse") + fargv.generateFromObject({

		array: [

			{

				a: []

			},

			1,

			"str",

			[1, 2, 3]

		],

		object: {

			a: [],

			b: {a: 2}

		},

	})],

	["warningsTest", defaultRunObject("warningsTest")],

];

function startTests(commands) {

	const command = commands[0];

	exec(command[1], (error, stdout, stderr) => {

		if (error) console.error(`${capitalizeFirstLetter(command[0])} Exec Error:\n\n${error}`);
		else if(stderr) console.error(`${capitalizeFirstLetter(command[0])} Stderr: ${stderr}`);
		else if(stdout) console.log(`${capitalizeFirstLetter(command[0])} Stdout: ${stdout}`);
		else if(!stdout) console.log(`${capitalizeFirstLetter(command[0])} Stdout: Unknown\n`);

		commands = commands.slice(1);

		if(commands.length == 1) {

			const finalCommand = commands[commands.length - 1];

			if(finalCommand[0] != "main") throw new Error(finalCommand[0]);

			console.log("Main test results have been opened in a new window and await closure...\n");

			//!execSync
			return exec(finalCommand[1]);

		} else if(commands.length > 1) {

			startTests(commands);

		}

	});

}

if(process.platform.startsWith("win")) {

	commands.push(["main", "start cmd /k node " + path.join(__dirname, "objects/flags.js") + " " + args]);

	startTests(Object.assign([], commands));

} else if(process.platform.includes("linux")) {

	const getLinuxTerminal = require("./_getLinuxTerminal");

	getLinuxTerminal(terminal => {

		if(terminal == null) {

			commands.push(["Unable to run final test - terminal not found!", ""]);

		}

		if(terminal == "konsole" || terminal == "xfce4-terminal") {

			commands.push(["main", terminal + " --hold -e node " + path.join(__dirname, "objects/flags.js") + " " + args]);

		}

		startTests(Object.assign([], commands));

	});

} else {
	
	throw new Error("Tests for this OS are temporarily not supported.");
	
}