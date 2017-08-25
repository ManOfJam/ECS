const from = require("./from");

function extend(target, ...sources) {
	for(const source of sources) {
		for(const key in source) {
			if(source[key] && typeof source[key] === "object") {
				if(target[key] && typeof target[key] === "object") {
					extend(target[key], source[key]);
				}
				else {
					target[key] = from(source[key]);
				}
			}
			else {
				target[key] = source[key];
			}
		}
	}

	return target;
}

module.exports = extend;
