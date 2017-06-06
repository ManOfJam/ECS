const EventObject = require("./eventObject");
const System = require("./system");
const Scene = require("./scene");
const extend = require("./common/extend");

class Stage extends EventObject {
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
					const delta = Math.floor(elapsed / this.interval);

					if(delta) {
						this.tick(delta);
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
	}

	addEntity(...entities) {
		this.currentScene.addEntity.apply(this.currentScene, entities);
	}

	addScene(...scenes) {
		scenes.forEach(s => {
			if(s instanceof Scene) this.scenes[s.name] = s;
		});
	}

	update(delta) {
		this.systems.forEach(system => {
			if(typeof system.update === "function") {
				system.update(Object.values(this.currentScene.entities), delta);
			}
		});
	}

	start() {
		this.ticker.start();
	}

	stop() {
		this.ticker.stop();
	}
}

module.exports = Stage;
