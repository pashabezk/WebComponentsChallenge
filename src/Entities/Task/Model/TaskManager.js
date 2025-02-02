import {LocalStorageHelper, LocalStorageKeys} from "../../../Features/LocalStorageHelper/LocalStorageHelper.js";
import ReactiveVar from "../../../Features/ReactiveVar/ReactiveVar.js";
import {innerHtmlCheck, nameAttributeCheck, styleForBeforeElemCheck} from "../Utils/Tests.js";
import {STATUSES, TASKS_IDS} from "./Constants.js";
import Task from "./Task.js";

class TaskManager {
	/**
	 * Store current task on which user works
	 * @type {ReactiveVar<number>}
	 */
	#currentTask = new ReactiveVar(0);

	/** @type {Task[]} */
	#tasks = [
		new Task({
			id: TASKS_IDS.NAME_ATTRIBUTE,
			title: "Name attribute",
			description: "Component should have attribute name. Default name is empty string ('')",
			handler: nameAttributeCheck,
		}),
		new Task({
			id: TASKS_IDS.WARNING,
			title: "Warning",
			description: "Add style for '::after' pseudoelement if component not defined. After should containt the following text: 'text'",
			handler: styleForBeforeElemCheck,
		}),
		new Task({
			id: TASKS_IDS.INNER_HTML_FORBIDDEN,
			title: "InnerHTML forbidden",
			description: "Do not use property innerHTML on component initialization",
			handler: innerHtmlCheck,
		}),
	];

	constructor() {
		this.#currentTask.changeValue(parseInt(LocalStorageHelper.read(LocalStorageKeys.CURRENT_TASK)) || 0);
	}

	/**
	 * Available for user tasks
	 * @return {Task[]}
	 */
	get tasks() {
		return this.#tasks.slice(0, this.#currentTask.getValue() + 1);
	}

	/**
	 * Current task on which user works
	 * @return {ReadonlyReactiveVar<number>}
	 */
	get currentTask() {
		return this.#currentTask.asReadonly();
	}

	// getTaskById(taskId) {
	// 	return this.#tasks.find((task) => task.id === taskId);
	// }

	/** Method to start checking tasks */
	async executeCheck() {
		this.#tasks.forEach((task) => {
			task.changeStatus(STATUSES.IDLE);
		});

		for (let i = 0; i < Math.min(this.#currentTask.getValue() + 1, this.#tasks.length); i++) {
			const task = this.#tasks[i];
			task.changeStatus(STATUSES.CHECKING);
			const result = await task.handler();
			task.changeStatus(result);
			// TODO: add check that all previous tasks also completed
			if (i === this.#currentTask.getValue() && result === STATUSES.COMPLETED) {
				this.#currentTask.changeValue(this.#currentTask.getValue() + 1);
				LocalStorageHelper.write(LocalStorageKeys.CURRENT_TASK, this.#currentTask.getValue());
			}
		}
	}
}

const taskManager = new TaskManager();

export default taskManager;
