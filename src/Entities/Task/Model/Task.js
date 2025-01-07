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
