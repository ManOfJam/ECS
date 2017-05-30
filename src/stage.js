const EventObject = require("./eventObject.js");
const System = require("./system.js");
const Scene = require("./scene.js");

class Stage extends EventObject {
	constructor(...systems) {
		super();

		this.systems = [];
		this.addSystem.apply(this, systems);
		this.scenes = {};
		this.addScene(new Scene("main"));
		this.currentName = "main";
		this.ticker = {
			interval: 1000,
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
		this.systems.forEach(system => system.update(delta));
	}

	start() {
		this.ticker.start();
	}

	stop() {
		this.ticker.stop();
	}
}

module.exports = Stage;
