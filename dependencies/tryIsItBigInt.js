const tryIsItBigInt = argValue => {
	
	/*
		try/catch is faster than regexp
	*/
	
	try {
		
		return BigInt(argValue);
		
	} catch(e) {
		
		return false
		
	}
	
};

module.exports = tryIsItBigInt;