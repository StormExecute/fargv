const isNumeric = require("../../dependencies/isNumeric");

const parseArrayAndObjectEl = function(el, _from) {
	
	if(this.usableOptions.allowSpacesAsValues) {
		
		if(this.usableOptions.useDnvForFirstSpaceOP && _from == "object" && el == " ") {
			
			el = this.getDefaultNoneValue("objectParse") || this.getDefaultNoneValue("mainParse");
			
		} else if(el != " ") {
			
			el = el ? el.replace(/^\s+/, "") : undefined;
			
		}
		
	} else {
			
		el = el ? el.trim() : undefined;
	
	}
	
	if(!el) {
		
		if(_from == "array") return this.getDefaultNoneValue("arrayParse") || this.getDefaultNoneValue("mainParse");
		else if(_from == "object") return this.getDefaultNoneValue("objectParse") || this.getDefaultNoneValue("mainParse");
		else return this.getDefaultNoneValue("mainParse");
		
	}
	
	const options = _from == "array" ? this.usableOptions.arrayParse : _from == "object" ? this.usableOptions.objectParse : this.usableOptions.mainParse;

	const elCopy = el;
	
	if(options["number"]) {

		el = this.parseNumeric(el, _from);

	}

	if(elCopy !== el) return el;
	
	el = this.parseMinorAndBoolean(el, _from);
	
	if(elCopy != el) return el;
	
	return this.parseBigInt(el, _from) //bigint || string
	
};

module.exports = parseArrayAndObjectEl;