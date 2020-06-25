const isObject = require("../../dependencies/isObject");

const staticUnDemand = function(args, withSkipArgs) {
	
	if(!isObject(this._options)) return this;
	
	const demandType = withSkipArgs ? "demandWithSkippedFlags" : "demandFlags";
	
	if(!Array.isArray(this._options[demandType])) return this;
	
	args = Array.isArray(args) ? args : [args];
	
	for(let i = 0; i < args.length; i++) {
		
		const indexOf = this._options[demandType].indexOf(args[i]);
		
		if(indexOf != -1) this._options[demandType].splice(indexOf, 1);
		
	}
	
	return this;
	
};

module.exports = staticUnDemand;