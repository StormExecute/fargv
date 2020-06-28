const isObject = require("../../../dependencies/isObject");

const { deepCloneArray } = require("../../../dependencies/deepClone");

const staticDemand = function(args, withSkipArgs) {
	
	if(!Array.isArray(args) && typeof args != "string") return this;
	
	if(!isObject(this._options)) this._options = {};
	
	args = Array.isArray(args) ? deepCloneArray([], args) : [args];
	
	const demandType = withSkipArgs ? "demandWithSkippedFlags" : "demandFlags";
	
	return this.options({
		
		[demandType]: Array.isArray(this._options[demandType]) ? deepCloneArray([], this._options[demandType], args) : args
		
	});
	
};

module.exports = staticDemand;