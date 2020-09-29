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

module.exports = toJson;