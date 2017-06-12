class Ticker {
	constructor(interval, autorun) {
		Object.defineProperties(this, {
			active: {
				value: !!autorun,
				writable: true
			},

			interval: {
				value: Math.abs(parseInt(interval)) || 1,
				writable: true
			},

			frameId: {
				value: null,
				writable: true
			}
		});
	}

	start(callback) {
		if(this.active)
			return;

		let then = performance.now();
		const frame = () => {
			this.frameId = requestAnimationFrame(frame);

			const now = performance.now();
			const elapsed = now - then;
			let delta = Math.floor(elapsed / this.interval);

			if(delta) {
				callback(delta);
				then = now;
			}
		};

		this.frameId = requestAnimationFrame(frame);
		this.active = true;
	}

	stop() {
		if(!this.active)
			return;

		cancelAnimationFrame(this.frameId);
		this.active = false;
	}
}

module.exports = Ticker;
