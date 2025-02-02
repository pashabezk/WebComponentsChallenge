import taskManager from "../../Entities/Task/Model/TaskManager.js";
import TaskResult from "../TaskResult/TaskResult.js";

/** Web component that represents widget to manage tasks */
class TaskList extends HTMLElement {
	static selector = "task-list";

	connectedCallback() {
		taskManager.tasks.forEach((task) => {
			const taskResultElem = document.createElement(TaskResult.selector);
			taskResultElem.setAttribute("title", task.title);
			taskResultElem.setAttribute("description", task.description);
			task.status.subscribe((status) => {
				taskResultElem.setAttribute("status", status);
			});
			this.appendChild(taskResultElem);
		});

		this.executeCheck();
	}

	executeCheck() {
		taskManager.executeCheck();
	}
}

customElements.define(TaskList.selector, TaskList);

export default TaskList;
