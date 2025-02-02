import taskManager from "../../Entities/Task/Model/TaskManager.js";
import TaskResult from "../TaskResult/TaskResult.js";

/** Web component that represents widget to manage tasks */
class TaskList extends HTMLElement {
	static selector = "task-list";

	/**
	 * Set with already rendered tasks.
	 * Need for render optimization
	 * @type {Set<TASKS_IDS>}
	 */
	#renderedTasks = new Set();

	/**
	 * Stores handler for subscription
	 * @type ReactiveVarSubscribeHandler<number>
	 */
	#currentTaskSubscribeHelper = () => this.#render();

	connectedCallback() {
		this.#render();
		taskManager.currentTask.subscribe(this.#currentTaskSubscribeHelper);
		taskManager.executeCheck();
	}

	disconnectedCallback() {
		taskManager.currentTask.unsubscribe(this.#currentTaskSubscribeHelper);
	}

	#render() {
		taskManager.tasks.forEach((task) => {
			if (this.#renderedTasks.has(task.id)) {
				return;
			}
			const taskResultElem = document.createElement(TaskResult.selector);
			taskResultElem.setAttribute("title", task.title);
			taskResultElem.setAttribute("description", task.description);
			task.status.subscribe((status) => {
				taskResultElem.setAttribute("status", status);
			});
			this.appendChild(taskResultElem);
			this.#renderedTasks.add(task.id);
		});
	}
}

customElements.define(TaskList.selector, TaskList);

export default TaskList;
