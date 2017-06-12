const EventObject = require("./eventObject");

class Entity extends EventObject {
	constructor() {
		super();

		Object.defineProperties(this, {
			components: {value: new Map},
			id: {value: "#" + Math.random().toString(16).substring(2, 10)}
		});
	}

	addComponent(name, component) {
		this.components.set(name, component)

		return this;
	}

	removeComponent(...names) {
		for(const name of names)
			this.components.delete(name);

		return this;
	}

	hasComponent(...names) {
		for(const name of names) {
			if(!this.components.has(name)) {
				return false;
			}
		}

		return true;
	}

	getComponent(name) {
		return this.components.get(name);
	}
}

module.exports = Entity;
