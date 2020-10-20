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

//optionsCommands: plainObject<usableOptions.commands>, alias: string; returns: boolean
const checkDuplicateAliases = (optionsCommands, alias) => {

	for(let i = 0; i < optionsCommands.length; ++i) {

		const command = optionsCommands[i];

		if(Array.isArray(command)) {

			if(optionsCommands[0] == alias) {

				return true;

			} else if(Array.isArray(optionsCommands[2])) {

				if (~optionsCommands[2].indexOf(alias)) return true;

			}

		}

	}

	return false;

};

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

	const isArrayOptionsCommands = Array.isArray(this._options.commands);
	
	const newCommand = commandIsArray ? new Array(3) : [command, handler, []];

	if(commandIsArray) {

		if(!command.length || typeof command[0] != "string") return this;

		newCommand[0] = command[0];
		newCommand[1] = handler;
		newCommand[2] = [];

		for (let i = 1; i < command.length; ++i) {

			//if its single command
			if(
				typeof command[i] == "string"
				&&
				command[i].split(" ").length == 1
				&&
				command[i] != newCommand[0]
				&&
				//and duplicate command names
				!(isArrayOptionsCommands && checkDuplicateAliases(this._options.commands, command[i]))
				&&
				!~newCommand[2].indexOf(command[i])
			) {

				newCommand[2].push(command[i]);

			}

		}

	}

	if(newCommand[2].length && !isObject(help)) {

		help = { alias: [] };

	}

	if(isObject(help)) {

		help = deepCloneObject({}, help);

		let alias = getValue(help, ["alias", "a", "aliases"]);

		if(!alias && newCommand[2].length) alias = [];

		if(alias) {

			const aliases = [];

			if(
				typeof alias == "string"
				&&
				alias.split(" ").length == 1
				&&
				alias != newCommand[0]
				&&
				!(isArrayOptionsCommands && checkDuplicateAliases(this._options.commands, alias))
			) {

				aliases.push(alias);

			} else if(Array.isArray(alias)) {

				for (let i = 0; i < alias.length; ++i) {

					const a = alias[i];

					if(
						typeof a == "string"
						&&
						a.split(" ").length == 1
						&&
						a != newCommand[0]
						&&
						!(isArrayOptionsCommands && checkDuplicateAliases(this._options.commands, a))
						&&
						!~a.indexOf(command[i])
					) {

						aliases.push(a);

					}

				}

			}

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

		this._options.help.commands[newCommand[0]] = help;

	}
	
	if(!isArrayOptionsCommands) this._options.commands = [];

	this._options.commands.push(newCommand);
	
	return this;
	
};

module.exports = staticSetCommand;