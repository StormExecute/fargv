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

const repeats = 15;

//[taskName, command]
let commands = [];

console.log("-".repeat(repeats) + "Test started" + "-".repeat(repeats) + "\n");

process.on("exit", () => console.log("-".repeat(repeats) + "Test finished" + "-".repeat(repeats) + "\n"));

if(process.platform.startsWith("win")) {
	
	commands = [
	
		["generateIndexModel", "node " + path.join(__dirname, "generateStringIndexModel.js")],
		
		["demand", "node " + path.join(__dirname, "demandArgs.js") + " " + args],
		
		["main", "start cmd /k node " + path.join(__dirname, "main.js") + " " + args],
	
	];
	
} else {
	
	throw new Error("Tests for other OS are temporarily not supported.");
	
}

function startTest(commands) {
	
	const command = commands[0];
	
	exec(command[1], (error, stdout, stderr) => {
		
		if (error) console.error(`${capitalizeFirstLetter(command[0])} Exec Error:\n\n${error}`);
		else if(stdout) console.log(`${capitalizeFirstLetter(command[0])} Stdout: ${stdout}`);
		else if(stderr) console.error(`${capitalizeFirstLetter(command[0])} Stderr: ${stderr}`);
		else if(!stdout) console.log(`${capitalizeFirstLetter(command[0])} Stdout: Unknown`);
		
		commands = commands.slice(1);
		
		if(commands.length == 1) {
			
			console.log("Main test results have been opened in a new window and await closure...\n");
			
			exec(commands[commands.length - 1][1]);
			
			return;
			
		} else if(commands.length > 1) {
			
			startTest(commands);
			
		}
		
	});
	
}

startTest(Object.assign([], commands));