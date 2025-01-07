class UserCard extends HTMLElement {
	#name;
	#surname;

	connectedCallback() {
		this.#name = this.getAttribute("name") || "";
		this.#surname = this.getAttribute("surname") || "";
		const imgSrc = this.getAttribute("img-src") || "assets/profile-user.png";

		this.innerHTML = `
			<div class="user-card">
				<div class="user-info">
					<p class="user-name">${this.#name} ${this.#surname}</p>
					<button class="action-button">Подписаться</button>
				</div>
			</div>
		`;
		//  <img class="user-image" src="${imgSrc}" alt="user photo">

		this.querySelector("button").addEventListener("click", () =>
			this.onSubscribe()
		);
	}

	onSubscribe() {
		const details = {name: this.#name, surname: this.#surname};
		this.dispatchEvent(new CustomEvent("subscribe", {detail: details}));
	}
}

customElements.define("user-card", UserCard);
