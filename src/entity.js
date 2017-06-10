const EventObject = require("./eventObject");
const Component = require("./component");

class Entity extends EventObject {
	constructor(...components) {
		super();

		Object.defineProperties(this, {
			id: {value: "#" + Math.random().toString(16).substring(2, 10)},
			components: {value: new Map}
		});

		this.addComponent.apply(this, components);
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
			if(component instanceof Component) {
				this.components.delete(component.name);
			}
		}

		return this;
	}

	hasComponent(...components) {
		for(const component of components) {
			if(!this.components.has(component)) {
				return false;
			}
		}

		return true;
	}

	getComponent(component) {
		return this.components.get(component);
	}
}

module.exports = Entity;
