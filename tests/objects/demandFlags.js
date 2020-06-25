const fargv = require("../../src/main");

fargv.demand("someNumber");

fargv.demand(["a", "b"]);

fargv.demand("???");

fargv.undemand("???");

fargv.demand(["noneExistsArg", "and his friend"]);

fargv.undemand(["noneExistsArg", "and his friend"]);

fargv.demand(["099"], true);

fargv();

console.log("OK.");