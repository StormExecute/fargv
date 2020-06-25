module.exports = {
	
	customArgv: null,
	defaultArgv: null,
	
	demandWithSkippedFlags: null,
	demandFlags: null,
	
	excludeFlags: null,
	noParseFlags: null,
	
	rememberExecNodePath: false,
	rememberExecFilePath: true,
	
	rememberWarns: false,
	
	showWarns: true,
	parseWarn: null, //function(warn)
	
	//for demandFlags always true
	throwInsteadWarns: false,
	
	includeEmptyFlags: true,
	unlimitedFlagDefinitionCharacters: true,
	
	supportOnlyLatinArgs: true,
	
	allowSpacesAsValues: true,
	
	//useDefaultNoneValueForFirstSpaceInObjectProp
	useDnvForFirstSpaceOP: true,
	
	noParse: false,
	allParse: false,
	
	mainParse: {
		
		defaultNoneValue: null,
		
		allTypes: false,
		
		mainTypes: false,
		minorTypes: false,
		
		"number": true,
		
		"bigint": false,
		
		"boolean": false,
		"array": false,
		"object": false,
		
		"null": false,
		"undefined": false,
		"NaN": false,
		"Infinity": false,
		
	},
	
	arrayParse: {
		
		maxRecursiveCalls: 10,
		
		defaultNoneValue: null,
		
		allTypes: false,
		
		mainTypes: false,
		minorTypes: false,
		
		"number": true,
		
		"bigint": false,
		
		"boolean": true,
		
		"array": false,
		"object": false,
		
		"null": true,
		"undefined": true,
		"NaN": false,
		"Infinity": false,
		
	},
	
	objectParse: {
		
		/*
		
			ifDuplicateKey = {
				
				rewrite: boolean<true>
				
				warn: boolean<true>
				
			}
		
		*/
		
		ifDuplicateKey: {
			
			rewrite: true,
			
			warn: true
			
		},
		
		maxRecursiveCalls: 10,
		
		defaultNoneValue: null,
		
		allTypes: false,
		
		mainTypes: false,
		minorTypes: false,
		
		"number": true,
		
		"bigint": false,
		
		"boolean": true,
		
		"array": false,
		"object": false,
		
		"null": true,
		"undefined": true,
		"NaN": false,
		"Infinity": false,
		
	},
	
};