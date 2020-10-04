const isObject = require("../dependencies/isObject");

const { deepCloneObject } = require("../dependencies/deepClone");

const defaultOptions = require("./data/_options");

const defaultTypesModel = [

	"numericSeparator",

	"number",
	
	"bigint",
	
	"boolean",
	"array",
	"object",
	
	"null",
	"undefined",
	"NaN",
	"Infinity"

];

const defaultTypesModelAsObjectOfTrues = defaultTypesModel.map(el => ( { [el]: true } ) ).reduce((prev, cur) => Object.assign(cur, prev));

const defaultParseModel = Object.keys(defaultOptions.mainParse);

const parseWhat = ["mainParse", "arrayParse", "objectParse"];

module.exports = function(options) {
	
	if(!isObject(options)) return Object.assign({}, defaultOptions);
	
	if(options.___fargvISPARSED) return Object.assign({}, options);
	
	const usableOptions = deepCloneObject({}, defaultOptions, options);

	if(usableOptions.noParse || usableOptions.noParseNoDefault) return usableOptions;
	
	for(let i = 0; i < parseWhat.length; i++) {
	
		const parse = parseWhat[i];
		
		if(!isObject(usableOptions[parse])) {
			
			usableOptions[parse] = deepCloneObject({}, defaultOptions[parseWhat]);
			
		}
	
	}

	for(const k in options) {
		
		if(defaultParseModel.indexOf(k) != -1) {
			
			//anyway they(usableOptions) have a mainParse property
			usableOptions.mainParse[k] = options[k];
			
		}
		
	}
	
	if(usableOptions.allParse) {
		
		for(let i = 0; i < parseWhat.length; i++) {
	
			const parse = parseWhat[i];
			
			usableOptions[parse] = deepCloneObject(usableOptions[parse], defaultTypesModelAsObjectOfTrues);
			
		}
		
		return usableOptions
		
	}
	
	for(let i = 0; i < parseWhat.length; i++) {
	
		const parse = parseWhat[i];
		
		const opts = deepCloneObject({}, usableOptions[parse]);
		
		const allTypes = opts.allTypes;
		const mainTypes = opts.mainTypes;
		const minorTypes = opts.minorTypes;
		
		if(allTypes) {
			
			//we leave only types
			for(const k in opts) {
			
				if(defaultTypesModel.indexOf(k) == -1) delete opts[k];
			
			}
			
			for(const k in opts) {
			
				usableOptions[parse][k] = true;
				
			}
			
		} else {
			
			if(mainTypes) {
		
				usableOptions[parse] = Object.assign(usableOptions[parse], {
					
					"boolean": true,
					"array": true,
					"object": true,
					
				});
				
			}
			
			if(minorTypes) {
				
				usableOptions[parse] = Object.assign(usableOptions[parse], {
					
					"null": true,
					"undefined": true,
					"NaN": true,
					"Infinity": true,
					
				});
				
			}
			
		}
		
	}
	
	usableOptions.___fargvISPARSED = true;
	
	return usableOptions
	
};