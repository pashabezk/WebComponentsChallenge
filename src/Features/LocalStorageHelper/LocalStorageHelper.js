/**
 * Available keys saved in localStorage
 * @enum {string}
 */
export const LocalStorageKeys = {
	CURRENT_TASK: "CURRENT_TASK",
};

/** Class to store helpers for work with local storage */
export class LocalStorageHelper {
	/**
	 * Wrapper to read value from local storage
	 * @param key {LocalStorageKeys}
	 * @return {string | undefined}
	 */
	static read(key) {
		return localStorage.getItem(key);
	}

	/**
	 * Wrapper to write to local storage
	 * @param key {LocalStorageKeys}
	 * @param value {string}
	 */
	static write(key, value) {
		localStorage.setItem(key, value);
	}
}
