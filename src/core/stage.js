const EventObject = require("./eventObject");
const Scene = require("./scene");
const System = require("./system");
const from = require("./common/from");

/**
 *	
 */

class Stage extends EventObject {

	/**
	 * Creates a new stage.
	 *
	 * @param {Object} options
	 */
	 
	constructor(options) {
		super();
		
		const defaults = {
			autorun: false,
			interval: 1
		};

		const settings = from(defaults, options);

		Object.defineProperties(this, {
			active: {value: false, writable: true},
			frameId: {value: null, writable: true},
			interval: {value: Math.max(0, Number(settings.interval)) || 1},
			scene:{writable: true},
			scenes: {value: new Map},
			systems: {value: new Map},
		});

		this.addScene(new Scene("index"));
		this.enterScene("index");

		if(settings.autorun)
			this.start();
	}

	/**
	 * Adds the given {@link Scene} to the Stage. If a Scene with the same name has already been added, that Scene will be
	 * replaced.
	 *
	 * @param {...Scene} scene - An instance of a Scene.
	 * @return {this}
	 */

	addScene(...scenes) {
		for(const scene of scenes) {
			if(scene instanceof Scene) {
				this.scenes.set(scene.name, scene);
			}
		}

		return this;
	}

	/**
	 * Removes the {@link Scene} with the given name, or the name of a given Scene, from the Stage.
	 *
	 * @param {...(Scene|string)} scene - The name of, or a Scene with the name of, the Scene to remove.
	 * @return {this}
	 */

	removeScene(...scenes) {
		for(const scene of scenes) {
			if(scene instanceof Scene || typeof scene === "string") {
				this.scenes.delete(scene.name || scene);
			}
		}

		return this;
	}

	/**
	 * Returns whether or not the Stage has a {@link Scene} with the given name, or the name of a given Scene.
	 *
	 * @param {...(Scene|string)} scene - The name of, or a Scene with the name of, the Scene to check.
	 * @return {Boolean}
	 */

	hasScene(...scenes) {
		for(const scene of scenes) {
			if(scene instanceof Scene || typeof scene === "string") {
				if(!(this.scenes.has(scene.name || scene))) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Returns the {@link Scene} found with the given name, or the name of a given Scene.
	 *
	 * @param {(Scene|string)} scene - The name of, or a Scene with the name of, the Scene to return.
	 * @return {(Scene|undefined)} undefined if the Scene can't be found.
	 */

	getScene(scene) {
		if(scene instanceof Scene || typeof scene === "string")
			return this.scenes.get(scene.name || scene);
	}

	/**
	 * 
	 */

	enterScene(scene) {
		if(this.hasScene(scene))
			this.scene = this.getScene(scene);

		this.scene.trigger("enter");

		return this;
	}

	/**
	 * Adds the given {@link System} to the Stage. If a System with the same name has already been added, that System will
	 * be replaced.
	 *
	 * @param {...System} system - An instance of a System.
	 * @return {this}
	 */

	addSystem(...systems) {
		for(const system of systems) {
			if(system instanceof System) {
				this.systems.set(system.name, system);
			}
		}

		return this;
	}

	/**
	 * Removes the {@link System} with the given System, or the name of a given System, from the Stage.
	 *
	 * @param {...(System|string)} system - The name of, or a System with the name of, the System to remove.
	 * @return {this}
	 */

	removeSystem(...systems) {
		for(const system of systems) {
			if(system instanceof System || typeof system === "string") {
				this.systems.delete(system.name || system);
			}
		}

		return this;
	}

	/**
	 * Returns whether or not the Stage has a {@link System} with the given name, or the name of a given System.
	 *
	 * @param {...(System|string)} system - The name of, or a System with the name of, the System to check.
	 * @return {Boolean}
	 */

	hasSystem(...systems) {
		for(const system of systems) {
			if(system instanceof System || typeof system === "string") {
				if(!(this.systems.has(system.name || system))) {
					return false;
				}
			}
		}

		return true;
	}

	/**
	 * Returns the {@link System} found with the given name, or the name of a given System, in the Stage.
	 *
	 * @param {(System|string)} system - The name of, or a System with the name of, the System to return.
	 * @return {(System|undefined)} undefined if the System can't be found.
	 */

	getSystem(system) {
		if(system instanceof System || typeof system === "string")
			return this.systems.get(system.name || system);
	}

	/**
	 * Adds the given {@link Entity} to the stage's active scene. If an Entity with the same id has already been added, that
	 * Entity will be replaced.
	 *
	 * @param {...<item>} <item> - An instance of a|an <item>.
	 * @return {this}
	 */

	addEntity(...entities) {
		this.scene.addEntity(...entities);

		return this;
	}

	/**
	 * Removes the {@link Entity} with the given id, or the id of a given Entity, from the stage's active scene.
	 *
	 * @param {...(Entity|string)} entity - The id of, or an Entity with the id of, the Entity to remove.
	 * @return {this}
	 *
	 * @todo remove the entity from all scenes.
	 */

	removeEntity(...entities) {
		this.scene.removeEntity(...entities);

		return this;
	}

	/**
	 * Returns whether or not the stage's active scene has an {@link Entity} with the given id, or the id of a given Entity.
	 *
	 * @param {...(Entity|string)} entity - The id of, or an Entity with the id of, the Entity to check.
	 * @return {Boolean}
	 *
	 * @todo Search all scenes.
	 */

	hasEntity(...entities) {
		this.scene.hasEntity(...entities);

		return this;
	}

	/**
	 * Returns the {@link Component} found with the given id, or the id of a given Entity, in the stage's active scene.
	 *
	 * @param {(Entity|string)} entity - The id of, or an Entity with the id of, the Entity to return.
	 * @return {(Entity|undefined)} undefined if the Entity can't be found.
	 *
	 * @todo Return the entity from any scene.
	 */

	getEntity(entity) {
		return this.scene.getEntity(entity);
	}

	/**
	 *
	 */

	start() {
		if(!this.active) {
			let then = performance.now();
			const frame = () => {
				this.frameId = requestAnimationFrame(frame);

				const now = performance.now();
				const elapsed = now - then;
				let delta = Math.floor(elapsed / this.interval);

				if(delta) {
					this.update(delta);
					then = now;
				}
			};

			this.frameId = requestAnimationFrame(frame);
			this.active = true;
		}

		this.trigger("start");

		return this;
	}

	/**
	 *
	 */

	stop() {
		if(this.active) {
			cancelAnimationFrame(this.frameId);
			this.active = false;
		}

		this.trigger("stop");

		return this;
	}

	/**
	 *
	 */

	update(delta) {
		for(const [name, system] of this.systems) {
			if(typeof system.update === "function") {
				const entities = Array.from(this.scene.entities.values())
				const hasRequired = entities.filter(entity => entity.hasComponent(...system.required));

				system.update(hasRequired, delta);
			}
		}

		this.trigger("update");

		return this;
	}
}

module.exports = Stage;
