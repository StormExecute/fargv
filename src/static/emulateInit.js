const isObject = require("../../dependencies/isObject");

const { deepCloneObject } = require("../../dependencies/deepClone");

const init = function(options, mergingWithFargvWrapperOptions) {
	
	if(!mergingWithFargvWrapperOptions) return this(options);
	
	if(!isObject(options)) return this();

	this.createOptions();

	this._options = deepCloneObject(this._options, options);
	
	return this();
	
};

module.exports = init;