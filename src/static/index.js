const options = require("./set/options");

const createOptions = require("./createOptionsIfNotExists");

const reset = require("./reset");
const resetAll = require("./resetAll");

const command = require("./set/command");
const separateCommand = require("./set/separateCommand");

const _default = require("./set/default");
const custom = require("./set/custom");

const { customWithGenerate, customWithGenerateFromObject } = require("./set/customWithGenerate");

const demand = require("./set/demand");
const undemand = require("./set/undemand");

const exclude = require("./set/exclude");

const noParse = require("./set/noParse");
const noParseFlags = require("./set/noParseFlags");

const allParse = require("./set/allParse");

const remember = require("./set/remember");

const warns = require("./set/warns");

const arrayParse = require("./set/arrayParse");
const objectParse = require("./set/objectParse");

const state = require("./getState");

const { toFargvStringArray, toFargvStringObject } = require("./fromArrayAndObject");
const { fromFargvStringArray, fromFargvStringObject } = require("./toArrayAndObject");

const { tryToArray, tryToObject } = require("./tryToArrayAndObject");

const generate = require("./generateArgv");
const generateFromObject = require("./generateArgvFromObject");

const init = require("./emulateInit");

module.exports = {
	
	options,

	createOptions,

	reset,
	resetAll,

	command,
	separateCommand,

	"default": _default,
	custom,
	customWithGenerate,
	customWithGenerateFromObject,
	
	demand,
	undemand,
	
	exclude,
	
	noParse,
	noParseFlags,
	
	allParse,
	
	remember,
	
	warns,
	
	arrayParse,
	objectParse,
	
	state,
	
	fromArray: toFargvStringArray,
	fromObject: toFargvStringObject,
	
	toArray: fromFargvStringArray,
	toObject: fromFargvStringObject,
	
	toFargvStringArray,
	toFargvStringObject,
	
	fromFargvStringArray,
	fromFargvStringObject,
	
	tryToArray,
	tryToObject,
	
	generate,
	generateFromObject,
	
	init,
	
};