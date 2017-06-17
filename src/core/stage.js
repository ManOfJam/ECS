const Scene = require("./scene");
const System = require("./system");
const Ticker = require("./ticker");
const extend = require("./common/extend");

class Stage {
	constructor(options) {
		const defaults = {
			autorun: false,
			interval: 10,
			height: 600,
			width: 800
		};

		const settings = extend(defaults, options);

		Object.defineProperties(this, {
			scene: {writable: true},
			scenes: {value: new Map},
			systems: {value: new Map},
			ticker: {value: new Ticker(settings.interval)}
		});

		this.width = parseInt(settings.width) || defaults.width;
		this.height = parseInt(settings.height) || defaults.height;
		this.addScene(new Scene("index"));
		this.enterScene("index");

		if(settings.autorun)
			this.start();
	}

	addScene(...scenes) {
		for(const scene of scenes) {
			if(scene instanceof Scene) {
				this.scenes.set(scene.name, scene);
			}
		}

		return this;
	}

	removeScene(...scenes) {
		for(const scene of scenes) {
			if(scene instanceof Scene || typeof scene === "string") {
				this.scenes.delete(scene.name || scene);
			}
		}

		return this;
	}

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

	getScene(scene) {
		if(scene instanceof Scene || typeof scene === "string")
			return this.scenes.get(scene.name || scene);
	}

	enterScene(scene) {
		if(this.hasScene(scene))
			this.scene = this.getScene(scene);

		return this;
	}

	addSystem(...systems) {
		for(const system of systems) {
			if(system instanceof System) {
				this.systems.set(system.name, system);
			}
		}

		return this;
	}

	removeSystem(...systems) {
		for(const system of systems) {
			if(system instanceof System || typeof system === "string") {
				this.systems.delete(system.name || system);
			}
		}

		return this;
	}

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

	getSystem(system) {
		if(system instanceof System || typeof system === "string")
			return this.systems.get(system.name || system);
	}

	addEntity(...entities) {
		this.scene.addEntity(...entities);

		return this;
	}

	removeEntity(...entities) {
		this.scene.removeEntity(...entities);

		return this;
	}

	hasEntity(...entities) {
		this.scene.hasEntity(...entities);

		return this;
	}

	getEntity(entity) {
		return this.scene.getEntity(entity);
	}

	start() {
		this.ticker.start(this.update.bind(this));

		return this;
	}

	stop() {
		this.ticker.stop();

		return this;
	}

	update(delta) {
		for(const [name, system] of this.systems) {
			if(typeof system.update !== "function")
				continue;

			const entities = Array.from(this.scene.entities)
				.map(entry => entry[1])
				.filter(entity => entity.hasComponent(...system.required));

			system.update(delta, ...entities);
		}

		return this;
	}
}

module.exports = Stage;
