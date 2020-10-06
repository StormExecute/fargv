const { deepCloneArray } = require("../../../dependencies/deepClone");

const staticDemand = function(args, withSkipArgs) {
	
	if(!Array.isArray(args) && typeof args != "string") return this;
	
	this.createOptions();
	
	const demandType = withSkipArgs ? "demandWithSkippedFlags" : "demandFlags";
	
	if(args == "reset") {
	
		this._options[demandType] = null;
		
	}
	
	args = Array.isArray(args) ? deepCloneArray([], args) : [args];
	
	return this.options({
		
		[demandType]: Array.isArray(this._options[demandType]) ? deepCloneArray([], this._options[demandType], args) : args
		
	});
	
};

module.exports = staticDemand;