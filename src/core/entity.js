const Component = require("./component");
const EventObject = require("./eventObject");
const random = require("./common/random");

/**
 *	Class representing an Entity.
 *
 *	Contain [components]{@link component} that contain the data representing the entity's state. They are iterated over on each
 *	{@link stage}.[update]{@link stage#update} call, and entities with a [systems]{@system} required components will be
 *	updated.
 *	
 *	@extends EventObject
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
	 *	Adds the given {@link component} to the entity. If a component with the same name is already attached to the entity,
	 *	that component will be replaced.
	 *
	 *	@param {...Component} component - An instance of a component.
	 *	@return {this}
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
	 *	Removes the {@link component} with the given name, or matching the name of a given component, from the entity.
	 *
	 *	@param {...(Component|string)} component - The name of, or a component with the name of, the component to remove.
	 *	@return {this}
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
	 *	Returns whether or not the entity has the given {@link component}, or a component matching the name of a given
	 *	component.
	 *
	 *	@param {...(Component|string)} component - The name of, or a component with the name of, the component to check.
	 *	@return {Boolean}
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
	 *	Returns the {@link component} found with the given name, or matching the name of a given component.
	 *
	 *	@param {(Component|string)} component - The name of, or a component with the name of, the component to return.
	 *	@return {(Component|undefined)} undefined if the component can't be found.
	 */

	getComponent(component) {
		if(component instanceof Component || typeof component === "string")
			return this.components.get(component.name || component);
	}
}

module.exports = Entity;
