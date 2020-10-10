const staticSetSeparateCommandHandler = function (handler, alwaysCallSeparateCommandHanler) {

	if(typeof handler == "boolean") {

		this.createOptions();

		this._options.alwaysCallSeparateCommandHanler = handler;

		return this;

	}

	if(typeof handler != "function") return this;

	this.createOptions();

	this._options.separateCommandHandler = handler;

	if(typeof alwaysCallSeparateCommandHanler == "boolean") {

		this._options.alwaysCallSeparateCommandHanler = alwaysCallSeparateCommandHanler;

	}

	return this;

};

module.exports = staticSetSeparateCommandHandler;