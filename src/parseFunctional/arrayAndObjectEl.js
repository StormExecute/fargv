const isNumeric = require("../../dependencies/isNumeric");

const parseArrayAndObjectEl = function(el, from) {
	
	if(this.usableOptions.allowSpacesAsValues) {
		
		if(this.usableOptions.useDnvForFirstSpaceOP && from == "object" && el == " ") {
			
			el = this.getDefaultNoneValue("objectParse") || this.getDefaultNoneValue("mainParse");
			
		} else if(el != " ") {
			
			el = el ? el.replace(/^\s+/, "") : undefined;
			
		}
		
	} else {
			
		el = el ? el.trim() : undefined;
	
	}
	
	if(!el) {
		
		if(from == "array") return this.getDefaultNoneValue("arrayParse") || this.getDefaultNoneValue("mainParse");
		else if(from == "object") return this.getDefaultNoneValue("objectParse") || this.getDefaultNoneValue("mainParse");
		else return this.getDefaultNoneValue("mainParse");
		
	}
	
	const options = from == "array" ? this.usableOptions.arrayParse : from == "object" ? this.usableOptions.objectParse : this.usableOptions.mainParse;
	
	if(options["number"] && isNumeric(el)) return parseFloat(el);
	
	const elCopy = el;
	
	el = this.parseMinorAndBoolean(el, from);
	
	if(elCopy != el) return el;
	
	return this.parseBigInt(el, from) //bigint || string
	
};

module.exports = parseArrayAndObjectEl;