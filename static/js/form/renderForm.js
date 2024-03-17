class Form {
	constructor(
		fields,
		containerSelector,
		action,
		method
	) {
		this.fields = fields.map(
			(field) =>
				new FormField(
					field.name,
					field.type,
					field.value,
					field.placeholder,
					field.validators
				)
		);
		this.container = document.querySelector(
			containerSelector
		);
		this.action = action;
		this.method = method;
	}

	render() {
		const formMarkup = this.generateFormMarkup();
		this.container.insertAdjacentHTML(
			"afterbegin",
			formMarkup
		);
	}

	generateFormMarkup() {
		const fieldsMarkup = this.fields
			.map((field) => field.generateFieldMarkup())
			.join("\n");
		return `
            <form action="${this.action}" method="${this.method}" id="${selectorPrefix}-form" class="w-full mx-auto py-10 px-4 flex flex-col gap-4">
                ${fieldsMarkup}
            </form>`;
	}
}
