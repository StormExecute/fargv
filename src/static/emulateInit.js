const isObject = require("../../dependencies/isObject");

const { deepCloneObject } = require("../../dependencies/deepClone");

const init = function(options, mergingWithFargvWrapperOptions) {
	
	if(!mergingWithFargvWrapperOptions) return this(options);
	
	if(!isObject(options)) return this();
	
	return this(deepCloneObject({}, this._options, options));
	
};

module.exports = init;