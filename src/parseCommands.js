const cutByInitialMatch = require("../dependencies/cutByInitialMatch");

const includeCommand = require("./includeCommand");

const fargvParseCommandArgs = function (rememberCommands, parsedArgs) {
	
	if(!this.validateCommands()) return;
	
	this.usableOptions.commands = this.usableOptions.commands.sort((a, b) => b[0].split(" ").length - a[0].split(" ").length);

	const copyOfParsedArgs = Object.assign({}, parsedArgs);
	
	const state = {};
	
	if(copyOfParsedArgs._) {
		
		state._ = copyOfParsedArgs._;
		
		delete copyOfParsedArgs._;
		
	}
	
	if(copyOfParsedArgs._warns) {
		
		state.warns = copyOfParsedArgs._warns;
		
		delete copyOfParsedArgs._warns;
		
	}
	
	state.flags = copyOfParsedArgs;
	
	const argvCommandsToStr = rememberCommands.join(" ");
	
	for(let i = 0; i < this.usableOptions.commands.length; i++) {
		
		let argvCommandsToStrThis = argvCommandsToStr;
		
		const [command, handler] = this.usableOptions.commands[i];
		
		if(includeCommand(argvCommandsToStrThis, command)) {
			
			argvCommandsToStrThis = cutByInitialMatch(argvCommandsToStrThis, command);
			
			if(argvCommandsToStrThis[0] == " ") argvCommandsToStrThis = argvCommandsToStrThis.slice(1);
			
			const nextCommands = argvCommandsToStrThis.split(" ");
			
			if(this.usableOptions.nextCommandsAsArray) {
				
				handler(state, nextCommands);
				
			} else {
				
				handler(state, ...nextCommands);
				
			}
			
		}
		
	}
	
};

module.exports = fargvParseCommandArgs;