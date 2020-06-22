const isObject = require("../dependencies/isObject");
const isNumeric = require("../dependencies/isNumeric");

const errorsData = require("./data/_errors");

const prefix = "\n[fargv]: ";

const errorHandler = function (mainMessage, debugDetails, momentAction, code) {
	
	if(isNumeric(mainMessage)) {
		
		code = mainMessage;
		
		mainMessage = errorsData[mainMessage];
		
	} else if(Array.isArray(mainMessage)) {
		
		[mainMessage, code] = mainMessage;
		
	}
	
	code = code || 0;
	
	const objArg = {"argName": this.argName};
	
	debugDetails = isObject(debugDetails) ? Object.assign(objArg, debugDetails) : objArg;
	
	let result = prefix + mainMessage;
		
	result += " Debug:\n";
	
	for(const k in debugDetails) {
		
		result += `${k}: ${debugDetails[k]}\n`;
		
	}
	
	if(this.usableOptions.rememberWarns) {
		
		this.errors = this.errors || [];
		
		this.errors.push(result);
		
	}
	
	let parseWarnArgs = {};
	
	if(typeof this.usableOptions.parseWarn == "function") {
		
		parseWarnArgs = {
			
			mainMessage,
			debugDetails,
			
			code,
			
			fullMessage: result,
			
		};
		
	}
	
	if(momentAction == "throw") {

		throw new Error(result);
	
	} else if(momentAction == "warn") {
		
		if(this.usableOptions.showWarns) console.warn(result);
		
		if(typeof this.usableOptions.parseWarn == "function") this.usableOptions.parseWarn(parseWarnArgs);
		
	} else if(momentAction == "auto") {
		
		if(this.usableOptions.throwInsteadWarns) throw new Error(result);
		else if(this.usableOptions.showWarns) console.warn(result);
		
		if(typeof this.usableOptions.parseWarn == "function") this.usableOptions.parseWarn(parseWarnArgs);
		
	}
	
	
	return result
	
};

module.exports = errorHandler;