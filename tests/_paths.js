const fs = require("fs");

//execNodePath = C/Program Files (x86)?/nodejs/node.exe
const windows = {
	
	execFilePath: 'D:\\NodeProjects\\fargv\\tests\\objects\\flags.js',
	execNodePath: '\\node.exe',
	execNodeDir: '\\nodejs'
	
};

//execNodePath = /usr/bin/node | ~//.nvm/versions/node/%VERSION%/bin/node
const linux = {
	
	execFilePath: '/NodeProjects/fargv/tests/objects/flags.js',
	execNodePath: '/usr/bin/node',
	execNodeNvmPath: '/.nvm/versions/node/' + process.version + '/bin/node'

};

if(process.platform.startsWith("win")) {

	const programFiles = "C:\\Program Files";

	if(fs.existsSync(programFiles + windows.execNodeDir)) {

		module.exports.execNodePath = programFiles + windows.execNodeDir + windows.execNodePath;

	} else if(fs.existsSync(programFiles + " (x86)" + windows.execNodeDir)) {

		module.exports.execNodePath = programFiles + " (x86)" + windows.execNodeDir + windows.execNodePath;

	} else {

		throw new Error("Cannot find the manual path to the nodejs");

	}

	module.exports.execFilePath = windows.execFilePath;

}  else if(process.platform.includes("linux")) {

	const linuxHomePath = !process.env.SUDO_USER ? process.env.HOME : "/home/" + process.env.SUDO_USER;

	module.exports.execFilePath = linuxHomePath + linux.execFilePath;

	if(process.execPath.includes(".nvm")) {

		module.exports.execNodePath = linuxHomePath + linux.execNodeNvmPath;

	} else {

		module.exports.execNodePath = linux.execNodePath;

	}

} else {
	
	throw new Error("Tests for this OS are temporarily not supported.");
	
}