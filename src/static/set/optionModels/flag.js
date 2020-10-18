const optionFlagDefaultModel = {
	
	desc: null,
	
	required: false,
	deprecated: false,

	//if null - don't show any
	empty: null,
	
	type: null,

	//it must be undefined to avoid calling fargv.default for in vain in fargv.optionFlag
	default: undefined,
	alias: null,
	
	examples: null,
	
};

module.exports = optionFlagDefaultModel;