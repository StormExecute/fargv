module.exports = {
	
	customArgsList: null,
	
	rememberExecNodePath: false,
	rememberExecFilePath: true,
	
	throwInsteadWarns: false,
	
	supportEmptyFlags: true,
	unlimitedFlagDefinitionCharacters: true,
	
	supportOnlyLatinArgs: true,
	
	allowSpacesAsValues: true,
	
	//useDefaultNoneValueForFirstSpaceInObjectProp
	useDnvForFirstSpaceOP: true,
	
	noParse: false,
	
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