const EventObject = require("./eventObject");
const StateMachine = require("./stateMachine");
const System = require("./system");
const Scene = require("./scene");
const extend = require("./common/extend");

class Stage extends StateMachine {
	constructor() {
		super(new Scene("main"));

		Object.defineProperties(this, {
			systems: {value: new Map}
		});
	}

	addEntity(...entities) {
		this.current.addEntity.apply(this.current, entities);

		return this;
	}

	removeEntiy(...entities) {
		this.current.removeEntity.apply(this.current, entities);

		return this;
	}

	hasEntity(...entities) {
		return this.current.hasEntity.apply(this.current, entities);
	}

	getEntity(entity) {
		return this.current.getEntity(entity);
	}

	addScene(...scenes) {
		this.addState.apply(this, scenes);

		return this;
	}

	removeScene(...scenes) {
		this.removeScene.apply(this, scenes);

		return this;
	}

	hasScene(...scenes) {
		return this.hasState.apply(this, scenes);
	}

	getScene(scene) {
		return this.getState.apply(this, scene);
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
			if(system instanceof System) {
				this.system.delete(system.name);
			}
		}

		return this;
	}

	hasSystem(...systems) {
		for(const system of systems) {
			if(!this.systems.has(systems)) {
				return false;
			}
		}

		return true;
	}

	getSystem(system) {
		return this.systems.get(system);
	}
}

module.exports = Stage;

/* class Stage extends EventObject {
	constructor(options, ...systems) {
		super();

		if(options instanceof System) {
			systems.unshift(options);
			options = {};
		}

		const settings = {
			width: 720,
			height: 720
		};

		extend(this, settings, options);

		this.systems = [];
		this.addSystem.apply(this, systems);
		this.scenes = {};
		this.addScene(new Scene("main"));
		this.currentName = "main";
		this.ticker = {
			interval: 10,
			running: false,
			frameId: null,

			start() {
				if(this.running) return;

				let then = performance.now();
				const frame = () => {
					this.frameId = requestAnimationFrame(frame);

					const now = performance.now();
					const elapsed = now - then;
					let delta = Math.floor(elapsed / this.interval);

					while(delta > 0) {
						this.tick();

						delta -= this.interval;
						then = now;
					}
				};

				this.frameId = requestAnimationFrame(frame);
				this.running = true;
			},

			stop() {
				if(!this.running) return;

				cancelAnimationFrame(this.frameId);
				this.running = false;
			},

			tick: (delta) => this.update(delta)
		};
	}

	get currentScene() {
		return this.scenes[this.currentName];
	}

	addSystem(...systems) {
		this.systems = this.systems.concat(systems.filter(system => system instanceof System));

		return this;
	}

	addEntity(...entities) {
		this.currentScene.addEntity.apply(this.currentScene, entities);

		return this;
	}

	addScene(...scenes) {
		scenes.forEach(s => {
			if(s instanceof Scene) this.scenes[s.name] = s;
		});

		return this;
	}

	update(delta) {
		this.systems.forEach(system => {
			if(typeof system.update === "function") {
				system.update(Object.values(this.currentScene.entities), delta);
			}
		});

		return this;
	}

	start() {
		this.ticker.start();

		return this;
	}

	stop() {
		this.ticker.stop();

		return this;
	}
}

module.exports = Stage; */
