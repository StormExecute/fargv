const isNumeric = require("../../dependencies/isNumeric");

const tryIsItBigInt = require("../../dependencies/tryIsItBigInt");

const parseBigInt = function (argValue, from) {
	
	const options = !from ? this.usableOptions.mainParse : from == "array" ? this.usableOptions.arrayParse : from == "object" ? this.usableOptions.objectParse : {};
	
	if(options["bigint"] && typeof BigInt != "undefined" && argValue.length > 1) {
		
		const withoutN = argValue.replace(/n$/, "");
		
		if(!isNumeric(withoutN)) return argValue;
		
		const attemp = tryIsItBigInt(withoutN);
		
		if(attemp) argValue = attemp;
		
	}
	
	return argValue
	
};

module.exports = parseBigInt;