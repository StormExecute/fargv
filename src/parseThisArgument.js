const isNumeric = require("../dependencies/isNumeric");

const parseThisArgument = function(aName, aValue) {
		
	this.argName = aName || "?";
	
	if(this.usableOptions.mainParse["number"] && isNumeric(aValue)) return parseFloat(aValue);

	let argValue = this.parseMinorAndBoolean(aValue);
	
	if(argValue != aValue) return argValue;
	
	if(this.usableOptions.mainParse["array"] && argValue.startsWith("[") && argValue.endsWith("]")) {
		
		argValue = argValue.slice(1);
		argValue = argValue.slice(0, -1);
		
		return this.parseArray(argValue)
		
	}
	
	if(this.usableOptions.mainParse["object"] && argValue.startsWith("{") && argValue.endsWith("}")) {
		
		argValue = argValue.slice(1);
		argValue = argValue.slice(0, -1);
		
		return this.parseObject(argValue)
		
	}
	
	return this.parseBigInt(argValue) //bigint || string
	
}

module.exports = parseThisArgument;