const isObject = require("../../dependencies/isObject");

const createOptionsIfNotExists = function() {
	
	if(!isObject(this._options)) this._options = {};
	
	return this;
	
};

module.exports = createOptionsIfNotExists;