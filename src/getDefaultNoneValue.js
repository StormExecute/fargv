const copyV = require("../dependencies/copyValWithoutBind");

const getDefaultNoneValue = function(_from) {
	
	return copyV(this.usableOptions[_from].defaultNoneValue);
	
};

module.exports = getDefaultNoneValue;