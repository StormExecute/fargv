const parseFlags = function(argsList, parsedArgs, rememberAllForDemandWithSkippedFlags) {
	
	for(let a = 0; a < argsList.length; a++) {

		const thArg = argsList[a];
		
		if(typeof thArg != "string" && this.usableOptions.customArgv) continue;
		
		if(rememberAllForDemandWithSkippedFlags) {
			
			const thPArg = thArg.split("=");
			
			const argName = thPArg[0].replace(/^-+/, "");
			
			rememberAllForDemandWithSkippedFlags[argName] = 1;
			
		}
		
		const isArgument = this.usableOptions.unlimitedFlagDefinitionCharacters ? thArg.startsWith("-") : thArg.startsWith("--") || thArg.match(/^-\w/i);

		if(isArgument && (!this.usableOptions.includeEmptyFlags ? thArg.includes("=") : true)) {

			const thPArg = thArg.split("=");
			
			const argName = thPArg[0].replace(/^-+/, "");
			
			if(this.usableOptions.supportOnlyLatinArgs && argName.match(/[^a-z]/i)) continue;

			let argValue = thPArg[1];
			
			if(Array.isArray(this.usableOptions.excludeFlags) && this.usableOptions.excludeFlags.indexOf(argValue) != -1) continue;
			
			if(!(Array.isArray(this.usableOptions.noParseFlags) && this.usableOptions.noParseFlags.indexOf(argValue) != -1)) {
				
				if(!argValue) argValue = this.getDefaultNoneValue("mainParse");
				
				if(!this.usableOptions.noParse && argValue) argValue = this.parseThisFlag(argName, argValue);
			
			}

			parsedArgs[argName] = argValue
			
		}

	}
	
	return parsedArgs;

}

module.exports = parseFlags;