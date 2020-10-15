const isObject = require("../dependencies/isObject");
const { deepCloneObject, deepCloneArray } = require("../dependencies/deepClone");

const cutByInitialMatch = require("../dependencies/cutByInitialMatch");

const includeCommand = require("./includeCommand");

const callHandler = (nextCommandsAsArray, handler, state, nextCommands) => {

	if(nextCommandsAsArray) {

		handler(state, nextCommands);

	} else {

		handler(state, ...nextCommands);

	}

	return null;

};

const callSeparateCommandHandler = ({ nextCommandsAsArray, separateCommandHandler }, state, rememberCommands) => {

	callHandler(
		nextCommandsAsArray,
		separateCommandHandler,
		state,
		rememberCommands
	);

	return null;

};

const fargvParseCommandArgs = function (rememberCommands, parsedArgs) {
	
	if(!this.validateCommands()) return;

	this.usableOptions.commands = this.usableOptions.commands.sort((a, b) => b[0].split(" ").length - a[0].split(" ").length);

	const state = isObject(parsedArgs) ?
			deepCloneObject({}, parsedArgs)
		: Array.isArray(parsedArgs) ?
			deepCloneArray([], parsedArgs)
		: parsedArgs;
	
	const argvCommandsToStr = rememberCommands.join(" ");

	let foundAppropriateCommand = false;
	
	for(let i = 0; i < this.usableOptions.commands.length; i++) {
		
		let argvCommandsToStrThis = argvCommandsToStr;
		
		const [command, handler] = this.usableOptions.commands[i];
		
		if(includeCommand(argvCommandsToStrThis, command)) {

			if(!foundAppropriateCommand) foundAppropriateCommand = true;
			
			argvCommandsToStrThis = cutByInitialMatch(argvCommandsToStrThis, command);
			
			if(argvCommandsToStrThis[0] == " ") argvCommandsToStrThis = argvCommandsToStrThis.slice(1);
			
			const nextCommands = argvCommandsToStrThis.split(" ");

			callHandler(this.usableOptions.nextCommandsAsArray, handler, state, nextCommands);

			//break if we found appropriate command and callAppropriateCommandHandlerOnlyOnce is true
			if(this.usableOptions.callAppropriateCommandHandlerOnlyOnce) break;
			
		}
		
	}

	if(
		typeof this.usableOptions.separateCommandHandler == "function" && (
			this.usableOptions.alwaysCallSeparateCommandHanler ||
			!foundAppropriateCommand
		)
	) {

		callSeparateCommandHandler(this.usableOptions, state, rememberCommands);

	}

	return null;
	
};

fargvParseCommandArgs.callSeparateCommandHandler = callSeparateCommandHandler;

module.exports = fargvParseCommandArgs;