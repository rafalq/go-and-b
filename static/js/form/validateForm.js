class FormValidator {
	constructor(form, fields, selectorPrefix) {
		this.form = form;
		this.fields = fields;
		this.selectorPrefix = selectorPrefix;
	}

	errors = [];

	createSelector(
		name,
		selectorPrefix = this.selectorPrefix
	) {
		if (name.includes("!")) {
			return name.substring(0, name.length - 1);
		}
		if (name.includes(" ")) {
			const selector = name.split(" ").join("-");
			return `${selectorPrefix}-${selector}`;
		}
		return `${selectorPrefix}-${name}`;
	}

	toggleErrors(
		errorArr,
		error,
		inputName,
		status
	) {
		const selector =
			this.createSelector(inputName);
		const errorName = `${selector}-${error}`;

		const index = errorArr.indexOf(errorName);

		if (index >= 0) {
			if (status !== "error") {
				errorArr.splice(index, 1);
			}
		} else {
			if (status === "error") {
				errorArr.push(errorName);
			}
		}
	}

	// initialize() {
	// 	this.validateOnEntry();
	// 	this.validateOnSubmit();
	// }

	togglePasswordVisibility(field, inputEl) {
		const showPasswordIconId = `${this.createSelector(
			field.name
		)}-show-password-icon`;
		const hidePasswordIconId = `${this.createSelector(
			field.name
		)}-hide-password-icon`;

		const showPasswordIcon =
			document.getElementById(showPasswordIconId);
		const hidePasswordIcon =
			document.getElementById(hidePasswordIconId);

		showPasswordIcon.addEventListener(
			"click",
			() => {
				inputEl.type = "text";
				showPasswordIcon.classList.add("hidden");
				hidePasswordIcon.classList.remove(
					"hidden"
				);
			}
		);

		hidePasswordIcon.addEventListener(
			"click",
			() => {
				inputEl.type = "password";
				showPasswordIcon.classList.remove(
					"hidden"
				);
				hidePasswordIcon.classList.add("hidden");
			}
		);
	}

	// validateOnSubmit() {
	// 	const formElement = document.getElementById(
	// 		`${this.selectorPrefix}-form`
	// 	);

	// 	formElement.addEventListener("submit", () => {
	// 		this.fields.forEach((field) => {
	// 			if (field.type !== "button") {
	// 				const inputEl = document.getElementById(
	// 					this.createSelector(field.name)
	// 				);
	// 				this.validateFields(field, inputEl);
	// 			}
	// 		});
	// 	});
	// }

	validateOnEntry() {
		this.fields.forEach((field) => {
			const inputEl = document.getElementById(
				this.createSelector(field.name)
			);
			if (
				field.type === "input" ||
				field.type === "textarea" ||
				field.type === "password"
			) {
				inputEl?.addEventListener("input", () => {
					this.validateFields(field, inputEl);
				});

				if (field.type === "password") {
					this.togglePasswordVisibility(
						field,
						inputEl
					);
				}
			} else if (field.type === "checkbox") {
				inputEl?.addEventListener(
					"change",
					() => {
						this.validateFields(field, inputEl);
					}
				);
			}
		});
	}

	validateAndSubmitOnClick(buttonId) {
		const submitButton =
			document.getElementById(buttonId);

		submitButton.addEventListener("click", () => {
			this.fields.forEach((field) => {
				if (field.type !== "button") {
					const inputEl = document.getElementById(
						this.createSelector(field.name)
					);
					this.validateFields(field, inputEl);
					if (this.errors.length === 0) {
						document
							.getElementById(
								`${this.selectorPrefix}-form`
							)
							.submit();
					}
				}
			});
		});
	}

	validateFields(field, inputEl) {
		let valArr = field?.validators?.map((val) => {
			if (val.includes("range")) {
				return "range";
			} else {
				return val;
			}
		});

		valArr?.map((val) => {
			switch (val) {
				case "required":
					if (!inputEl?.value) {
						this.setStatus(
							field,
							"Field cannot be blank",
							"error"
						);
						this.toggleErrors(
							this.errors,
							"required",
							field.name,
							"error"
						);
					} else {
						this.setStatus(
							field,
							"Field cannot be blank",
							"success"
						);
						this.toggleErrors(
							this.errors,
							"required",
							field.name,
							"success"
						);
					}
					break;

				case "check":
					if (!inputEl?.checked) {
						this.setStatus(
							field,
							"Checkbox must be ticked",
							"error"
						);
						this.toggleErrors(
							this.errors,
							"check",
							field.name,
							"error"
						);
					} else {
						this.setStatus(
							field,
							"Checkbox must be ticked",
							"success"
						);
						this.toggleErrors(
							this.errors,
							"check",
							field.name,
							"success"
						);
					}
					break;

				case "email":
					const email = /\S+@\S+\.\S+/;
					if (
						!!inputEl?.value.trim() &&
						email.test(inputEl?.value)
					) {
						this.setStatus(
							field,
							"Invalid email address",
							"success"
						);
						this.toggleErrors(
							this.errors,
							"email",
							field.name,
							"success"
						);
					} else {
						this.setStatus(
							field,
							"Invalid email address",
							"error"
						);
						this.toggleErrors(
							this.errors,
							"email",
							field.name,
							"error"
						);
					}
					break;

				case "same-1":
				case "same-2":
					const same1 = this.fields.find((fld) =>
						fld.validators.includes("same-1")
					);
					const same2 = this.fields.find((fld) =>
						fld.validators.includes("same-2")
					);
					const same1Selector =
						this.createSelector(same1.name);
					const same2Selector =
						this.createSelector(same2.name);
					const same1El = document.getElementById(
						`${same1Selector}`
					);
					const same2El = document.getElementById(
						`${same2Selector}`
					);
					if (
						!same1El?.value.trim() ||
						!same2El?.value.trim() ||
						same1El?.value !== same2El.value
					) {
						this.setStatus(
							same1,
							"Fields do not match",
							"error"
						);
						this.setStatus(
							same2,
							"Fields do not match",
							"error"
						);
						this.toggleErrors(
							this.errors,
							"same-1",
							same1.name,
							"error"
						);
						this.toggleErrors(
							this.errors,
							"same-2",
							same2.name,
							"error"
						);
					} else {
						this.setStatus(
							same1,
							"Fields do not match",
							"success"
						);
						this.setStatus(
							same2,
							"Fields do not match",
							"success"
						);
						this.toggleErrors(
							this.errors,
							"same-1",
							same1.name,
							"success"
						);
						this.toggleErrors(
							this.errors,
							"same-2",
							same2.name,
							"success"
						);
					}
					break;

				case "phone":
					const digits = /^[\d-_ ]+\.?\d*$/;
					if (
						!!inputEl?.value.trim() &&
						!digits.test(inputEl?.value)
					) {
						this.setStatus(
							field,
							'Only digits, " - ", " _ " and empty spaces allowed',
							"error"
						);
						this.toggleErrors(
							this.errors,
							"phone",
							field.name,
							"error"
						);
					} else {
						this.setStatus(
							field,
							'Only digits, " - ", " _ " and empty spaces allowed',
							"success"
						);
						this.toggleErrors(
							this.errors,
							"phone",
							field.name,
							"success"
						);
					}
					break;

				case "range":
					if (!!inputEl?.value.trim()) {
						const paramMin = +field.validators
							.find((validator) =>
								validator.includes("range")
							)
							.split("-")[1];
						const paramMax = +field.validators
							.find((validator) =>
								validator.includes("range")
							)
							.split("-")[2];
						let errorMessage = `Enter value from ${paramMin} to ${paramMax} characters`;
						if (
							paramMax <= 0 ||
							paramMin > paramMax
						)
							if (
								inputEl?.value.trim().length >=
								paramMin
							) {
								errorMessage = `Please enter more than ${
									paramMin - 1
								} characters`;
								this.setStatus(
									field,
									errorMessage,
									"success"
								);
								this.toggleErrors(
									this.errors,
									"range",
									field.name,
									"success"
								);
							} else {
								errorMessage = `Please enter more than ${
									paramMin - 1
								} characters`;
								this.setStatus(
									field,
									errorMessage,
									"error"
								);
								this.toggleErrors(
									this.errors,
									"range",
									field.name,
									"error"
								);
							}
						else if (paramMin <= 0) {
							if (
								inputEl?.value.trim().length <=
								paramMax
							) {
								errorMessage = `Please enter less than ${
									paramMax + 1
								} characters`;
								this.setStatus(
									field,
									errorMessage,
									"success"
								);
								this.toggleErrors(
									this.errors,
									"range",
									field.name,
									"success"
								);
							} else {
								errorMessage = `Please enter less than ${
									paramMax + 1
								} characters`;
								this.setStatus(
									field,
									errorMessage,
									"error"
								);
								this.toggleErrors(
									this.errors,
									"range",
									field.name,
									"error"
								);
							}
						} else {
							if (
								inputEl?.value.trim().length >=
									paramMin &&
								inputEl?.value.trim().length <=
									paramMax
							) {
								this.setStatus(
									field,
									errorMessage,
									"success"
								);
								this.toggleErrors(
									this.errors,
									"range",
									field.name,
									"success"
								);
							} else {
								this.setStatus(
									field,
									errorMessage,
									"error"
								);
								this.toggleErrors(
									this.errors,
									"range",
									field.name,
									"error"
								);
							}
						}
					}
					break;

				case "special":
					const special = /[*@!#%&()^~{}]+/;
					if (
						!!inputEl?.value.trim() &&
						special.test(inputEl?.value.trim())
					) {
						this.setStatus(
							field,
							"Value must contain at least 1 special character",
							"success"
						);
						this.toggleErrors(
							this.errors,
							"special",
							field.name,
							"success"
						);
					} else {
						this.setStatus(
							field,
							"Value must contain at least 1 special character",
							"error"
						);
						this.toggleErrors(
							this.errors,
							"special",
							field.name,
							"error"
						);
					}
					break;

				default:
					break;
			}
		});
	}

	setStatus(field, message, status) {
		const errorClasses = [
			"bg-red-100",
			"outline-red-600",
		];
		const selector = this.createSelector(
			field.name
		);
		const inputLabelEl = document.querySelector(
			`label[for="${selector}"]`
		);
		const inputEl = document.getElementById(
			`${selector}`
		);
		const errorMessageEl =
			document.getElementById(
				`${selector}-error-message`
			);
		if (status === "success") {
			if (
				errorMessageEl &&
				errorMessageEl?.textContent
					.trim()
					.includes(message)
			) {
				errorMessageEl.textContent =
					errorMessageEl?.textContent.replaceAll(
						`\u00A0\u2022\u00A0${message}`,
						""
					);
			}
			if (!errorMessageEl?.textContent.trim()) {
				inputLabelEl?.classList.remove(
					"text-red-500"
				);
				inputEl?.classList.remove(
					...errorClasses
				);
			}
		}
		if (status === "error") {
			if (
				errorMessageEl &&
				!errorMessageEl?.textContent.includes(
					message
				)
			) {
				let errorMsg = `${errorMessageEl?.textContent}\u00A0\u2022\u00A0${message}`;
				errorMessageEl.textContent = errorMsg;
			}
			inputLabelEl?.classList.add("text-red-500");
			inputEl?.classList.add(...errorClasses);
		}
	}
}
