const fs = require("fs");
const path = require("path");

const toPrettyStringObject = require("./toPrettyStringObject");

const { fromArray, fromObject } = require("../../src/main");

const parsedArray = require("../defaultModels/parsedArray");
const parsedObject = require("../defaultModels/parsedObject");

const defaultIndexModelPath = "../defaultModels/index.js";

const defaultIndexModel = {
	
	someNumber: 1,
		
	a: fromArray(parsedArray, true).replace(" 444", ","),
	
	b: "22n",
	
	none: null,
	
	noneWithoutEqSym: null,
	
	object: fromObject(parsedObject, true).replace("noneDefault:123", "noneDefault: "),
	
};

const isWindows = process.platform.startsWith("win");

let prettyDefaultIndexModel = toPrettyStringObject(defaultIndexModel);

if(isWindows) {

	//to CRLF

	prettyDefaultIndexModel = prettyDefaultIndexModel.replace(/\n/g, "\r\n")

} else {

	//to LF

	prettyDefaultIndexModel = prettyDefaultIndexModel.replace(/\r\n/g, "\n")

}

fs.writeFileSync(

	path.join(__dirname, defaultIndexModelPath),
	
	"module.exports = " + prettyDefaultIndexModel + ";",
	
	{encoding: 'utf8'},
	
);

console.log("defaultIndexModel was generated.");