const isObject = require("../../dependencies/isObject");

const { deepCloneArray, deepCloneObject } = require("../../dependencies/deepClone");

const staticDemand = function(args, withSkipArgs) {
	
	if(!isObject(this._options)) this._options = {};
	
	args = Array.isArray(args) ? args : [args];
	
	const demandType = withSkipArgs ? "demandWithSkipArgs" : "demandArgs";
	
	this.options({
		
		[demandType]: Array.isArray(this._options[demandType]) ? deepCloneObject(this._options[demandType], args) : deepCloneArray([], args)
		
	}, true);
	
	return this;
	
};

module.exports = staticDemand;