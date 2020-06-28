module.exports = [

	{
		
		/* allTypes: true,
		
		objectParse: {
			
			allTypes: true,
			
		}, */
		
	},
	
	{
		
		noParse: true,
		
		rememberExecFilePath: false,
		
		rememberExecNodePath: true,
		
	},
	
	{
		
		rememberExecFilePath: false,
		
		includeEmptyFlags: false,
		
	},
	
	{
		
		excludeFlags: ["b"],
		
	},

	{
		
		supportOnlyLatinArgs: false,
		
		rememberExecNodePath: true,
		
		mainTypes: true,
		
		arrayParse: {
			
			object: true,
			
			array: true,
			
			bigint: true,
			
			defaultNoneValue: 444,
			
		},
		
		objectParse: {
			
			allTypes: true,
			
		},
		
		defaultNoneValue: 123,
		
	},

];