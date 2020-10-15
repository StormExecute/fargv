const isObject = require("../../../dependencies/isObject");

const defaultOptions = require("../../data/_options");

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
	
	const newCommand = commandIsArray ? new Array(3) : [command, handler, []];

	if(commandIsArray) {

		if(!command.length || typeof command[0] != "string") return this;

		newCommand[0] = command[0];
		newCommand[1] = handler;
		newCommand[2] = [];

		for (let i = 1; i < command.length; ++i) {

			//if its single command
			if(typeof command[i] == "string" && command[i].split(" ").length == 1) {

				newCommand[2].push(command[i]);

			}

		}

	}
	
	if(!Array.isArray(this._options.commands)) this._options.commands = [];

	this._options.commands.push(newCommand);
	
	return this;
	
};

module.exports = staticSetCommand;