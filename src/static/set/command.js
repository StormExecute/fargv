const isObject = require("../../../dependencies/isObject");

/*

	Format:
	
		fargv.command("command" | "command thenCommand", function(state, thenCommands | ...thenCommands) {
			
			state = {
				
				flags: {},
				
				_: {},
				
				warns: {}
				
			}
			
		})

*/

const staticSetCommand = function(command, handler) {
	
	if(typeof command != "string" || typeof handler != "function") return this;
	
	if(!isObject(this._options)) this._options = {};
	
	if(command == "reset") {
	
		this._options.commands = null;
		
		return this;
	
	}
	
	const commands = [command, handler];
	
	if(!Array.isArray(this._options.commands)) {
		
		this._options.commands = [commands];
		
	} else {
		
		this._options.commands.push(commands);
		
	}
	
	return this;
	
};

module.exports = staticSetCommand;