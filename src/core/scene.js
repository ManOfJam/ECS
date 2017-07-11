const Entity = require("./entity");
const EventObject = require("./eventObject");

/**
 * Containers of entities; help distinguish between different sections of the program. Systems only update the entities within
 * the current scene. Scenes are controlled by the {@link stage}.
 * 
 * @extends EventObject
 */

class Scene extends EventObject {

	/**
	 * Creates a new Scene.
	 *
	 * @param {string} name - A string used to identify the scene. This is used as the key inside the [stage's]{@link stage}
	 * scenes map, and therefore the parameter in it's [removeScene]{@link stage#removeScene},
	 * [hasScene]{@link stage#hasScene}, and [getScene]{@link stage#getScene} methods.
	 */

	constructor(name) {
		super();
		
		if(typeof name !== "string")
			throw new TypeError("Scene() name argument must be of type string");

		Object.defineProperties(this, {
			entities: {value: new Map},
			name: {value: name}
		});
	}

	/**
	 * Adds the given {@link Entity} to the Scene. If an Entity with the same id has already been added, that Entity will be
	 * replaced.
	 *
	 * @param {...Entity} entity - An instance of an Entity.
	 * @return {this}
	 */

	addEntity(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity) {
				this.entities.set(entity.id, entity);
			}
		}

		return this;
	}

	/**
	 * Removes the {@link Entity} with the given id, or the id of a given Entity, from the Scene.
	 *
	 * @param {...(Entity|string)} entity - The id of, or an Entity with the id of, the Entity to remove.
	 * @return {this}
	 */

	removeEntity(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity || typeof entity === "sting") {
				this.entities.delete(entity.id || entity);
			}
		}

		return this;
	}

	/**
	 * Returns whether or not the Scene has an {@link Entity} with the given id, or the id of a given Entity.
	 *
	 * @param {...(Entity|string)} entity - The id of, or an Entity with the id of, the Entity to check.
	 * @return {Boolean}
	 */

	hasEntity(...entities) {
		for(const entity of entities) {
			if(entity instanceof Entity || typeof entity === "string") {
				if(!(this.entities.has(entity.id || entity))) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Returns the {@link Component} found with the given id, or the id of a given Entity, in the Scene.
	 *
	 * @param {(Entity|string)} entity - The id of, or an Entity with the id of, the Entity to return.
	 * @return {(Entity|undefined)} undefined if the Entity can't be found.
	 */

	getEntity(entity) {
		if(entity instanceof Entity || typeof entity === "string")
			return this.scenes.get(entity.id || entity);
	}
}

module.exports = Scene;
