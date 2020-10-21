const isObject = require("../../dependencies/isObject");

const copyV = require("../../dependencies/copyValWithoutBind");

const getStateOfOptionsAndDefaults = function(about) {

	if(!isObject(this._options)) return undefined;
	
	switch(about) {
		
		case "default":
		
			return copyV(this._options.defaultArgv);
		
		break;
		
		case "commands":
		case "command":
		case "comma":
		case "com":
		
			return copyV(this._options.commands);
		
		break;
		
		case "custom":
		
			return copyV(this._options.customArgv);
		
		break;
		
		case "demand": 
		case "demandU": //demandUsually
		
			return copyV(this._options.demandFlags);
		
		break;
		
		case "demandWSF":
		case "demandWithSkippedFlags":
		case "demandWSFlags":
		
			return copyV(this._options.demandWithSkippedFlags);
		
		break;
		
		case "demandAll":
		
			return {
				
				withSkippedFlags: copyV(this._options.demandWithSkippedFlags),
				flags: copyV(this._options.demandFlags)
				
			}
		
		break;
		
		case "optionsReal":
		
			return copyV(this._options);
		
		break;

		case "help":

			return copyV(this._options.help);

		break;
		
		default:
		
			return copyV(this._options);
		
		break;
		
	}
	
};

module.exports = getStateOfOptionsAndDefaults;