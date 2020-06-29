const parseFlags = function(argsList, parsedArgs, rememberAllForDemandWithSkippedFlags, rememberCommands) {
	
	for(let a = 0; a < argsList.length; a++) {

		const thArg = argsList[a];
		
		if(typeof thArg != "string" && this.usableOptions.customArgv) continue;
		
		if(rememberAllForDemandWithSkippedFlags && thArg.startsWith("-")) {
			
			const thPArg = thArg.split("=");
			
			const argName = thPArg[0].replace(/^-+/, "");
			
			rememberAllForDemandWithSkippedFlags[argName] = 1;
			
		}
		
		const isFlag = this.usableOptions.unlimitedFlagDefinitionCharacters ? thArg.startsWith("-") : thArg.startsWith("--") || thArg.match(/^-\w/i);

		if(isFlag && (!this.usableOptions.includeEmptyFlags ? thArg.includes("=") : true)) {

			const thPArg = thArg.split("=");
			
			const argName = thPArg[0].replace(/^-+/, "");
			
			if(this.usableOptions.supportOnlyLatinArgs && argName.match(/[^a-z]/i)) continue;

			let argValue = thPArg[1];
			
			if(Array.isArray(this.usableOptions.excludeFlags) && this.usableOptions.excludeFlags.indexOf(argName) != -1) continue;
			
			/*
			
				if noParseNoDefault -> no parse
				
				else if !argValue -> default parse
				
				else if argValue ->
					
					if noParseFlags -> no parse
					else -> parse
				
			*/
			
			if(
				this.usableOptions.noParseNoDefault 
				|| 
				(Array.isArray(this.usableOptions.noParseNoDefaultFlags) && this.usableOptions.noParseNoDefaultFlags.indexOf(argName) != -1)
			) {
				
				//nothing
				
			} else if(!argValue) {
				
				argValue = this.getDefaultNoneValue("mainParse");
				
			} else if(argValue) {
				
				if(
				
					this.usableOptions.noParse 
					|| 
					(Array.isArray(this.usableOptions.noParseFlags) && this.usableOptions.noParseFlags.indexOf(argName) != -1)
				) {
					
					//nothing
					
				} else {
					
					argValue = this.parseThisFlag(argName, argValue);
					
				}
				
			}

			parsedArgs[argName] = argValue
			
		} else if(rememberCommands && !thArg.startsWith("-") && !thArg.includes("=")) {
			
			//its a command
			
			rememberCommands.push(thArg);
			
		}

	}
	
	return parsedArgs;

}

module.exports = parseFlags;