class FormField {
	constructor(
		name,
		type,
		value,
		placeholder,
		validators = []
	) {
		this.name = name;
		this.type = type;
		this.value = value;
		this.placeholder = placeholder;
		this.validators = validators;
	}

	generateFieldMarkup() {
		const {
			name,
			type,
			value = "",
			placeholder = "",
			validators = [],
		} = this;

		const selectorName = createSelector(
			this.name
		);

		const title = name
			.split(" ")
			.map((word) =>
				word
					.toLowerCase()
					.replace(/\b\w/g, (s) =>
						s.toUpperCase()
					)
			)
			.join(" ");

		let isRequired =
			validators.includes("required") ||
			validators.includes("check");

		switch (type) {
			case "input":
				return `
                    <div>
                        <label for="${selectorName}" class="block mb-2 text-sm font-medium text-gray-900">${title}
                        ${
													isRequired
														? `
                          <div class="has-tooltip inline">
                            <span
                              class="tooltip rounded shadow-sm p-1 bg-gray-50 text-red-400 -mt-8"
                              >Field required</span
                            >
                            <span class="text-red-500"
                            >*</span
                          >
                          </div>`
														: ""
												}</label>
                        <input type="text" id="${selectorName}" name="${name
					.split(" ")
					.join(
						"-"
					)}" value="${value}" placeholder="${placeholder}" class="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                        <p id="${selectorName}-error-message" class="text-red-500 text-xs mt-2 h-full"></p>
                    </div>`;
			case "textarea":
				return `
                    <div>
                        <label for="${selectorName}" class="block mb-2 text-sm font-medium text-gray-900">${title}${
					isRequired
						? `<div class="has-tooltip inline"><span class="tooltip rounded shadow-sm p-1 bg-gray-50 text-red-400 -mt-8">Field required</span><span class="text-red-500">*</span></div>`
						: ""
				}</label>
                        <textarea id="${selectorName}" name="${name
					.split(" ")
					.join(
						"-"
					)}" value="${value}" placeholder="${placeholder}" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 outline-none rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"></textarea>
                        <p id="${selectorName}-error-message" class="text-red-500 text-xs mt-2 h-full"></p>
                    </div>`;
			case "password":
				const showPasswordIconId = `${selectorName}-show-password-icon`;
				const hidePasswordIconId = `${selectorName}-hide-password-icon`;

				return `
                        <div>
                            <label for="${selectorName}" class="block mb-2 text-sm font-medium text-gray-900">${title}
                                <div class="has-tooltip inline">
                                    <span class="tooltip rounded shadow-sm p-1 bg-gray-50 text-red-400 -mt-8">Field required</span>
                                    <span class="text-red-500">*</span>
                                </div>
                            </label>
                            <div class="flex justify-center items-center gap-2">
                                <input type="password" id="${selectorName}" name="${name
					.split(" ")
					.join(
						"-"
					)}" value="${value}" placeholder="${placeholder}" class="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
                                <div class="has-tooltip inline relative" id="${showPasswordIconId}">
                                    <span class="tooltip text-sm rounded shadow-sm p-2 bg-gray-100 w-100 text-gray-600 absolute bottom-6 right-2">Show password</span>
                                    <svg class="cursor-pointer" fill="none" height="18" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><g stroke="gray" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m1 12s4-8 11-8 11 8 11 8"/><path d="m1 12s4 8 11 8 11-8 11-8"/><circle cx="12" cy="12" r="3"/></g></svg>
                                </div>
                                <div id="${hidePasswordIconId}" class="has-tooltip inline relative hidden">
                                    <span class="tooltip rounded shadow-sm p-2 bg-gray-100 text-sm text-gray-600 absolute bottom-6 right-2">Hide password</span>
                                    <svg class="cursor-pointer" height="26" clip-rule="evenodd" fill-rule="evenodd" 
                                      stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                                      <path d="m-960-256h1280v800h-1280z"  fill="none"/>
                                      <path d="m13.673 10.345-3.097 3.096 39.853 39.854 3.097-3.097z" fill="gray"/>
                                      <path d="m17.119 19.984 2.915 2.915c-3.191 2.717-5.732 6.099-7.374 9.058l-.005.01c4.573 7.646 11.829 14.872 20.987 13.776 2.472-.296 4.778-1.141 6.885-2.35l2.951 2.95c-4.107 2.636-8.815 4.032-13.916 3.342-9.198-1.244-16.719-8.788-21.46-17.648 2.226-4.479 5.271-8.764 9.017-12.053zm6.63-4.32c2.572-1.146 5.355-1.82 8.327-1.868.165-.001 2.124.092 3.012.238.557.092 1.112.207 1.659.35 8.725 2.273 15.189 10.054 19.253 17.653-1.705 3.443-3.938 6.398-6.601 9.277l-2.827-2.827c1.967-2.12 3.622-4.161 4.885-6.45 0 0-1.285-2.361-2.248-3.643-.619-.824-1.27-1.624-1.954-2.395-.54-.608-2.637-2.673-3.136-3.103-3.348-2.879-7.279-5.138-11.994-5.1-1.826.029-3.582.389-5.249.995z" fill="gray" fill-rule="nonzero"/>
                                      <path d="m25.054 27.92 2.399 2.398c-.157.477-.243.987-.243 1.516 0 2.672 2.169 4.841 4.841 4.841.529 0 1.039-.085 1.516-.243l2.399 2.399c-1.158.65-2.494 1.02-3.915 1.02-4.425 0-8.017-3.592-8.017-8.017 0-1.421.371-2.756 1.02-3.914zm6.849-4.101c.049-.001.099-.002.148-.002 4.425 0 8.017 3.593 8.017 8.017 0 .05 0 .099-.001.148z" fill="gray"/>
                                  </svg>
                                </div>
                            </div>
                            <p id="${selectorName}-error-message" class="text-red-500 text-xs mt-2 h-full"></p>
                        </div>`;
			case "button":
				return `<div class="flex justify-end w-full mt-6"><button id="${selectorPrefix}-submit-button" type="submit" class="uppercase text-white bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">${title}</button></div>`;
			case "checkbox":
				return `
                    <div>
                        <div class="flex items-start">
                            <div class="flex items-center h-5">
                                <input id="${selectorName}" name="${name
					.split(" ")
					.join(
						"-"
					)}" type="checkbox" class="w-4 h-4 border border-gray-300 outline-none rounded bg-gray-50 focus:ring-blue-300" />
                            </div>
                            <label for="${selectorName}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>${
					isRequired
						? `<div class="has-tooltip inline"><span class="tooltip rounded shadow-sm p-1 bg-gray-50 text-red-400 -mt-8">Field required</span><span class="text-red-500">*</span></div>`
						: ""
				}</label>
                        </div>
                        <p id="${selectorName}-error-message" class="text-red-500 text-xs mt-2 h-full"></p>
                    </div>`;
			case "hidden":
				return `
        <input type="hidden" id="${selectorName}" name="${name
					.split(" ")
					.join(
						"-"
					)}" value="${value}"class="shadow-sm bg-gray-50 border border-gray-300 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        `;
			default:
				return "";
		}
	}
}
