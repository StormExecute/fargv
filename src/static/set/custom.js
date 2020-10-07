const cutOffEndEqualCharacters = flagName => {

	let sliceCount = 0;

	for (let i = flagName.length - 1; i >= 0; --i) {

		if(flagName[i] == "=") {

			++sliceCount;

		} else {

			break;

		}

	}

	if(sliceCount) return flagName.slice(0, -sliceCount);

	return flagName;

}

const setCustomArgv = function(possibleCustomArgv, redefine) {
	
	if(!Array.isArray(possibleCustomArgv)) return this;

	if(possibleCustomArgv == "reset" || redefine) {

		this.createOptions();

		this._options.customArgv = null;

		if(possibleCustomArgv == "reset") return this;

	}

	const customArgv = [];
	
	for(let i = 0; i < possibleCustomArgv.length; i++) {

		//customArgv[i][0] && customArgv[i][0].startsWith("-") && typeof customArgv[i][1] == "string"
		
		if(
			Array.isArray(possibleCustomArgv[i]) && possibleCustomArgv[i].length == 2 &&
			typeof possibleCustomArgv[i][0] == "string" && typeof possibleCustomArgv[i][1] == "string" &&
			possibleCustomArgv[i][0].startsWith("-")
		) {
			
			customArgv[i] = cutOffEndEqualCharacters(possibleCustomArgv[i][0]) + "=" + possibleCustomArgv[i][1];
			
		}
		
	}

	if(!customArgv.length) return this;
	
	this.options({

		customArgv
		
	});
	
	return this;
	
};

module.exports = setCustomArgv;