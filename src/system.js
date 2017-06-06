const Entity = require("./entity");

class System {
	constructor(...required) {
		Object.defineProperty(this, "required", {
			value: required.filter(r => typeof r === "string")
		});
	}
}

module.exports = System;
