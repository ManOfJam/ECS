class Component {
	constructor(name) {
		if(typeof name !== "string")
			throw new TypeError("Component() name argument must be of type string");

		this.name = name;
	}
}

module.exports = Component;
