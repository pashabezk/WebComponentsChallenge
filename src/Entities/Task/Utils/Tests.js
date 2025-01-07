import UserCard from "../../../UserCard/UserCard.js";
import {STATUSES} from "../Model/Constants.js";

const BLOCK_FOR_TESTS_ID = "blockForTests";

const getBlockForTests = () => {
	return document.getElementById(BLOCK_FOR_TESTS_ID);
};

const timeout = (ms = 1000) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const nameAttributeCheck = () => {
	// test default name (should be empty string)
	let result = STATUSES.COMPLETED;
	const userCard = document.createElement("user-card");
	const blockForTests = getBlockForTests();
	blockForTests.appendChild(userCard);

	const nameParagraph = userCard.querySelector("p.user-name");
	if (nameParagraph.textContent.trim() === "") {
		console.log("name contains");
	} else {
		console.log("name not contains");
		result = STATUSES.NOT_COMPLETED;
	}
	blockForTests.removeChild(userCard);

	// test custom names
	const names = ["TestName", "NameTest"];
	names.forEach((nameToCheck) => {
		const userCard = document.createElement("user-card");
		userCard.setAttribute("name", nameToCheck);
		blockForTests.appendChild(userCard);

		const nameParagraph = userCard.querySelector("p.user-name");
		if (nameParagraph.textContent.includes(nameToCheck)) {
			console.log("name contains");
		} else {
			console.log("name not contains");
			result = STATUSES.NOT_COMPLETED;
		}
		blockForTests.removeChild(userCard);
	});

	return result;
};

export const innerHtmlCheck = () => {
	let result = STATUSES.COMPLETED;
	// const userCard = document.createElement("user-card");
	const userCard = new UserCard();
	const innerHtmlDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, "innerHTML");
	Object.defineProperty(userCard, "innerHTML", {
		get() {
			result = STATUSES.NOT_COMPLETED;
			// errors.setError(ERR_USED_INNER_HTML, true);
			return innerHtmlDescriptor.get();
		},
		set(value) {
			result = STATUSES.NOT_COMPLETED;
			// errors.setError(ERR_USED_INNER_HTML, true);
			innerHtmlDescriptor.set.call(this, value);
		},
	});
	userCard.connectedCallback();
	return result;
};

export const styleForBeforeElemCheck = async () => {
	let result = STATUSES.COMPLETED;
	const USER_FILES_FOLDER_PATH = "./UserCard";
	const USER_CARD_STYLES_PATH = USER_FILES_FOLDER_PATH + "/UserCard.css";
	const blockForTests = getBlockForTests();

	const frame = document.createElement("iframe");
	frame.setAttribute("src", "about:blank");
	frame.style.width = "200px";
	frame.style.height = "100px";
	blockForTests.appendChild(frame);

	const doc = document.implementation.createHTMLDocument("New Document");

	const link = document.createElement("link");
	link.rel = "stylesheet";
	link.href = USER_CARD_STYLES_PATH;

	const userCard = doc.createElement("user-card");

	try {
		doc.body.appendChild(userCard);
		doc.head.appendChild(link);
	} catch (e) {
		console.log(e);
	}

	const destDocument = frame.contentDocument;
	const srcNode = doc.documentElement;
	const newNode = destDocument.importNode(srcNode, true);

	destDocument.replaceChild(newNode, destDocument.documentElement);

	// destDocument.documentElement.addEventListener("DOMContentLoaded", (event) => {});
	await timeout();

	const elem = destDocument.querySelector("user-card");
	const computedStyle = destDocument.defaultView.getComputedStyle(elem, "::after");
	if (computedStyle.content === "'Element not defined'") {
		console.log("Стиль присутствует");
	} else {
		console.log("Стиль отсутствует");
		result = STATUSES.NOT_COMPLETED;
		// errors.setError(ERR_BEFORE_ELEM_ABSENT, true);
	}

	blockForTests.removeChild(frame);
	return result;
};
