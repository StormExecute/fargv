const isObject = require("../dependencies/isObject");

const defaultOptions = require("./data/_options");

const defaultTypesModel = [

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

const defaultTypesModelAsObjectOfTrues = defaultTypesModel.map(el => ( { [el]: true } ) ).reduce((prev, cur) => Object.assign(cur, prev))

const defaultParseModel = Object.keys(defaultOptions.mainParse);

module.exports = function(options) {
	
	if(!isObject(options)) return defaultOptions;
	
	if(options.___fargvISPARSED) return options;
	
	const usableOptions = Object.assign({}, defaultOptions, options);
	
	if(usableOptions.noParse) return usableOptions;
		
	if(options.mainParse) {
	
		usableOptions.mainParse = Object.assign({}, defaultOptions.mainParse, options.mainParse);
		
	} else {
		
		for(const k in options) {
			
			if(defaultParseModel.indexOf(k) != -1) {
				
				//anyway they(usableOptions) have a mainParse property
				usableOptions.mainParse[k] = options[k];
				
			}
			
		}
		
	}
	
	if(options.arrayParse) {
		
		usableOptions.arrayParse = Object.assign({}, defaultOptions.arrayParse, options.arrayParse);
		
	}
	
	if(options.objectParse) {
		
		usableOptions.objectParse = Object.assign({}, defaultOptions.objectParse, options.objectParse);
		
		if(!isObject(usableOptions.objectParse.ifDuplicateKey)) {
			
			usableOptions.object.ifDuplicateKey = Object.assign({}, defaultOptions.objectParse.ifDuplicateKey);
			
		}
		
	}
	
	if(usableOptions.allParse) {
		
		for(const parse of ["mainParse", "arrayParse", "objectParse"]) {
			
			usableOptions[parse] = Object.assign(usableOptions[parse], defaultTypesModelAsObjectOfTrues);
			
		}
		
		return usableOptions
		
	}
	
	for(const parse of ["mainParse", "arrayParse", "objectParse"]) {
		
		const opts = Object.assign({}, usableOptions[parse]);
		
		const allTypes = opts.allTypes;
		const mainTypes = opts.mainTypes;
		const minorTypes = opts.minorTypes;
		
		//we leave only types
		for(const k in opts) {
		
			if(defaultTypesModel.indexOf(k) == -1) delete opts[k];
		
		}
		
		if(allTypes) {
			
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