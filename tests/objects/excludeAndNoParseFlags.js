const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const requiredResult = {
	
	d: "123",
	
	none: null,
	
	noneTwo: undefined,
	
	someOther: [1, 2, 3n]
	
};

const testFlags = fargv
					.exclude("a")
					.exclude(["b", "c"])
					.noParseFlags(["d", "none"])
					.noParseFlags(["noneTwo"], true)
					.allParse(true)
					.options({ rememberExecFilePath: false })
					.init();
					
if(objectEquals(testFlags, requiredResult)) {
	
	console.log("OK.");
	
} else {
	
	console.error(objectDifference(testFlags, requiredResult));
	
}