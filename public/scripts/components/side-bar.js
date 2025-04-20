class SideBar extends CustomElement {
	constructor() {
		super();

		// Wait for DOM to be ready
		this.whenReady(() => {
			// Set the inner HTML
			this.innerHTML = html`
				<account-panel></account-panel>
				<div class="separator"></div>
			`;
		});
	}
}

defineComponent(html`<side-bar />`);
