import {LocalStorageHelper, LocalStorageKeys} from "../../../Features/LocalStorageHelper/LocalStorageHelper.js";
import {innerHtmlCheck, nameAttributeCheck, styleForBeforeElemCheck} from "../Utils/Tests.js";
import {STATUSES, TASKS_IDS} from "./Constants.js";
import Task from "./Task.js";

class TaskManager {
	/**
	 * Store current task on which user works
	 * @type {number}
	 */
	#currentTask = 0;

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
		this.#currentTask = parseInt(LocalStorageHelper.read(LocalStorageKeys.CURRENT_TASK)) || 0;
	}

	get tasks() {
		return this.#tasks.slice(0, this.#currentTask + 1);
	}

	getTaskById(taskId) {
		return this.#tasks.find((task) => task.id === taskId);
	}

	async executeCheck() {
		this.#tasks.forEach((task) => {
			task.changeStatus(STATUSES.IDLE);
		});

		for (let i = 0; i < Math.min(/*this.#currentTask + 1,*/ this.#tasks.length); i++) {
			const task = this.#tasks[i];
			task.changeStatus(STATUSES.CHECKING);
			const result = await task.handler();
			task.changeStatus(result);
			// TODO: add check that all previous tasks also completed
			if (i === this.#currentTask && result === STATUSES.COMPLETED) {
				this.#currentTask++;
				LocalStorageHelper.write(LocalStorageKeys.CURRENT_TASK, this.#currentTask);
			}
		}
	}
}

const taskManager = new TaskManager();

export default taskManager;
