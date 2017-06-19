class EventObject {
	constructor() {
		Object.defineProperty(this, "events", {value: new Map});
	}

	listen(event, ...callbacks) {
		if(typeof event === "string") {
			this.events.get(event) || this.events.set(event, new Set).get(event);

			if(!this.events.has(event)) {
				this.events.set(event, new Set);
			}

			const handlers = this.events.get(event);

			for(const callback of callbacks) {
				if(typeof callback === "function") {
					handlers.add(callback);
				}
			}
		}

		return this;
	}

	deafen(event, ...callback) {
		if(!event) {
			this.events.clear();
		}

		if(this.events.has(event)) {
			if(!callback) {
				this.events.delete(event);
			}
			else {
				this.events.get(event).delete(callback);
			}
		}

		return this;
	}

	trigger(event, ...args) {
		if(this.events.has(event)) {
			this.events.get(event).forEach(e => e.apply(this, args));
		}

		return this;
	}
}

module.exports = EventObject;
