const fargv = require("../../src/main");

fargv.demand("someNumber").demand(["a", "b"]);

fargv.demand("???");

fargv.undemand("???");

fargv.demand(["noneExistsArg", "and his friend"]);

fargv.undemand(["noneExistsArg", "and his friend"]);

fargv.demand(["099"], true);

//{ supportOnlyLatinArgs: false } -> 099 is included to parseArgs ;
//exclude("099") -> this is a higher priority, so 099 is excluded from parsedArgs
fargv.exclude("099")({ supportOnlyLatinArgs: false }, true);

console.log("OK.");