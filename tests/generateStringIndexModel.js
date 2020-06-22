const fs = require("fs");
const path = require("path");

const toPrettyStringObject = require("./toPrettyStringObject");

const { fromArray, fromObject } = require("../src/main");

const parsedArray = require("./defaultModels/parsedArray");
const parsedObject = require("./defaultModels/parsedObject");

const defaultIndexModelPath = "./defaultModels/index.js";

const defaultIndexModel = {
	
	someNumber: 1,
		
	a: fromArray(parsedArray, true).replace(" 444", ","),
	
	b: "22n",
	
	none: null,
	
	noneWithoutEqSym: null,
	
	object: fromObject(parsedObject, true).replace("noneDefault:123", "noneDefault: "),
	
};

fs.writeFileSync(path.join(__dirname, defaultIndexModelPath), "module.exports = " + toPrettyStringObject(defaultIndexModel) + ";");

console.log("defaultIndexModel was generated.");