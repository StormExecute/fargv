const errorHandler = require("./errorHandler");

const showHelp = require("./showHelp");

const checkDemand = require("./checkDemand");

const parseNumeric = require("./parseFunctional/numeric");
const parseMinorAndBoolean = require("./parseFunctional/minorAndBoolean");
const parseArray = require("./parseFunctional/array");
const parseObject = require("./parseFunctional/object");

const parseArrayAndObjectEl = require("./parseFunctional/arrayAndObjectEl");

const getDefaultNoneValue = require("./getDefaultNoneValue");

const parseFlagAliases = require("./parseFlagAliases");
const parseCommandAliases = require("./parseCommandAliases");

const parseFlags = require("./parseFlags");
const parseThisFlag = require("./parseThisFlag");

const validateCommands = require("./validateCommands");
const parseCommands = require("./parseCommands");

const { fargvWrapper, fargv } = require("./fargvWrapper");

fargv.prototype = Object.assign(fargv.prototype, {
	
	errorHandler,

	showHelp,

	checkDemand,
	
	getDefaultNoneValue,

	parseFlagAliases,
	parseCommandAliases,
	
	parseFlags,
	parseThisFlag,

	validateCommands,
	parseCommands,

	parseNumeric,
	parseMinorAndBoolean,
	parseArray,
	parseObject,
	
	parseArrayAndObjectEl,
	
});

module.exports = fargvWrapper;