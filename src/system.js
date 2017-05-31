const Entity = require("./entity.js");

class System {
	constructor(...required) {
		this.required = required.filter(r => typeof r === "string");
	}

	getEntities(...entities) {
		return entities.filter(e => e instanceof Entity && this.required.every(r => r in e));
	}
}

module.exports = System;
