const copyV = require("../dependencies/copyValWithoutBind");

const getDefaultNoneValue = function(from) {
	
	return copyV(this.usableOptions[from].defaultNoneValue);
	
};

module.exports = getDefaultNoneValue;