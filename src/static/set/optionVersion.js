const staticSetOptionVersionToHelp = function(version, noExit, optionConfig) {

	return this.optionFlag("version", Object.assign({}, {

		exit: !!noExit ? 0 : 1,
		version,
		desc: "Show application version",
		empty: true,
		"default": [ "$fargvSetDefault", [undefined, "$notFill"], ["v"]]

	}, optionConfig));

};

module.exports = staticSetOptionVersionToHelp;