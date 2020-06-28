const setCustomWithAutoGeneration = function(...args) {
	
	return this.custom(
	
		this.generate(...args).asArray({withoutQuotes: true, concat: true})
		
	);
	
};

const setCustomWithAutoGenerationFromObject = function(...args) {
	
	return this.custom(
	
		this.generateFromObject(...args).asArray({withoutQuotes: true, concat: true})
		
	);
	
};

module.exports = {
	
	customWithGenerate: setCustomWithAutoGeneration,
	customWithGenerateFromObject: setCustomWithAutoGenerationFromObject
	
};