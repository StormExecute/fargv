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
	
	"flagF-a2": {
		
		a: "default",
		b: "default",
		
	},
	
	flagG: ["default", "default"],
	
	flagH: {
		
		a: "default",
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

if(objectEquals(testFlags, requiredResult)) {
	
	console.log("OK.");
	
} else {
	
	console.error(objectDifference(testFlags, requiredResult));
	
}