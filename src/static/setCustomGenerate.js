const setCustomWithAutoGeneration = function(...args) {
	
	return this.custom(
	
		this.generate(...args).asArray()
		
	);
	
};

const setCustomWithAutoGenerationFromObject = function(...args) {
	
	return this.custom(
	
		this.generateFromObject(...args).asArray()
		
	);
	
};

module.exports = {
	
	customWithGenerate: setCustomWithAutoGeneration,
	customWithGenerateFromObject: setCustomWithAutoGenerationFromObject
	
};