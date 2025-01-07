class IfCustomElement extends HTMLElement {
	static #conditionAttrName = "condition";
	static #hideClass = "hide";

	#savedInnerHTML = "";

	static get observedAttributes() {
		return [IfCustomElement.#conditionAttrName];
	}

	connectedCallback() {
		// setTimeout(() => {
		// 	console.log(this.children);
		// }, 0);
	}

	attributeChangedCallback(attrName, oldValue, newValue) {
		if (attrName === IfCustomElement.#conditionAttrName) {
			// console.log("change attr", attrName, oldValue, newValue);
			if (oldValue !== newValue) {
				const condition = newValue === "true";
				if (condition) {
					this.#showContent();
				} else {
					this.#hideContent();
				}
			}
		}
	}

	#hideContent() {
		this.classList.add(IfCustomElement.#hideClass);
		this.innerHTML = this.innerHTML + "<p>added</p>";
	}

	#showContent() {
		this.classList.remove(IfCustomElement.#hideClass);
	}
}

customElements.define("if-tag", IfCustomElement);
