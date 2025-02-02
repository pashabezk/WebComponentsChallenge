/** Class, that stores variable and implements reactive logic via subscriptions */
class ReactiveVar {
	#value;
	#subscribers = [];

	constructor(initValue) {
		this.#value = initValue;
	}

	getValue() {
		return this.#value;
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

	asReadonly() {
		return new ReadonlyReactiveVar(this);
	}
}

/** Class implements that realizes reactive logic for readonly variable */
class ReadonlyReactiveVar {
	#reactiveVar;

	constructor(reactiveVar) {
		this.#reactiveVar = reactiveVar;
	}

	getValue() {
		this.#reactiveVar.getValue();
	}

	subscribe(subscribeHandler) {
		this.#reactiveVar.subscribe(subscribeHandler);
	}

	unsubscribe(subscribeHandler) {
		this.#reactiveVar.unsubscribe(subscribeHandler);
	}
}

// const useReactiveVar = (reactiveVar) => {};

// const makeReactiveVar = (initialValue) => {
// 	return new ReactiveVar(initialValue);
// };

export default ReactiveVar;
