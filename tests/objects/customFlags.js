const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const requiredResult = {
	
	a: 24,
	
	a: 24,
	
	b: "72n",
	
	c: "hi",
	
	d: {hello: "world"},
	
	e: ["finish"],
	
	f: false,
	
	g: true,
	
};

const { flags: testFlags } = fargv.customWithGenerateFromObject({
	
	a: 24,
	
	b: 72n,
	
	c: "hi",
	
	d: {hello: "world"},
	
	e: ["finish"],
	
	f: undefined,
	
}).options({
	
	mainTypes: true
	
}).default({
	
	f: false,
	
	g: true,
	
}).init();

if(objectEquals(testFlags, requiredResult)) {
	
	console.log("OK.");
	
} else {
	
	console.error(objectDifference(testFlags, requiredResult));
	
}