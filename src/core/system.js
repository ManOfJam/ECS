class System {
	constructor(name, ...required) {
		if(typeof name !== "string")
			throw new TypeError("System() name argument must be of type string");

		this.name = name;
		this.required = required.filter(r => typeof r === "string");
	}
}

module.exports = System;
