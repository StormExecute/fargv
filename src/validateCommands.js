const validateCommands = function() {

	if(!Array.isArray(this.usableOptions.commands)) return false;
	
	for(let i = 0; i < this.usableOptions.commands.length; ++i) {
		
		const command = this.usableOptions.commands[i];

		const isArrayCommandFormat = Array.isArray(command);

		const hasStringCommand = isArrayCommandFormat ? typeof command[0] == "string" : false;
		const hasFunctionHandler = isArrayCommandFormat ? typeof command[1] == "function" : false;
		
		if(!isArrayCommandFormat || !hasStringCommand || !hasFunctionHandler) {
		
			this.errorHandler(["Wrong command parser.", 400], {
				
				_noArgName: true,
				
				"from": "parseCommands",

				isArrayCommandFormat,
				hasStringCommand,
				hasFunctionHandler,
				
				command: isArrayCommandFormat ? command[0] : null,
				handler: isArrayCommandFormat ? command[1] : null,
				
			}, "auto");

			return false;
		
		}
		
	}
	
	return true
	
};

module.exports = validateCommands;