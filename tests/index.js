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

let commandTest = "";

if(process.platform.startsWith("win")) {
	
	commandTest = "start cmd /k node " + path.join(__dirname, "main.js") + " " + args;
	
} else {
	
	throw new Error("Tests for other OS are temporarily not supported.");
	
}

exec(commandTest);