const options = require("./set/options");

const _default = require("./set/default");
const custom = require("./set/custom");

const { customWithGenerate, customWithGenerateFromObject } = require("./set/customWithGenerate");

const demand = require("./set/demand");
const undemand = require("./set/undemand");

const exclude = require("./set/exclude");

const noParse = require("./set/noParse");
const noParseFlags = require("./set/noParseFlags");

const state = require("./getState");

const { toFargvStringArray, toFargvStringObject } = require("./fromArrayAndObject");
const { fromFargvStringArray, fromFargvStringObject } = require("./toArrayAndObject");

const { tryToArray, tryToObject } = require("./tryToArrayAndObject");

const generate = require("./generateArgv");
const generateFromObject = require("./generateArgvFromObject");

const init = require("./emulateInit");

module.exports = {
	
	options,
	
	"default": _default,
	custom,
	customWithGenerate,
	customWithGenerateFromObject,
	
	demand,
	undemand,
	
	exclude,
	
	noParse,
	noParseFlags,
	
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