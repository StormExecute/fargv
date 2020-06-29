const isNumeric = require("../../dependencies/isNumeric");

const tryIsItBigInt = require("../../dependencies/tryIsItBigInt");

const parseBigInt = function (argValue, _from) {
	
	const options = !_from ? this.usableOptions.mainParse : _from == "array" ? this.usableOptions.arrayParse : _from == "object" ? this.usableOptions.objectParse : {};
	
	if(options["bigint"] && typeof BigInt != "undefined" && argValue.length > 1) {
		
		const withoutN = argValue.replace(/n$/, "");
		
		if(!isNumeric(withoutN)) return argValue;
		
		const attemp = tryIsItBigInt(withoutN);
		
		if(attemp) argValue = attemp;
		
	}
	
	return argValue
	
};

module.exports = parseBigInt;