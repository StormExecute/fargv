const parseCommandAliases = function (rememberAllCommands) {

	if(rememberAllCommands.length && this.usableOptions.commands) {

		//aliases can be applied only for first command
		const sourceCommand = rememberAllCommands[0];

		for (let i = 0; i < this.usableOptions.commands.length; ++i) {

			const optionCommand = this.usableOptions.commands[i];

			if (optionCommand[2].length && ~optionCommand[2].indexOf(sourceCommand)) {

				rememberAllCommands[0] = optionCommand[0];

				break;

			}

		}

	}

};

module.exports = parseCommandAliases;