/*

	Original: https://github.com/tc39/proposal-bigint/issues/24#issuecomment-538703414

*/
// Does JSON.stringify, with support for BigInt (irreversible)
function toJson(data) {
    if (data !== undefined) {
        return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
            .replace(/"(-?\d+)n"/g, (_, a) => a);
    }
}

/*

Original: https://github.com/tc39/proposal-bigint/issues/24#issuecomment-538747924

// Like JSON.stringify, but with safe support for BigInt (irreversible)
function toJson(data) {
    if (data !== undefined) {
        let intCount = 0, repCount = 0;
        const json = JSON.stringify(data, (_, v) => {
            if (typeof v === 'bigint') {
                intCount++;
                return `${v}#bigint`;
            }
            return v;
        });
        const res = json.replace(/"(-?\d+)#bigint"/g, (_, a) => {
            repCount++;
            return a;
        });
        if (repCount > intCount) {
            // You have a string somewhere that looks like "123#bigint";
            throw new Error(`BigInt serialization pattern conflict with a string value.`);
        }
        return res;
    }
}

*/

module.exports = toJson;