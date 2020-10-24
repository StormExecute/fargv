const nodePath = require("path");

const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const requiredResult = {

	some: true,
	someTwo: NaN,
	someThree: 1000,

};

const cwd = process.cwd();
const path = nodePath.basename(cwd) == "fargv"
	? nodePath.join(cwd, "./tests/objects/_optionsFromFile.json")
	: nodePath.join(cwd, "./_optionsFromFile.json");

const { flags } = fargv
	.options({ boolean: true })
	.init( [ "useConfigsFromFile", path ], true );

if(objectEquals(flags, requiredResult)) {

	console.log("OK.");

} else {

	console.error(objectDifference(flags, requiredResult));

}