const EventObject = require("./eventObject");
const extend = ("./common/extend");

/**
 *	Parent class for all components.
 *
 *	Components are just conventional JavaScript classes with their respective properties and methods, however they require a
 *	name property, and it is required they extend this class due to use of the instanceof operator within the engine core.
 *
 *	When attached to an {@link Entity}, they may be updated by [systems]{@link System} if all the systems required components
 *	are present.
 *
 *	@extends EventObject
 */

class Component extends EventObject {

	/**
	 *	Creates a new Component.
	 *
	 *	@param {string} name - A string used to identify the type of component. This is used as the key inside an entities
	 *	components map, and therefore the parameter in it's [removeComponent]{@link entity#removeComponent},
	 *	[hasComponent]{@link entity#hasComponent}, and [getComponent]{@link entity#getComponent} methods.
	 */

	constructor(name) {
		super();
		
		if(typeof name !== "string")
			throw new TypeError("Component() name argument must be of type string");

		Object.defineProperty(this, "name", {value: name});
	}
}

module.exports = Component;
