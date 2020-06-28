const setCustomWithAutoGeneration = function(...args) {
	
	return this.custom(
	
		this.generate(...args).asArray({withoutQuotes: true})
		
	);
	
};

const setCustomWithAutoGenerationFromObject = function(...args) {
	
	return this.custom(
	
		this.generateFromObject(...args).asArray({withoutQuotes: true})
		
	);
	
};

module.exports = {
	
	customWithGenerate: setCustomWithAutoGeneration,
	customWithGenerateFromObject: setCustomWithAutoGenerationFromObject
	
};