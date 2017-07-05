const Entity = require("./entity");
const EventObject = require("./eventObject");

/**
 *	Containers of entities; help distinguish between different sections of the program. Systems only update the entities within
 *	the current scene. Scenes are controlled by the {@link stage}.
 * 
 *	@extends EventObject
 */

class Scene extends EventObject {

	/**
	 *	Creates a new Scene.
	 *
	 *	@param {string} name - A string used to identify the scene. This is used as the key inside the [stage's]{@link stage}
	 *	scenes map, and therefore the parameter in it's [removeScene]{@link stage#removeScene},
	 *	[hasScene]{@link stage#hasScene}, and [getScene]{@link stage#getScene} methods.
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
	 *	Adds the given {@link entity} to the scene. If an entity with the same id is already in the scene, that entity will be
	 *	replaced.
	 *
	 *	@param {...Entity} entity - An instance of an Entity
	 *	@return {this}
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
	 *	Removes the [entity]{@link entity} with the given id or matching the id of a given entity, from the scene. Unlike
	 *	systems, components, and scenes, entities posses an ID, which is unique to each instance, so if the user is
	 *	passing an entity, then it is that exact instance that will be removed.
	 *	
	 *	@param {...(Entity|string)} entity - The id of, or the instance of, the entity to remove.
	 *	@return {this}
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
	 *	Returns whether or not the scene has the given {@link entity}, or an entity matching the id of a given entity.
	 *
	 *	@param {...(Entity|string)} entity - The id of, or an entity with the id of, the entity to check.
	 *	@return {Boolean}
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
	 *	Returns the {@link entity} found with the given id, or matching the id of a given entity.
	 *
	 *	@param {(Entity|string)} entity - The id of, or an entity with the id of, the entity to return.
	 *	@return {(Entity|undefined)} undefined if the entity can't be found.
	 */

	getEntity(entity) {
		if(entity instanceof Entity || typeof entity === "string")
			return this.scenes.get(entity.id || entity);
	}
}

module.exports = Scene;
