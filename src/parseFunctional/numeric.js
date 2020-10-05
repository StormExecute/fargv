/*

	Expressions that start as follows are not supported: -0[xXoObB].+

*/

const isNumeric = require("../../dependencies/isNumeric");

function returnAsNumeric(obj) {

	if(obj.length > 1 && (obj[0] == "0" || (obj[0] == "-" && obj[1] == "0"))) {

		if(obj[1] == "x" || obj[1] == "X") {

			//to return the original result of objects such as 0x123, 0xbbbbbbbbeeee111 etc...
			return parseInt(obj);

		} else {

			//to return the original result of objects such as 0111, 0b1_1 etc...
			return eval(obj);

		}

	}

	return parseFloat(obj);

}

function parseNumeric(argValue, _from) {

	const options = !_from ? this.usableOptions.mainParse : _from == "array" ? this.usableOptions.arrayParse : _from == "object" ? this.usableOptions.objectParse : {};

	if(!isNumeric(argValue, options.numericSeparator)) return argValue;

	if(options.numericSeparator) {
		//argValue >= 1

		let argValueHasUnderscore = false;
		let argValueHasE = false;

		for(let i = 0; i < argValue.length; ++i) {

			if(argValue[i] == "_" && !argValueHasUnderscore) argValueHasUnderscore = true;
			if(argValue[i] == "e" && !argValueHasE) argValueHasE = true;

			//__
			if(argValue[i] == "_" && (i + 1) < argValue.length && argValue[i + 1] == "_") {

				this.errorHandler(["SyntaxError: multiple numeric separators '_' cannot be included one after the other.", 502], {

					"from": "parseNumeric",

				}, "auto");

				return argValue;

			}

			//_. || _e
			if(
				argValue[i] == "_" && (i + 1) < argValue.length && argValue[i + 1] == "."
				||
				argValue[i] == "_" && (i + 1) < argValue.length && argValue[i + 1] == "e"
			) {

				this.errorHandler(["SyntaxError: underscore can appear only between digits, not after the last digit in a number.", 503], {

					"from": "parseNumeric",

				}, "auto");

				return argValue;

			}

			//._
			if(argValue[i] == "." && (i + 1) < argValue.length && argValue[i + 1] == "_") {

				this.errorHandler(["SyntaxError: identifier starts immediately after numeric literal.", 504], {

					"from": "parseNumeric",

				}, "auto");

				return argValue;

			}

			//e_
			if(argValue[i] == "e" && (i + 1) < argValue.length && argValue[i + 1] == "_") {

				this.errorHandler(["SyntaxError: missing exponent.", 505], {

					"from": "parseNumeric",

				}, "auto");

				return argValue;

			}

			//.e
			if(argValue[i] == "." && (i + 1) < argValue.length && argValue[i + 1] == "e") {

				this.errorHandler(["SyntaxError: unexpected 'e' token.", 506], {

					"from": "parseNumeric",

				}, "auto");

				return argValue;

			}

		}

		if(argValueHasE && (argValue[0] == "0" || (argValue[0] == "-" && argValue[1] == "0"))) {

			this.errorHandler(["SyntaxError: identifier starts immediately after numeric literal.", 504], {

				"from": "parseNumeric",

			}, "auto");

			return argValue;

		}

		if(!argValueHasUnderscore) return returnAsNumeric(argValue);
		//argValue > 1

		if(argValue[0] == "_" || argValue[argValue.length - 1] == "_") {

			this.errorHandler(["SyntaxError: numeric separators '_' cannot be used at the beginning or end.", 501], {

				"from": "parseNumeric",

			}, "auto");

			return argValue;

		}

		if((

			//0[0-9_.] && argValueHasUnderscore

			argValue[0] == "0" &&
			argValue[1] != "x" && argValue[1] != "X" &&
			argValue[1] != "o" && argValue[1] != "O" &&
			argValue[1] != "b" && argValue[1] != "B"

		) || (

			//0[xXoObB]_

			argValue.length > 2 && argValue[0] == "0" && argValue[2] == "_" && (

				argValue[1] == "x" || argValue[1] == "X" ||
				argValue[1] == "o" || argValue[1] == "O" ||
				argValue[1] == "b" || argValue[1] == "B"

			)

		) || (

			//-0[0-9_.] && argValueHasUnderscore

			argValue.length > 2 && argValue[0] == "-" && argValue[1] == "0" &&
			argValue[2] != "x" && argValue[2] != "X" &&
			argValue[2] != "o" && argValue[2] != "O" &&
			argValue[2] != "b" && argValue[2] != "B"

		)/* not required, the reason is at the beginning, but we may need to || (

			//-0[xXoObB]_

			argValue.length > 3 && argValue[0] == "-" && argValue[1] == "0" && argValue[3] == "_" && (

				argValue[2] == "x" || argValue[2] == "X" ||
				argValue[2] == "o" || argValue[2] == "O" ||
				argValue[2] == "b" || argValue[2] == "B"

			)

		)*/) {

			this.errorHandler(["SyntaxError: numeric separators '_' are not allowed in numbers that start with '0'.", 500], {

				"from": "parseNumeric",

			}, "auto");

			return argValue;

		}

		return returnAsNumeric(argValue.replace(/_/g, ""));

	}

	return returnAsNumeric(argValue);

}

module.exports = parseNumeric;