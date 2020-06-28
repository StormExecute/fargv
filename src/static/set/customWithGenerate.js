const main = (fargvStaticContext, type, ...args) => fargvStaticContext[type](...args).asArray({withoutQuotes: true, concat: true})

const setCustomWithAutoGeneration = function(...args) {
	
	const customArgv = main(this, "generate", ...args);
	
	if(!Array.isArray(customArgv)) return this;
	
	return this.options({ customArgv });
	
};

const setCustomWithAutoGenerationFromObject = function(...args) {
	
	const customArgv = main(this, "generateFromObject", ...args);
	
	if(!Array.isArray(customArgv)) return this;
	
	return this.options({ customArgv });
	
};

module.exports = {
	
	customWithGenerate: setCustomWithAutoGeneration,
	customWithGenerateFromObject: setCustomWithAutoGenerationFromObject
	
};