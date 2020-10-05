const parseThisFlag = function(aName, aValue) {
		
	this.argName = aName || "?";

	let argValue = "";
	
	if(this.usableOptions.mainParse["number"]) {

		argValue = this.parseNumeric(aValue);

	}

	if(argValue !== aValue) return argValue;

	argValue = this.parseMinorAndBoolean(aValue);
	
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

module.exports = parseThisFlag;