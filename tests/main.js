const fargv = require("../src/main");

const tests = require("./_tests");
const results = require("./_results");

const objectEquals = require("../dependencies/objectEquals");
const objectDifference = require("../dependencies/objectDiff");
const toJson = require("../dependencies/toJson");

function test(id, test, result) {
	
	if(objectEquals(test, result)) {
		
		console.log(`Test #${id}: OK`);
		
		//console.log(test);
		
	} else {
		
		console.log(`Test #${id}: NO`);
		
		console.log("result of this test:", test);
		
		//console.log(toJson(test));
		
		console.log("proper result:", result);
		
		console.log("diff:", objectDifference(test, result));
		
	}
	
}


for(let i = 0; i < tests.length; i++) {
	
	if(i % 2 == 0) {
	
		test(
		
			i + 1, 
		
			fargv(tests[i]), 
			
			results[i]
			
		);
		
	} else {
		
		test(
		
			i + 1, 
			
			fargv.options(tests[i], true).init(),
			
			results[i]
			
		);
		
	}
	
}