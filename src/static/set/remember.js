const isObject = require("../../../dependencies/isObject");

const { deepCloneObject } = require("../../../dependencies/deepClone");

const getValue = require("../../../dependencies/getAnyPropValIfExists");

const defaultOptions = require("../../data/_options");

const staticSetRemember = function(rememberState) {
	
	if(rememberState == "reset") {
		
		this.createOptions();
		
		this._options = deepCloneObject(this._options, {

			rememberExecFileBasename: defaultOptions.rememberExecFileBasename,
			rememberExecFilePath: defaultOptions.rememberExecFilePath,
			rememberExecNodePath: defaultOptions.rememberExecNodePath,
			
		});
		
		return this;
		
	}
	
	if(!isObject(rememberState)) return this;
	
	const options = {};

	if(typeof rememberState.file == "boolean" || typeof rememberState.fileName == "boolean" || typeof rememberState.execFileBasename == "boolean") {

		options.rememberExecFileBasename = getValue(rememberState, ["file", "fileName", "execFileBasename"], defaultOptions.rememberExecFileBasename);

	}
	
	if(typeof rememberState.filePath == "boolean" || typeof rememberState.execFilePath == "boolean") {
		
		options.rememberExecFilePath = getValue(rememberState, ["filePath", "execFilePath"], defaultOptions.rememberExecFilePath);
		
	}

	if(typeof rememberState.node == "boolean" || typeof rememberState.nodePath == "boolean" || typeof rememberState.execNodePath == "boolean") {
		
		options.rememberExecNodePath = getValue(rememberState, ["node", "nodePath", "execNodePath"], defaultOptions.rememberExecNodePath);
		
	}
	
	return this.options(options);
	
};

module.exports = staticSetRemember;