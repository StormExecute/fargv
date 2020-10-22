# fargv changelog

## v1.0.1

Added the dirty and .idea folder to .npmignore

## v1.0.0

* Static methods:
	* options
	* createOptions
	* reset
	* resetAll
	* command
	* separateCommand
	* optionFlag
	* optionCommand
	* help
	* default
	* custom
	* customWithGenerate
	* customWithGenerateFromObject
	* demand
	* undemand
	* exclude
	* noParse
	* noParseFlags
	* allParse
	* remember
	* warns
	* arrayParse
	* objectParse
	* state
	* fromArray
	* fromObject
	* toArray
	* toObject
	* toFargvStringArray
	* toFargvStringObject
	* fromFargvStringArray
	* fromFargvStringObject
	* strIsArray
	* strIsObject
	* strIsStrictArray
	* strIsStrictObject
	* generate
	* generateFromObject
	* init
	* initF
	* initC
	* initFC && initCF
	
* Options:
    * help
	* commands
	* separateCommandHandler
	* callAppropriateCommandHandlerOnlyOnce
	* alwaysCallSeparateCommandHanler
	* nextCommandsAsArray
	* customArgv
	* defaultArgv
	* demandWithSkippedFlags
	* demandFlags
	* excludeFlags
	* noParseFlags
	* noParseNoDefaultFlags
	* returnFilter
	* rememberExecNodePath
	* rememberExecFilePath
	* rememberExecFileBasename
	* rememberWarns
	* showWarns
	* parseWarn
	* throwInsteadWarns
	* includeEmptyFlags
	* unlimitedFlagDefinitionCharacters
	* supportOnlyLatinArgs
	* defaultCommaSplitSym
	* allowSpacesAsValues
	* useDnvForFirstSpaceOP
	* noParse
	* noParseNoDefault
	* allParse
	* mainParse
		* defaultNoneValue
		* allTypes
		* mainTypes
		* minorTypes
		* numericSeparator
		* number
		* bigint
		* boolean
		* array
		* object
		* null
		* undefined
		* NaN
		* Infinity
	* arrayParse
		* ALL MAIN PARSE CONFIGS and maxRecursiveCalls
	* objectParse
		* ALL ARRAY PARSE CONFIGS
		* ifDuplicateKey
			* rewrite
			* warn
	
## v0.1.0 (DEPRECATED)

* Working static methods:
	* options
	* init
	
* Not working static methods:
	* default
	* state ?
	
* Options:
	* customArgsList
	* rememberExecNodePath
	* rememberExecFilePath
	* throwInsteadWarns
	* supportEmptyFlags
	* unlimitedFlagDefinitionCharacters
	* supportOnlyLatinArgs
	* allowSpacesAsValues
	* useDnvForFirstSpaceOP
	* noParse
	* mainParse
		* defaultNoneValue
		* allTypes
		* mainTypes
		* minorTypes
		* number
		* bigint
		* boolean
		* array
		* object
		* null
		* undefined
		* NaN
		* Infinity
	* arrayParse + objectParse
		* ALL MAIN PARSE CONFIGS and maxRecursiveCalls
