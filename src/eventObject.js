class EventObject {
	constructor() {
		this.events = {};
	}

	on(events, callbacks) {
		events = (Array.isArray(events) ? events : [events]).filter(event => typeof event === "string");
		callbacks = (Array.isArray(callbacks) ? callbacks : [callbacks]).filter(callback => typeof callback === "function");

		if(events.length && callbacks.length)
			for(let event of events)
				this.events[event] = (this.events[event] || (this.events[event] = [])).concat(callbacks);
	}

	off(events, callbacks) {
	}

	trigger() {
	}
}

module.exports = EventObject;
