const objectEquals = require("../../dependencies/objectEquals");
const objectDifference = require("../../dependencies/objectDiff");

const fargv = require("../../src/main");

let parserCalled = false;

const parser = function(warnDetails) {
	
	parserCalled = true;
	
};

const requiredResultOptions = {
	
	rememberWarns: true,
	
	showWarns: false,
	
	parseWarn: parser,
	
	allParse: true,
	
	customArgv: [
	
		"-a={b}"
	
	],
	
};

const requiredWarning = '\n' +
	"[fargv]: Object doesn't have a colon. Debug:\n" +
	'argName: a\n' +
	'from: parseObject\n' +
	'maxRecursiveCalls: 10\n' +
	'nowCall: 0\n' +
	'tempKey: b\n';

const testOptions = fargv.warns({
	
	remember: true,
	
	show: false,
	
	parser,
	
}).allParse(true).options({
	
	customArgv: [
	
		"-a={b}"
	
	],
	
});

const testFlags = fargv.init();

if(!parserCalled) {

	console.error("Parser wasn't called");
	
} else if(objectEquals(testOptions._options, requiredResultOptions)) {
	
	const requiredResultFlags = {
		
		a: {},
		
		_warns: [requiredWarning],
		
	};
	
	if(objectEquals(testFlags, requiredResultFlags)) {
		
		process.on('uncaughtException', err => {
			
			if(err.message == requiredWarning) console.log("OK.");
			else console.error(err);
			
		});
		
		const testFlagsSecond = fargv.warns({
			
			"throw": true
			
		}).init({
			
			customArgv: [

				"-a={b}"

			],

		}, true);
		
	} else {
		
		console.error(objectDifference(testFlags, requiredResultFlags));
		
	}
	
} else {
	
	console.error(objectDifference(testOptions._options, requiredResultOptions));
	
}