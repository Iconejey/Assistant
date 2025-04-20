class TextInput extends CustomElement {
	static get observedAttributes() {
		return ['placeholder', 'type'];
	}

	onTypeChange(val) {
		this.setAttribute('inputmode', val);
	}

	constructor() {
		super();
		this.parse_date_timeout = null;

		this.whenReady(() => {
			this.setAttribute('contenteditable', true);
			this.classList.add('input');

			// On input
			this.addEventListener('input', e => {
				// If trimmed value is empty, remove all content
				if (!this.innerText.trim()) this.innerText = '';

				// // Remove all line breaks
				// if (this.innerText.includes('\n')) this.innerText = this.innerText.replaceAll('\n', '');

				// Change event
				this.onchange?.(this.innerText);
			});

			this.onkeydown = e => {
				// Prevent if disabled
				if (this.disabled) return e.preventDefault();

				if (e.key === 'Enter' && (!this.multiline || e.ctrlKey)) {
					// Prevent new line
					e.preventDefault();

					// Submit value
					this.onsubmit?.(this.innerText);
				}
			};
		});
	}

	onsubmit(val) {
		// Submit event
	}

	onchange(val) {
		// Change event
	}
}

defineComponent(html`<text-input placeholder type multiline? .disabled />`);
