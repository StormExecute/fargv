const isObject = require("../../dependencies/isObject");

const { deepCloneArray } = require("../../dependencies/deepClone");

const staticDemand = function(args, withSkipArgs) {
	
	if(!isObject(this._options)) this._options = {};
	
	args = Array.isArray(args) ? deepCloneArray([], args) : [args];
	
	const demandType = withSkipArgs ? "demandWithSkippedFlags" : "demandFlags";
	
	this.options({
		
		[demandType]: Array.isArray(this._options[demandType]) ? deepCloneArray(this._options[demandType], args) : deepCloneArray([], args)
		
	});
	
	return this;
	
};

module.exports = staticDemand;