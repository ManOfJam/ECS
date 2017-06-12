const System = require("./system");
const Scene = require("./scene");
const Ticker = require("./ticker");
const extend = require("./common/extend");

class Stage {
	constructor(options) {
		Object.defineProperties(this, {
			scenes: {value: new Map},
			scene: {value: null, writable: true},
			systems: {value: new Map},
			ticker: {value: new Ticker}
		});

		const settings = {
			width: 720,
			height: 720,
			scene: new Scene()
		};

		extend(settings, options);
		
		this.addScene("main", settings.scene);
		this.enterScene("main");
	}

	addScene(name, scene) {
		if(scene instanceof Scene)
			this.scenes.set(name, scene);

		return this;
	}

	removeScene(...names) {
		for(const name of names)
			this.scenes.delete(name);

		return this;
	}

	hasScene(...names) {
		for(const name of names) {
			if(!this.scenes.has(name)) {
				return false;
			}
		}

		return true;
	}

	getScene(name) {
		return this.scenes.get(name);
	}

	enterScene(name) {
		const scene = this.getScene(name);

		if(scene) {
			this.scene = scene;
		}

		return this;
	}

	addEntity(...entities) {
		this.scene.addEntity.apply(this.scene, entities);

		return this;
	}

	removeEntiy(...entities) {
		this.scene.removeEntity.apply(this.scene, entities);

		return this;
	}

	hasEntity(...entities) {
		return this.scene.hasEntity.apply(this.scene, entities);
	}

	getEntity(entity) {
		return this.scene.getEntity(entity);
	}

	getEntities() {
		return Array.from(this.scene.entities).map(entry => entry[1]);
	}

	addSystem(name, system) {
		if(system instanceof System)
			this.systems.set(name, system);

		return this;
	}

	removeSystem(...names) {
		for(const name of names)
			this.systems.delete(name);

		return this;
	}

	hasSystem(...names) {
		for(const name of names) {
			if(!this.systems.has(name)) {
				return false;
			}
		}

		return true;
	}

	getSystem(name) {
		return this.systems.get(name);
	}

	start() {
		this.ticker.start(this.update.bind(this));
	}

	stop() {
		this.ticker.stop();
	}

	update() {
		for(const [name, system] of this.systems) {
			if(typeof system.update !== "function")
				continue;

			const entities = this.getEntities().filter(
				entity => entity.hasComponent.apply(entity, system.required)
			);

			system.update.apply(system, entities);
		}
	}
}

module.exports = Stage;
