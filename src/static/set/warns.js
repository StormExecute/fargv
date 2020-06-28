const isObject = require("../../../dependencies/isObject");

const staticSetWarningOptions = function(optionsState) {
	
	if(!isObject(optionsState)) return this;
	
	const options = {};
	
	if(typeof optionsState.remember == "boolean") {
		
		options.rememberWarns = optionsState.remember;
		
	} else if(typeof optionsState.show == "boolean") {
		
		options.showWarns = optionsState.show;
		
	} else if(typeof optionsState["throw"] == "boolean") {
		
		options.throwInsteadWarns = optionsState["throw"];
		
	} else if(typeof optionsState.parser == "function") {
		
		options.parseWarn = optionsState.parser;
		
	}
	
	return this.options(options);
	
};

module.exports = staticSetWarningOptions;