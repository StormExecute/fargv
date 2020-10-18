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

	this._options.help.commands[commandName] = commandConfig;

	return this;

};

module.exports = staticSetOptionCommandToHelp;