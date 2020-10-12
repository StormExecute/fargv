const isObject = require("../../dependencies/isObject");

const { deepCloneObject } = require("../../dependencies/deepClone");

const init = function() {

	return this.apply(global, arguments);

};

const initF = function (options) {

	if(isObject(options)) {

		options.returnFilter = "flags";

	} else {

		this.returnFilter("flags");

	}

	return this.init.apply(this, arguments);

};

const initC = function (options) {

	if(isObject(options)) {

		options.returnFilter = "commands";

	} else {

		this.returnFilter("commands");

	}

	return this.init.apply(this, arguments);

};

const initFC = function (options) {

	if(isObject(options)) {

		options.returnFilter = ["flags", "commands"];

	} else {

		this.returnFilter(["flags", "commands"]);

	}

	return this.init.apply(this, arguments);

};

module.exports = {

	init,

	initF,
	initC,
	initFC,

};