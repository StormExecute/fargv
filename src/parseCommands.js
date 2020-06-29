const cutFirstEq = function(sourceStr, eqStr) {
	
	let out = "";
	
	for(let i = 0; i < sourceStr.length; i++) {
		
		if(sourceStr[i] == eqStr[i]) continue;
		
		out += sourceStr[i];
		
	}
	
	return out;
	
};

const fargvParseCommandArgs = function (rememberCommands, parsedArgs) {
	
	for(let i = 0; i < this.usableOptions.commands.length; i++) {
		
		const command = this.usableOptions.commands[i];
		
		if(!Array.isArray(command) || typeof command[0] != "string" || typeof command[1] != "function") {
		
			return this.errorHandler(["Wrong command parser.", 400], {
				
				_noArgName: true,
				
				"from": "parseCommands",
				
				isArray: Array.isArray(command),
				isStringCommand: typeof command[0] == "string",
				isFunctionHandler: typeof command[1] == "function",
				
				command: command[0],
				handler: command[1],
				
			}, "auto");
		
		}
		
	}
	
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
	
	for(let i = 0; i < this.usableOptions.commands.length; i++) {
		
		let argvCommandsToStr = rememberCommands.join(" ");
		
		const [command, handler] = this.usableOptions.commands[i];
		
		if(argvCommandsToStr.includes(command)) {
			
			argvCommandsToStr = cutFirstEq(argvCommandsToStr, command);
			
			if(argvCommandsToStr[0] == " ") argvCommandsToStr = argvCommandsToStr.slice(1);
			
			const nextCommands = argvCommandsToStr.split(" ");
			
			if(this.usableOptions.nextCommandsAsArray) {
				
				handler(state, nextCommands);
				
			} else {
				
				handler(state, ...nextCommands);
				
			}
			
		}
		
	}
	
};

module.exports = fargvParseCommandArgs;