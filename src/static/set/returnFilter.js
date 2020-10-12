const staticSetReturnFilter = function (newReturnFilterValue) {

	const isArray = Array.isArray(newReturnFilterValue);

	if(
		(typeof newReturnFilterValue != "string" && !isArray)
		||
		(isArray && !newReturnFilterValue.length)
	) {

		return this;

	}

	this.createOptions();

	if(!isArray) {

		this._options.returnFilter = newReturnFilterValue;

	} else {

		this._options.returnFilter = [];

		for (let i = 0; i < newReturnFilterValue.length; ++i) {

			this._options.returnFilter.push(newReturnFilterValue[i]);

		}

	}

	return this;

};

module.exports = staticSetReturnFilter;