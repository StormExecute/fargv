const isObject = require("../../dependencies/isObject");

const { deepCloneObject } = require("../../dependencies/deepClone");

const init = function() {

	return this.apply(global, arguments);
	
};

module.exports = init;