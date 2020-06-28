const options = require("./setOptions");

const _default = require("./setDefault");
const custom = require("./setCustom");

const demand = require("./demand");
const undemand = require("./undemand");

const state = require("./getState");

const { toFargvStringArray, toFargvStringObject } = require("./fromArrayAndObject");
const { fromFargvStringArray, fromFargvStringObject } = require("./toArrayAndObject");

const { tryToArray, tryToObject } = require("./tryToArrayAndObject");

const generate = require("./generateArgv");
const generateFromObject = require("./generateArgvFromObject");

const init = require("./emulateInit");

module.exports = {
	
	options,
	
	_default,
	custom,
	
	demand,
	undemand,
	
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