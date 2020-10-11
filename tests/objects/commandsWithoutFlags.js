const nodePath = require("path");

const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const { execFilePath } = require("../_paths");

const thisExecFilePath = nodePath.resolve(execFilePath, "../commandsWithoutFlags.js");

const requiredState = {
	
	_: {

		execFilePath: thisExecFilePath,
		execFileBasename: nodePath.basename(thisExecFilePath),

	},
	
	flags: {}
	
};

const requiredCommands = [

	["someValue"],
	["someProp", "someValue"],

];

let maxUpTest = 2;
let nowUpTest = 0;

function upTest(about, state, nextCommands) {
	
	nowUpTest++;

	if(about == "just configure" && nowUpTest == 1) {
		
		console.error("Invalid command sequence.");
		
		process.exit();
		
	}
	
	if(objectEquals(state, requiredState)) {
		
		if(objectEquals({a: nextCommands}, {a: requiredCommands[nowUpTest - 1]})) {
		
			if(nowUpTest == 2) console.log("OK.");
		
		} else {
			
			console.error(nowUpTest, objectDifference({a: nextCommands}, {a: requiredCommands[nowUpTest - 1]}));
			
		}
		
	} else {
		
		console.error(nowUpTest, objectDifference(state, requiredState));
		
	}
	
}

fargv
	.options({
		
		nextCommandsAsArray: true
		
	})
	.command("configure", function(state, nextCommands) {

		upTest("just configure", state, nextCommands)

	})
	.command("configure someProp", function(state, nextCommands) {

		upTest("configure subclass", state, nextCommands);

	})
	.command(function () {

		console.error("Something went wrong.");

	})
	.init({ callAppropriateCommandHandlerOnlyOnce: false }, true);