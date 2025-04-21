class ChatArea extends CustomElement {
	constructor() {
		super();

		// Wait for DOM to be ready
		this.whenReady(() => this.addUserMessage());
	}

	// Add user message
	addUserMessage() {
		const msg = document.createElement('div');
		msg.classList.add('msg', 'user');
		this.appendChild(msg);

		msg.innerHTML = html`
			<text-input placeholder="Your message..." multiline />
			<span class="send icon" title="Send message">send</span>
		`;

		msg.$('text-input').onsubmit = text => this.sendMessage(text);
		msg.$('span.send').onclick = e => this.sendMessage(msg.$('text-input').innerText);
	}

	async sendMessage(text) {
		// Check if the text is empty
		if (!text.trim()) return;

		// Get the last message
		const user_msg = this.$('.msg.user:last-child');
		user_msg.innerHTML = html`<span class="msg-txt">${text.trim()}</span>`;

		// Remove empty class
		this.classList.remove('empty');

		// Create a new message for the AI response
		const assistant_msg = document.createElement('div');
		assistant_msg.classList.add('msg', 'assistant');
		this.appendChild(assistant_msg);

		assistant_msg.innerHTML = html`<span class="msg-txt">. . .</span>`;

		// AI system
		const system = `
			You are a helpful assistant. You will answer the user's questions and provide information as needed.

			Text formatting rules:

			- Use "#" at the beginning of lines for titles.
			- Use "##" at the beginning of lines for subtitles, and so on.
			- Use "-" or "1." at the beginning of lists.
			- Use ">" at the beginning of lines for quotes.
			- Use "!" at the beginning of lines for info blocks.
			- Add an empty line after each title, subtitle, paragraph, list, quote, and info block.
			- Wrap words with "_" for italic text.
			- Wrap words with "*" for bold text.
			- Wrap words with "~" for strikethrough text.
			- Wrap words with "=" for highlighted text.
		`;

		// AI user
		const user = text;

		// Generate the AI response
		const final = await AI.generate({ system, user }, (chunk, result) => {
			// Update the message with the AI response
			assistant_msg.$('.msg-txt').innerHTML = result.replace(chunk, html`<span class="chunk">${chunk}</span>`);
		});

		// Set final result
		assistant_msg.$('.msg-txt').innerText = final;

		// Add a new message for the user
		this.addUserMessage();
	}
}

defineComponent(html`<chat-area />`);
