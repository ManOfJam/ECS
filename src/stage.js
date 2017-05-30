const Scene = require("./scene.js");

class Stage extends Scene {
	constructor(...systems) {
		super();

		this.scenes = [];
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

			tick: (delta) => {
				this.systems.forEach(system => system.update(delta));
			}
		};

		this.addSystem.apply(this, systems);
	}

	start() {
		this.ticker.start();
	}
}

module.exports = Stage;
