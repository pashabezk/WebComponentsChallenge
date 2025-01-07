class ReactiveVar {
	#value;
	#subscribers = [];

	constructor(initValue) {
		this.#value = initValue;
	}

	subscribe(subscribeHandler) {
		this.#subscribers.push(subscribeHandler);
	}

	unsubscribe(subscribeHandler) {
		this.#subscribers = this.#subscribers.filter((handler) => handler !== handler);
	}

	changeValue(newValue) {
		this.#value = newValue;
		this.#subscribers.forEach((handler) => {
			handler(newValue);
		});
	}

	getValue() {
		return this.#value;
	}
}

// const useReactiveVar = (reactiveVar) => {};

// const makeReactiveVar = (initialValue) => {
// 	return new ReactiveVar(initialValue);
// };

export default ReactiveVar;
