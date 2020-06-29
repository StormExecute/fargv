const isObject = require("../../../dependencies/isObject");

const getValue = require("../../../dependencies/getAnyPropValIfExists");

//just in case
const defaultOptions = require("../../data/_options");

const staticSetRemember = function(rememberState) {
	
	if(!isObject(rememberState)) return this;
	
	const options = {};
	
	if(typeof rememberState.file == "boolean" || typeof rememberState.filePath == "boolean" || typeof rememberState.execFilePath == "boolean") {
		
		options.rememberExecFilePath = getValue(rememberState, ["file", "filePath", "execFilePath"], defaultOptions.rememberExecFilePath);
		
	}
	if(typeof rememberState.node == "boolean" || typeof rememberState.nodePath == "boolean" || typeof rememberState.execNodePath == "boolean") {
		
		options.rememberExecNodePath = getValue(rememberState, ["node", "nodePath", "execNodePath"], defaultOptions.rememberExecNodePath);
		
	}
	
	return this.options(options);
	
};

module.exports = staticSetRemember;