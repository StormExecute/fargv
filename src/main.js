const errorHandler = require("./errorHandler");

const checkDemand = require("./checkDemand");

const parseMinorAndBoolean = require("./parseFunctional/minorAndBoolean");
const parseArray = require("./parseFunctional/array");
const parseObject = require("./parseFunctional/object");
const parseBigInt = require("./parseFunctional/bigint");

const parseArrayAndObjectEl = require("./parseFunctional/arrayAndObjectEl");

const getDefaultNoneValue = require("./getDefaultNoneValue");

const parseFlags = require("./parseFlags");
const parseThisFlag = require("./parseThisFlag");

const { fargvWrapper, fargv } = require("./fargvWrapper");

fargv.prototype = Object.assign(fargv.prototype, {
	
	errorHandler,
	
	checkDemand,
	
	getDefaultNoneValue,
	
	parseFlags,
	parseThisFlag,
	
	parseMinorAndBoolean,
	parseArray,
	parseObject,
	parseBigInt,
	
	parseArrayAndObjectEl,
	
});

module.exports = fargvWrapper;