const isObject = require("../../dependencies/isObject");

const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const requiredResult = {
	
	flagA: true,
	
	flagB: 3,
	
	flagC: "value",
	
	flagD: "default",
	
	flagE: ["default", "non-standard"],
	
	flagF: {
		
		a: "non-standard",
		b: "default",
		
	},
	
	flagI: {
		
		some: {
			
			value: true
			
		},
		
	},
	
};

//fargv.default sets mainParse.defaultNoneValue to undefined

const testFlags = fargv.default({

	flagA: true,

	flagB: 1,

	flagC: "some",

	flagD: "default",

	flagE: {

		_options: {

			v: ["default", "default"],
			a: "flagG"

		}

	},

	flagF: {

		_options: {

			v: {

				a: "default",
				b: "default",

			},

			a: ["flagH", "flagF-a2"]

		}
	},

}).default({
	
	flagI: {
		
		some: {
			
			value: true
			
		},
		
	},
	
}).init({
	
	rememberExecFilePath: false,
	
	throwInsteadWarns: true,
	
	allParse: true,
	
	objectParse: {
		
		defaultNoneValue: "someValueFromObjectParse"
		
	},
	
	arrayParse: {
		
		defaultNoneValue: "someValueFromArrayParse"
		
	},
	
}, true);

if(
	objectEquals(testFlags, requiredResult) &&
	isObject(fargv._options) && isObject(fargv._options.defaultArgv) &&
	Array.isArray(fargv._options.defaultArgv.flagE) && Array.isArray(fargv._options.defaultArgv.flagE[1]) &&
	~fargv._options.defaultArgv.flagE[1].indexOf("flagG") &&
	Array.isArray(fargv._options.defaultArgv.flagF) && Array.isArray(fargv._options.defaultArgv.flagF[1]) &&
	~fargv._options.defaultArgv.flagF[1].indexOf("flagH") &&~fargv._options.defaultArgv.flagF[1].indexOf("flagF-a2")
) {
	
	console.log("OK.");
	
} else {
	
	console.error(objectDifference(testFlags, requiredResult));
	
}