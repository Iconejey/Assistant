class MainApp extends CustomElement {
	constructor() {
		super();
		window.app = this;

		// Auth from URL
		authFromURL();

		// Wait for DOM to be ready
		this.whenReady(() => {
			// Set the inner HTML
			this.innerHTML = html`
				<side-bar />
				<chat-area />
			`;
		});
	}

	// Resize for dev screenshot
	resizeDevScreenshot() {
		window.moveTo(5, 10);
		window.resizeTo(1000, 750);
		window.focus();
	}
}

defineComponent(html`<main-app />`);
