/*

	taken from jQuery: https://jquery.com/ && modified by Cameron Osakiski

*/

function isNumeric(obj, removeUnderscores) {

	if(removeUnderscores) {

		obj = obj.replace(/_/g, "");

	}

	return !isNaN( parseFloat(obj) ) && isFinite( obj );

}

module.exports = isNumeric;