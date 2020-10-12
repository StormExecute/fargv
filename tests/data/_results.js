const { execFilePath, execNodePath, execFileBasename } = require("../_paths");

const defaultArgv = require("../defaultModels");

const parsedArray = require("../defaultModels/parsedArray");
const parsedObject = require("../defaultModels/parsedObject");

const without = require("../../dependencies/objectWithout");

const { deepCloneObject } = require("../../dependencies/deepClone");

const assign = function(defaultObj, flags, topLevelObject) {

	flags = flags || {};
	topLevelObject = topLevelObject || {};
	
	return deepCloneObject({}, {

		warns: null,

		flags: defaultObj,

		commands: {},

	}, { flags }, topLevelObject)
	
};

const defaultUnderscore = {

	_: { execNodePath, execFileBasename },

};

module.exports = [

	{
		
		_: { execFilePath, execFileBasename },

		warns: null,
		
		flags: { ...defaultArgv },
		commands: {},
		
	},
	
	assign(defaultArgv, {

		someNumber: "1",

	}, defaultUnderscore),
	
	assign(without(defaultArgv, "noneWithoutEqSym")),
	
	assign(without(defaultArgv, "b"), null, {

		_: { execFilePath, execFileBasename }

	}),
	
	assign(defaultArgv, {
		
		someNumber: "1",
		
		none: "",
		
		noneWithoutEqSym: undefined,
		
	}),
	
	assign(defaultArgv, {
		
		a: parsedArray,
		
		"099": 123,
		
		none: 123,
		
		noneWithoutEqSym: 123,
		
		object: parsedObject,
		
	}, {

		_: { execNodePath, execFilePath, execFileBasename }

	}),

];