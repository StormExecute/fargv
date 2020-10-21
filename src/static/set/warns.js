const isObject = require("../../../dependencies/isObject");

const { deepCloneObject } = require("../../../dependencies/deepClone");

const defaultOptions = require("../../data/_options");

const staticSetWarningOptions = function(optionsState) {
	
	if(optionsState == "reset") {
		
		this.createOptions();
		
		this._options = deepCloneObject(this._options, {
			
			rememberWarns: defaultOptions.rememberWarns,
			showWarns: defaultOptions.showWarns,
			throwInsteadWarns: defaultOptions.throwInsteadWarns,
			parseWarn: defaultOptions.parseWarn,
			
		});
		
		return this;
		
	}
	
	if(!isObject(optionsState)) return this;
	
	const options = {};
	
	if(typeof optionsState.remember == "boolean") {
		
		options.rememberWarns = optionsState.remember;
		
	}
	
	if(typeof optionsState.show == "boolean") {
		
		options.showWarns = optionsState.show;
		
	}
	
	if(typeof optionsState["throw"] == "boolean" && !optionsState.hasOwnProperty("throwInsteadWarns")) {
		
		options.throwInsteadWarns = optionsState["throw"];
		
	} else if(typeof optionsState["throwInsteadWarns"] == "boolean" && !optionsState.hasOwnProperty("throw")) {
		
		options.throwInsteadWarns = optionsState["throwInsteadWarns"];
		
	}
	
	if(typeof optionsState.parser == "function") {
		
		options.parseWarn = optionsState.parser;
		
	}
	
	return this.options(options);
	
};

module.exports = staticSetWarningOptions;