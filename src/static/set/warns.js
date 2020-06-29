const isObject = require("../../../dependencies/isObject");

const staticSetWarningOptions = function(optionsState) {
	
	if(!isObject(optionsState)) return this;
	
	const options = {};
	
	if(typeof optionsState.remember == "boolean") {
		
		options.rememberWarns = optionsState.remember;
		
	}
	
	if(typeof optionsState.show == "boolean") {
		
		options.showWarns = optionsState.show;
		
	}
	
	if(typeof optionsState["throw"] == "boolean") {
		
		options.throwInsteadWarns = optionsState["throw"];
		
	}
	
	if(typeof optionsState["throwInsteadWarns"] == "boolean") {
		
		options.throwInsteadWarns = optionsState["throwInsteadWarns"];
		
	}
	
	if(typeof optionsState.parser == "function") {
		
		options.parseWarn = optionsState.parser;
		
	}
	
	return this.options(options);
	
};

module.exports = staticSetWarningOptions;