const isObject = require("../../../dependencies/isObject");

const { deepCloneObject } = require("../../../dependencies/deepClone");

const getValue = require("../../../dependencies/getAnyPropValIfExists");

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
				
			}, {

				a | alias | aliases: array | string,
				desc: string,
				usage: string,
				flags: array | string,
				examples: array | string,

			}?

		)

*/

const staticSetCommand = function(command, handler, help) {

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

	if(isObject(help)) {

		help = deepCloneObject({}, help);

		const alias = getValue(help, ["alias", "a", "aliases"]);

		if(alias) {

			const aliases = Array.isArray(alias) ? alias : [alias];

			if(newCommand[2].length) {

				for (let i = 0; i < newCommand[2].length; ++i) {

					if(!~aliases.indexOf(newCommand[2][i])) {

						aliases.push(newCommand[2][i]);

					}

				}

			}

			for (let i = 0; i < aliases.length; ++i) {

				if(!~newCommand[2].indexOf(aliases[i])) {

					newCommand[2].push(aliases[i])

				}

			}

			help.alias = aliases;

		}

		if(!isObject(this._options.help)) {

			this._options.help = deepCloneObject({}, defaultOptions.help, {status: true});

		}

		if(!isObject(this._options.help.commands)) {

			this._options.help.commands = {};

		}

		this._options.help.commands[command] = help;

	}
	
	if(!Array.isArray(this._options.commands)) this._options.commands = [];

	this._options.commands.push(newCommand);
	
	return this;
	
};

module.exports = staticSetCommand;