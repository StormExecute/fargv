const isObject = require("../../../dependencies/isObject");

/*

	Format:
	
		fargv.command(
		
			"command" | "command thenCommand" | array ["command", "commandAlias", ...],

			function(state, thenCommands | ...thenCommands) {
				
				state = {
					
					flags: {},
					
					_: {},
					
					warns: {}
					
				}
				
			}

		)

*/

const staticSetCommand = function(command, handler) {

	//setSeparateCommandHandler
	if(typeof command == "function") {

		this.createOptions();

		this._options.separateCommandHandler = command;

		return this;

	}

	const commandIsArray = Array.isArray(command);
	
	if((typeof command != "string" && !commandIsArray) || typeof handler != "function") return this;
	
	this.createOptions();
	
	if(command == "reset") {
	
		this._options.commands = null;
		
		return this;
	
	}
	
	const newCommand = commandIsArray ? [] : [[command, handler]];

	if(commandIsArray) {

		for(let i = 0; i < command.length; ++i) {

			if(typeof command[i] == "string") {

				newCommand.push([command[i], handler]);

			}

		}

		//here
		if(!newCommand.length) return this;

	}
	
	if(!Array.isArray(this._options.commands)) this._options.commands = [];

	for (let i = 0; i < newCommand.length; ++i) {

		this._options.commands.push(newCommand[i]);

	}
	
	return this;
	
};

module.exports = staticSetCommand;