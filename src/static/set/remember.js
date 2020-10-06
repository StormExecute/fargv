const isObject = require("../../../dependencies/isObject");

const { deepCloneObject } = require("../../../dependencies/deepClone");

const getValue = require("../../../dependencies/getAnyPropValIfExists");

const defaultOptions = require("../../data/_options");

const staticSetRemember = function(rememberState) {
	
	if(rememberState == "reset") {
		
		this.createOptions();
		
		this._options = deepCloneObject(this._options, {
			
			rememberExecFilePath: defaultOptions.rememberExecFilePath,
			rememberExecNodePath: defaultOptions.rememberExecNodePath,
			
		});
		
		return this;
		
	}
	
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