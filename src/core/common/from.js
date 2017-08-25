const extend = require("./extend");

function from(...objects) {
	return extend({}, ...objects);
}

module.exports = from;
