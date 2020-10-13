const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const requiredResult = {
	
	d: "123",
	
	none: "default",

	//noneTwo (withoutEqualSym, thPArg.length == 1 => undefined)
	noneTwo: undefined,

	//".default" takes precedence over ".noParseFlags"
	noneThree: 333,
	
	someOther: [1, 2, 3n]
	
};

//priority(from smaller to larger): allParse, noParse, noParseNoDefault, default
const testFlags = fargv
					.exclude("a")
					.exclude(["b", "c"])
					//"default" should stand higher, since it sets "undefined" in "defaultNoneValue"
					.default({ noneThree: 333 })
					.options({ defaultNoneValue: "default" })
					.noParseFlags(["d", "none"])
					.noParseFlags(["noneTwo", "noneThree"], true)
					.allParse(true)
					.options({ rememberExecFilePath: false })
					.options({ returnFilter: "flags" })
					.init();
					
if(objectEquals(testFlags, requiredResult)) {
	
	console.log("OK.");
	
} else {
	
	console.error(objectDifference(testFlags, requiredResult));
	
}