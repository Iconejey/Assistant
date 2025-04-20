class ChatArea extends CustomElement {
	constructor() {
		super();

		// Wait for DOM to be ready
		this.whenReady(() => {
			// Set the inner HTML
			this.innerHTML = html`
				<div id="chat"></div>

				<div id="user" class="panel">
					<span class="icon">magic_button</span>
					<text-input placeholder="Ask me anything" multiline />
				</div>
			`;

			this.$('#user text-input').onsubmit = text => {
				console.log('User input:', text);
			};
		});
	}
}

defineComponent(html`<chat-area />`);
