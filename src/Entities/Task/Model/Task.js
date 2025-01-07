import ReactiveVar from "../../../Features/ReactiveVar/ReactiveVar.js";
import {STATUSES} from "./Constants.js";

class Task {
	constructor({
		id = null,
		title = "",
		description = "",
		status = STATUSES.IDLE,
		handler = () => {},
	} = {}) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.status = new ReactiveVar(status);
		this.handler = handler;
	}

	changeStatus(status) {
		this.status.changeValue(status);
	}
}

export default Task;
