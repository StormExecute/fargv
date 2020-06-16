/*

	Origin: https://stackoverflow.com/a/29622653

*/

function sortObject(obj) {
    return Object.keys(obj).sort().reduce(function (result, key) {
        result[key] = obj[key];
        return result;
    }, {});
}

module.exports = sortObject;