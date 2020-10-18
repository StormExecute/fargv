const isObject = require("../dependencies/isObject");

const copyV = require("../dependencies/copyValWithoutBind");

const parseFlagAliases = function (parsedArgs) {

	if(isObject(this.usableOptions.defaultArgv)) {

		for(const defaultArgName in this.usableOptions.defaultArgv) {

			const [defaultValue, aliases] = copyV(this.usableOptions.defaultArgv[defaultArgName]);

			let findAliasStatus = false;

			//we must delete aliases anyway
			for(let i = 0; i < aliases.length; i++) {

				if(findAliasStatus) {

					delete parsedArgs.flags[aliases[i]];

					continue;

				}

				if(typeof parsedArgs.flags[aliases[i]] != "undefined") {

					findAliasStatus = true;

					if(typeof parsedArgs.flags[defaultArgName] == "undefined") {

						parsedArgs.flags[defaultArgName] = copyV(parsedArgs.flags[aliases[i]]);

					}

					delete parsedArgs.flags[aliases[i]];

				}

			}

			if(!findAliasStatus && typeof parsedArgs.flags[defaultArgName] == "undefined") {

				parsedArgs.flags[defaultArgName] = defaultValue;

			}

		}

	}

};

module.exports = parseFlagAliases;