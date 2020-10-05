const errorHandler = require("./errorHandler");

const checkDemand = require("./checkDemand");

const parseNumeric = require("./parseFunctional/numeric");
const parseMinorAndBoolean = require("./parseFunctional/minorAndBoolean");
const parseArray = require("./parseFunctional/array");
const parseObject = require("./parseFunctional/object");

const parseArrayAndObjectEl = require("./parseFunctional/arrayAndObjectEl");

const getDefaultNoneValue = require("./getDefaultNoneValue");

const parseFlags = require("./parseFlags");
const parseThisFlag = require("./parseThisFlag");

const parseCommands = require("./parseCommands");

const { fargvWrapper, fargv } = require("./fargvWrapper");

fargv.prototype = Object.assign(fargv.prototype, {
	
	errorHandler,

	checkDemand,
	
	getDefaultNoneValue,
	
	parseFlags,
	parseThisFlag,

	parseCommands,

	parseNumeric,
	parseMinorAndBoolean,
	parseArray,
	parseObject,
	
	parseArrayAndObjectEl,
	
});

module.exports = fargvWrapper;