const Component = require("./component");
const random = require("./common/random");

class Entity {
	constructor() {
		Object.defineProperties(this, {
			components: {value: new Map},
			id: {value: "#" + random.float().toString(16).substring(2, 8)}
		});
	}

	addComponent(...components) {
		for(const component of components) {
			if(component instanceof Component) {
				this.components.set(component.name, component);
			}
		}

		return this;
	}

	removeComponent(...components) {
		for(const component of components) {
			if(component instanceof Component || typeof component === "sting") {
				this.components.delete(component.name || component);
			}
		}

		return this;
	}

	hasComponent(...components) {
		for(const component of components) {
			if(component instanceof Component || typeof component === "string") {
				if(!(this.components.has(component.name || component))) {
					return false;
				}
			}
		}

		return true;
	}

	getComponent(component) {
		if(component instanceof Component || typeof component === "string")
			return this.components.get(component.name || component);
	}
}

module.exports = Entity;
