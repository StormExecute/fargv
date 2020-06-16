/*

	taken from jQuery: https://jquery.com/

*/

function isNumeric(obj) {
	return !isNaN( parseFloat(obj) ) && isFinite( obj );
}

module.exports = isNumeric;