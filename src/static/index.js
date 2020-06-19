const options = require("./setOptions");
const _default = require("./setDefault");

const state = require("./getState");

const { toFargvArray, toFargvObject } = require("./toArrayAndObject");

const generate = require("./generateArgv");
const generateFromObject = require("./generateArgvFromObject");

const init = require("./emulateInit");

module.exports = {
	
	options,
	_default,
	
	state,
	
	toArray: toFargvArray,
	toObject: toFargvObject,
	
	generate,
	generateFromObject,
	
	init,
	
};