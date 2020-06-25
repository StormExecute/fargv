const windows = {
	
	execFilePath: 'D:\\NodeProjects\\fargv\\tests\\objects\\flags.js',
	execNodePath: 'C:\\Program Files\\nodejs\\node.exe'
	
};

const linux = {
	
	execFilePath: '',
	execNodePath: ''
	
};

if(process.platform.startsWith("win")) {

	module.exports.execFilePath = windows.execFilePath;
	module.exports.execNodePath = windows.execNodePath;

} else {
	
	throw new Error("Tests for other OS are temporarily not supported.");
	
}