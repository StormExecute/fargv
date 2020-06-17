const isObject = require("../dependencies/isObject");

const prefix = "\n[fargv]: ";
//const prefix = "[fargv]: ";

const errorHandler = function (mainMsg, from) {
	
	const objArg = {"argument name": this.argName};
	
	from = isObject(from) ? Object.assign(objArg, from) : objArg;
	
	let result = prefix + mainMsg;
		
	result += " Debug:\n";
	
	for(const k in from) {
		
		result += `${k}: ${from[k]}\n`;
		
	}
	
	//result = result.slice(0, -1);
	
	return result
	
};

module.exports = errorHandler;