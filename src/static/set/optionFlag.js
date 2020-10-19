const isObject = require("../../../dependencies/isObject");
const { deepCloneObject } = require("../../../dependencies/deepClone");

const defaultOptions = require("../../data/_options");

/*

	Format: {
		
		desc: string,
		required: boolean | string,
		deprecated: boolean | string,
		empty: boolean,
		type: "string" | "number" | "array" | "object" | "bigint" | "boolean",
		default: any,
		a | alias | aliases: array | string,
		examples: array | string,
		
	}
	
*/

const optionFlagDefaultModel = require("./optionModels/flag");

const staticSetOptionFlagToHelp = function(optionName, optionConfig) {
	
	if(typeof optionName != "string" || !isObject(optionConfig)) return this;
	
	this.createOptions();
	
	if(!isObject(this._options.help)) {
		
		this._options.help = Object.assign({}, defaultOptions.help, {status: true});
		
	}
	
	if(!isObject(this._options.help.flags)) {
		
		this._options.help.flags = {};
		
	}
	
	const flagConfig = deepCloneObject({}, optionFlagDefaultModel, optionConfig);

	if(flagConfig.a && !flagConfig.alias) {

		flagConfig.alias = flagConfig.a;

		delete flagConfig.a;

	} else if(flagConfig["aliases"] && !flagConfig.alias) {

		flagConfig.alias = flagConfig["aliases"];

		delete flagConfig["aliases"];

	}

	if(typeof flagConfig.alias == "string") flagConfig.alias = [flagConfig.alias];

	if(flagConfig.alias) {

		this.default({

			[optionName]: {

				_options: {

					value: typeof flagConfig.default != "undefined"
						? flagConfig.default
						: defaultOptions.mainParse.defaultNoneValue,
					alias: flagConfig.alias,

				}

			}

		});

	} else if(typeof flagConfig.default != "undefined") {

		this.default({

			[optionName]: flagConfig.default

		});

	}
	
	this._options.help.flags[optionName] = flagConfig;
	
	return this;
	
};

module.exports = staticSetOptionFlagToHelp;