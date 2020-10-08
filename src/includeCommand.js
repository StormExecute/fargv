const includeCommand = function(sourceCommands, inputCommand) {

	if(typeof sourceCommands != "string" || typeof inputCommand != "string") return false;

	const sourceCommandsArr = sourceCommands.split(" ");
	const inputCommandArr = inputCommand.split(" ");

	for(let i = 0; i < inputCommandArr.length; ++i) {

		if(inputCommandArr[i] != sourceCommandsArr[i]) return false;

	}

	return true;

}

module.exports = includeCommand