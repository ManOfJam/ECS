const State = require("./state");

class StateMachine {
	constructor(initialState) {

		Object.defineProperties(this, {
			states: {value: new Map},
			current: {value: null, writable: true}
		});

		this.addState(initialState);
		this.enterState(initialState);

		console.log(this);
	}

	addState(...states) {
		for(const state of states) {
			if(state instanceof State) {
				this.states.set(state.name, state);
			}
		}

		return this;
	}

	removeState(...states) {
		for(const state of states)
			this.states.delete(state instanceof State ? state.name : state);

		return this;
	}

	hasState(...states) {
		for(const state of states) {
			if(!this.states.has(state instanceof State ? state.name : state)) {
				return false;
			}
		}

		return true;
	}

	getState(state) {
		return this.states.get(state instanceof State ? state.name : state);
	}

	enterState(state) {
		const next = this.getState(state);

		if(next)
			this.current = next;

		return this;
	}
}

module.exports = StateMachine;
