const { exec } = require('child_process');

const listOfTerminals = ["konsole", "xfce4-terminal"];

function process(listOfTerminalsCopy, finalCallback) {

	if(!listOfTerminalsCopy.length) return finalCallback(null);

	const thPossibleTerminal = listOfTerminalsCopy[0];

	return exec("command -v " + thPossibleTerminal, (error, stdout, stderr) => {

		if(!stdout) {

			listOfTerminalsCopy.splice(0, 1);

			return process(listOfTerminalsCopy, finalCallback);

		} else {

			return finalCallback(thPossibleTerminal);

		}

	});

}

function getThisLinuxTerminal(callback) {

	process(Object.assign([], listOfTerminals), callback);

	return null;

}

module.exports = getThisLinuxTerminal;