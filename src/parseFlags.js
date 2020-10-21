const parseFlags = function(argsList, parsedArgs, rememberAllFlags, rememberAllCommands) {
	
	for(let a = 0; a < argsList.length; a++) {

		const thArg = argsList[a];

		if(typeof thArg != "string" && this.usableOptions.customArgv) continue;
		
		if(thArg.startsWith("-")) {
			
			const thPArg = thArg.split("=");
			
			const argName = thPArg[0].replace(/^-+/, "");
			
			rememberAllFlags[argName] = 1;

			if(this.usableOptions.help.status == true && this.usableOptions.help.flagsToCall.indexOf(argName) != -1 && !this._fargvShowHelpStatus) {

				this.parseCommandAliases(rememberAllCommands);

				this.showHelp(!!this.usableOptions.help.exit, rememberAllCommands, rememberAllFlags);

				this._fargvShowHelpStatus = true;

			}
			
		}
		
		const isFlag = this.usableOptions.unlimitedFlagDefinitionCharacters ? thArg.startsWith("-") : thArg.match(/^--[^-].+$/i) || thArg.match(/^-[^-]$/i);

		if(isFlag && (!this.usableOptions.includeEmptyFlags ? thArg.includes("=") : true)) {

			const thPArg = thArg.split("=");
			
			const argName = thPArg[0].replace(/^-+/, "");
			
			if(this.usableOptions.supportOnlyLatinArgs && argName.match(/[^a-z]/i)) continue;

			let argValue = thPArg.length > 1 ? thPArg[1] : undefined;
			
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

			parsedArgs.flags[argName] = argValue
			
		} else if(!thArg.startsWith("-") && !thArg.includes("=")) {
			
			//its a command

			rememberAllCommands.push(thArg);
			
		}

	}
	
	return true;

}

module.exports = parseFlags;