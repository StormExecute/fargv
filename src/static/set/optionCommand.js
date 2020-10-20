const isObject = require("../../../dependencies/isObject");
const { deepCloneObject } = require("../../../dependencies/deepClone");

const defaultOptions = require("../../data/_options");

/*

	Format: {

		a | alias | aliases: array | string,
		desc: string,
		usage: string,
		flags: array | string,
		examples: array | string,

	}

*/

const optionCommandDefaultModel = require("./optionModels/command");

//helpCommands: plainObject<usableOptions.help.commands>, alias: string; returns boolean
const checkDuplicateAliases = (helpCommands, alias) => {

	for(const prop in helpCommands) {

		const v = helpCommands[prop];

		if(isObject(v) && Array.isArray(v.alias)) {

			if(~v.alias.indexOf(alias)) return true;

		}

	}

	return false;

};

const staticSetOptionCommandToHelp = function(commandName, commandHelpConfig) {

	if(typeof commandName != "string" || !isObject(commandHelpConfig)) return this;

	this.createOptions();

	if(!isObject(this._options.help)) {

		this._options.help = Object.assign({}, defaultOptions.help, {status: true});

	}

	if(!isObject(this._options.help.commands)) {

		this._options.help.commands = {};

	}

	const commandConfig = deepCloneObject({}, commandHelpConfig);

	if(commandConfig.a && !commandConfig.alias) {

		commandConfig.alias = commandConfig.a;

		delete commandConfig.a;

	} else if(commandConfig["aliases"] && !commandConfig.alias) {

		commandConfig.alias = commandConfig["aliases"];

		delete commandConfig["aliases"];

	}

	if(typeof commandConfig.alias == "string") commandConfig.alias = [commandConfig.alias];

	if(Array.isArray(commandConfig.alias)) {

		const aliases = [];

		for (let i = 0; i < commandConfig.alias.length; ++i) {

			const a = commandConfig.alias[i];

			if(
				typeof a == "string"
				&&
				a.split(" ").length == 1
				&&
				a != commandName
				&&
				!this._options.help.commands[a]
				&&
				!checkDuplicateAliases(this._options.help.commands, a)
				&&
				!~aliases.indexOf(a)
			) {

				aliases.push(a);

			}

		}

		if(commandConfig.alias.length != aliases.length) {

			commandConfig.alias = aliases;

		}

	}

	this._options.help.commands[commandName] = commandConfig;

	return this;

};

module.exports = staticSetOptionCommandToHelp;