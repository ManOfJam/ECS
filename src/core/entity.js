const Component = require("./component");
const EventObject = require("./eventObject");
const random = require("./common/random");

/**
 * Contain [components]{@link Component} that contain the data representing an entity's state. They are iterated over on each
 * {@link Stage}.[update()]{@link Stage#update} call, and entities with a [system's]{@link System} required components will be
 * updated.
 *	
 * @extends EventObject
 */

class Entity extends EventObject {

	/**	Creates a new Entity.*/

	constructor() {
		super();

		Object.defineProperties(this, {
			components: {value: new Map},
			id: {value: "#" + random.float().toString(16).substring(2, 8)}
		});
	}

	/**
	 * Adds the given {@link Component} to the Entity. If a Component with the same name has already been added, that Component
	 * will be replaced.
	 *
	 * @param {...Component} component - An instance of a Component.
	 * @return {this}
	 */

	addComponent(...components) {
		for(const component of components) {
			if(component instanceof Component) {
				this.components.set(component.name, component);
			}
		}

		return this;
	}

	/**
	 * Removes the {@link Component} with the given name, or the name of a given Component, from the Entity.
	 *
	 * @param {...(Component|string)} component - The name of, or a Component with the name of, the Component to remove.
	 * @return {this}
	 */

	removeComponent(...components) {
		for(const component of components) {
			if(component instanceof Component || typeof component === "sting") {
				this.components.delete(component.name || component);
			}
		}

		return this;
	}

	/**
	 * Returns whether or not the Entity has a {@link Component} with the given name, of the name of a given Component.
	 *
	 * @param {...(Component|string)} component - The name of, or a Component with the name of, the Component to check.
	 * @return {Boolean}
	 */

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

	/**
	 * Returns the {@link Component} found with the given name, or the name of a given Component, in the Entity.
	 *
	 * @param {(Component|string)} component - The name of, or a Component with the name of, the Component to return.
	 * @return {(Component|undefined)} undefined if the Component can't be found.
	 */

	getComponent(component) {
		if(component instanceof Component || typeof component === "string")
			return this.components.get(component.name || component);
	}
}

module.exports = Entity;
