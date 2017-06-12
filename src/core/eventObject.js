class EventObject {
	constructor() {
		this.events = new Map;
	}

	on(event, callback) {
		if(typeof event !== "string" || typeof callback !== "function")
			return;

		(this.events.get(event) || this.events.set(event, new Set).get(event)).add(callback);

		return this;
	}

	off(event, callback) {
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

	trigger(event, ...params) {
		if(this.events.has(event)) {
			this.events.get(event).forEach(e => e.apply(this, params));
		}

		return this;
	}
}

module.exports = EventObject;
