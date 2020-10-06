const reset = function(option) {
	
	if(option != "all") {
		
		this.createOptions();
		
		this._options[option] = null;
		
	} else {
		
		this._options = null;
		
	}
	
	return this;
	
};

module.exports = reset;