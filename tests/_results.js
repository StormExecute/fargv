const { execFilePath, execNodePath } = require("./_paths");

const defaultArgv = require("./defaultModels");

const parsedArray = require("./defaultModels/parsedArray");
const parsedObject = require("./defaultModels/parsedObject");

const without = require("../dependencies/objectWithout");

const assign = function(defaultObj, newObj) {
	
	return Object.assign({}, defaultObj, newObj)
	
};

module.exports = [

	{
		
		_: { execFilePath },
		
		...defaultArgv
		
	},
	
	assign(defaultArgv, {
		
		_: { execNodePath },
		
		someNumber: "1",
		
	}),
	
	assign(without(defaultArgv, "noneWithoutEqSym")),
	
	assign(defaultArgv, {
		
		_: { execNodePath, execFilePath },
		
		a: parsedArray,
		
		"099": 123,
		
		none: 123,
		
		noneWithoutEqSym: 123,
		
		object: parsedObject,
		
	}),

];