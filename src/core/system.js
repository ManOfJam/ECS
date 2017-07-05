const EventObject = require("./eventObject");

/**
 *	Objects intended for updating particular components within entities. When attached to a stage, if the instance has a method
 *	named "update", it will be called during {@link stage}.[update]{@link stage#update}.
 *
 *	@extends EventObject
 */

class System extends EventObject {

	/**
	 *	Creates a new System.
	 *
	 *	@param {string} name - A string used to identify the system. This is used as the key inside a stages systems map, and
	 *	therefore the parameter in it's [removeSystem]{@link stage#removeSystem}, [hasSystem]{@link stage#hasSystem}, and
	 *	[getSystem]{@link stage#getSystem} methods.
	 *
	 *	@param {...string} required - The names of the component types that this system updates, an entity must poses all
	 *	required components in order for any one component to be updated.
	 */

	constructor(name, ...required) {
		super();
		
		if(typeof name !== "string")
			throw new TypeError("System() name argument must be of type string");

		Object.defineProperties(this, {
			name: {value: name},
			required: {value: required.filter(r => typeof r === "string")}
		});
	}
}

module.exports = System;
