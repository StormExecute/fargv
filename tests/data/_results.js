const { execFilePath, execNodePath, execFileBasename } = require("../_paths");

const defaultArgv = require("../defaultModels");

const parsedArray = require("../defaultModels/parsedArray");
const parsedObject = require("../defaultModels/parsedObject");

const without = require("../../dependencies/objectWithout");

const { deepCloneObject } = require("../../dependencies/deepClone");

const assign = function(defaultObj, newObj) {
	
	return deepCloneObject({}, defaultObj, newObj)
	
};

module.exports = [

	{
		
		_: { execFilePath, execFileBasename },
		
		...defaultArgv
		
	},
	
	assign(defaultArgv, {
		
		_: { execNodePath, execFileBasename },
		
		someNumber: "1",
		
	}),
	
	assign(without(defaultArgv, "noneWithoutEqSym")),
	
	assign(without(defaultArgv, "b"), {
		
		_: { execFilePath, execFileBasename }
		
	}),
	
	assign(defaultArgv, {
		
		someNumber: "1",
		
		none: "",
		
		noneWithoutEqSym: undefined,
		
	}),
	
	assign(defaultArgv, {
		
		_: { execNodePath, execFilePath, execFileBasename },
		
		a: parsedArray,
		
		"099": 123,
		
		none: 123,
		
		noneWithoutEqSym: 123,
		
		object: parsedObject,
		
	}),

];