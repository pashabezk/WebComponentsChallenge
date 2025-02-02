/**
 * Handler to subscribe on reactive variable changes
 * @template T
 * @callback ReactiveVarSubscribeHandler
 * @param {T} newValue New variable value
 */

/**
 * Class, that stores variable and implements reactive logic via subscriptions
 * @template T stored value type
 */
class ReactiveVar {
	/**
	 * Store value
	 * @type {T}
	 */
	#value;

	/**
	 * Stored subscribers
	 * @type {ReactiveVarSubscribeHandler<T>[]}
	 */
	#subscribers = [];

	/**
	 * @param {T} initValue
	 */
	constructor(initValue) {
		this.#value = initValue;
	}

	/**
	 * Get stored variable value
	 * @return {T}
	 */
	getValue() {
		return this.#value;
	}

	/**
	 * Add subscriber
	 * @param {ReactiveVarSubscribeHandler<T>} subscribeHandler
	 */
	subscribe(subscribeHandler) {
		this.#subscribers.push(subscribeHandler);
	}

	/**
	 * Remove subscription
	 * @param {ReactiveVarSubscribeHandler<T>} subscribeHandler
	 */
	unsubscribe(subscribeHandler) {
		this.#subscribers = this.#subscribers.filter((handler) => handler !== subscribeHandler);
	}

	/**
	 * Method for set new value
	 * @param {T} newValue
	 */
	changeValue(newValue) {
		this.#value = newValue;
		this.#subscribers.forEach((handler) => {
			handler(newValue);
		});
	}

	/**
	 * Returns readonly reactive var instance
	 * @return {ReadonlyReactiveVar<T>}
	 */
	asReadonly() {
		return new ReadonlyReactiveVar(this);
	}
}

/**
 * Class that realizes reactive logic for readonly variable
 * @template T stored value type
 */
class ReadonlyReactiveVar {
	/** @type {ReactiveVar<T>} */
	#reactiveVar;

	/** @param {ReactiveVar<T>} reactiveVar */
	constructor(reactiveVar) {
		this.#reactiveVar = reactiveVar;
	}

	/**
	 * Get stored variable value
	 * @return {T}
	 */
	getValue() {
		this.#reactiveVar.getValue();
	}

	/**
	 * Add subscriber
	 * @param {ReactiveVarSubscribeHandler<T>} subscribeHandler
	 */
	subscribe(subscribeHandler) {
		this.#reactiveVar.subscribe(subscribeHandler);
	}

	/**
	 * Remove subscription
	 * @param {ReactiveVarSubscribeHandler<T>} subscribeHandler
	 */
	unsubscribe(subscribeHandler) {
		this.#reactiveVar.unsubscribe(subscribeHandler);
	}
}

export default ReactiveVar;
