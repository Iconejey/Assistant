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
				<main>
					<chat-area class="empty" />
				</main>
				<span id="menu" class="icon" title="Menu">menu</span>
			`;

			// Toggle menu on click
			this.$('#menu').onclick = () => body_class.add('menu');
			this.$('main').onclick = () => body_class.remove('menu');
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
