import {STATUSES} from "../../Entities/Task/Model/Constants.js";

const MAP_STATUS_TO_EMOJI = {
	[STATUSES.IDLE]: "",
	[STATUSES.CHECKING]: "⏰",
	[STATUSES.COMPLETED]: "✔️",
	[STATUSES.NOT_COMPLETED]: "❌",
};

class TaskResult extends HTMLElement {
	static selector = "task-result";

	static #titleAttrName = "title";
	static #descriptionAttrName = "description";
	static #statusAttrName = "status";

	#title;
	#description;
	#status;

	#statusContainer;

	static get observedAttributes() {
		return [TaskResult.#statusAttrName];
	}

	connectedCallback() {
		this.#title = this.getAttribute(TaskResult.#titleAttrName) || "Default title";
		this.#description = this.getAttribute(TaskResult.#descriptionAttrName) || "Default description";
		this.#status = this.getAttribute(TaskResult.#statusAttrName) || STATUSES.IDLE;

		const emojiContainerId = "task-result-status-emoji";

		this.innerHTML = `
			<div class="task-result-container">
				<div class="task-result-title-container">
					<h3 class="task-result-title">${this.#title}</h3>
					<span id="${emojiContainerId}"></span>
				</div>
				<div class="task-result-body-container">
					<p>${this.#description}</p>
				</div>
			</div>
		`;

		this.#statusContainer = this.querySelector("#" + emojiContainerId);
		this.#updateStatus();
	}

	attributeChangedCallback(attrName, oldValue, newValue) {
		if (attrName === TaskResult.#statusAttrName) {
			this.#status = newValue;
			// TODO: think about using reactive vars
			this.#updateStatus();
		}
	}

	#updateStatus() {
		this.#statusContainer.textContent = MAP_STATUS_TO_EMOJI[this.#status];
	}
}

customElements.define(TaskResult.selector, TaskResult);

export default TaskResult;
