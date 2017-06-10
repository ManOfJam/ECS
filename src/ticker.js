class Ticker {
	constructor() {

		Object.defineProperties(this, {
			running: {value: false, writable: true},
			interval: {value: 10, writable: true},
			frameId: {value: null, writable: true}
		});
	}

	start(callback) {

		if(this.running)
			return;

		let then = performance.now();
		const frame = () => {
			this.frameId = requestAnimationFrame(frame);

			const now = performance.now();
			const elapsed = now - then;
			let delta = Math.floor(elapsed / this.interval);

			while(delta > 0) {
				callback();

				delta -= this.interval;
				then = now;
			}
		};

		this.frameId = requestAnimationFrame(frame);
		this.running = true;
	}

	stop() {
		if(!this.running)
			return;

		cancelAnimationFrame(this.frameId);
		this.running = false;
	}
}

module.exports = Ticker;
