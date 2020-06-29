const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

const requiredFlags = {
	
	useSome: true,
	save: true,
	someArgs: [1, 2324, 4242, true, "yes"],
	
};

const requiredPackages = "someFirstPacket,someSecondPacket,someThirdPacket";

const requiredSomeNext = "someNext";

fargv
	.options({
		
		boolean: true,
		array: true
		
	})
	.command("install", function(state, packages, someNext) {
		
		if(objectEquals(state.flags, requiredFlags)) {
			
			if(packages == requiredPackages) {
				
				if(someNext == requiredSomeNext) {
			
					console.log("OK.");
					
				} else {
					
					console.error(`Wrong someNext: ${someNext}. Required: ${requiredSomeNext}`);
					
				}
				
			} else {
				
				console.error(`Packages: ${packages}. Required: ${requiredPackages}.`);
				
			}
			
		} else {
			
			console.error(objectDifference(state.flags, requiredFlags));
			
		}
		
	})
	()