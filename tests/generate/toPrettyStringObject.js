const isObject = require("../../dependencies/isObject");
const isNumeric = require("../../dependencies/isNumeric");

const { fromArray, fromObject } = require("../../src/main");

const toPrettyStringObject = (sourceObject, useQuotesForProps) => {
	
	let result = "{";
	
	useQuotesForProps = useQuotesForProps ? '"' : '';
	
	for(const objectProp in sourceObject) {
		
		let objectValue = sourceObject[objectProp];
		
		let useQuotesForValues = '"';
		
		if(isObject(objectValue)) {
			
			objectValue = fromObject(objectValue, true);
			
		} else if(Array.isArray(objectValue)) {
			
			objectValue = fromArray(objectValue, true);
			
		} else if(typeof objectValue == "bigint") {

			objectValue = objectValue + "n";

		//undefined == null && undefined == undefined
		} else if(isNumeric(objectValue) || objectValue == true || objectValue == false || objectValue == undefined || Object.is(NaN, objectValue) || objectValue == Infinity) {

			useQuotesForValues = '';

		}
		
		result += `\n\n\t${useQuotesForProps}${objectProp}${useQuotesForProps}: ${useQuotesForValues}${objectValue}${useQuotesForValues},`;
		
	}
	
	if(result == "{") return "{}";
	
	result += "\n\n}";
	
	return result;
	
};

module.exports = toPrettyStringObject;