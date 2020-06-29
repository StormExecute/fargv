const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const requiredResult = {
	
	array: [
	
		"{a:[]}",
		
		1,
		
		"str",
		
		[1, 2, 3]
		
	],
	
	object: {
		
		a: [],
		
		b: "{a:2}"
		
	},
	
};

const testFlags = fargv.arrayParse({
	
	array: true
	
}).objectParse({
	
	array: true
	
}).options({
	
	rememberExecFilePath: false,
	
	mainTypes: true,
	
}).init();

if(objectEquals(testFlags, requiredResult)) {
	
	console.log("OK.");
	
} else {
	
	console.error(objectDifference(testFlags, requiredResult));
	
}