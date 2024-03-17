function createAvailbilityParams(
	dateFormat,
	prefixName,
	roomID
) {
	let formEl = document.querySelector(
		`#form-${prefixName}`
	);
	let submitButton = document.querySelector(
		`#submit-button-${prefixName}`
	);
	let dateRangePicker = new DateRangePicker(
		formEl,
		{
			format: dateFormat,
			minDate: new Date(),
		}
	);

	let formData = new FormData(formEl);
	formData.append("room-id", roomID);

	return [formData, dateRangePicker];
}

async function searchAvailability(
	event,
	prefixName,
	formData,
	dateRangePicker
) {
	event.preventDefault();

	formData.set(
		`${prefixName}-start`,
		dateRangePicker.inputs[0].value
	);
	formData.set(
		`${prefixName}-end`,
		dateRangePicker.inputs[1].value
	);

	const response = await fetch(
		"/search-availability-json",
		{
			method: "POST",
			body: formData,
		}
	);

	const data = await response.json();

	if (data.ok) {
		displayModalWithLinkAndCancel(
			"Room Is Available!",
			"",
			"success",
			`/reserve-room?id=${data["room-id"]}&s=${data["start"]}&e=${data["end"]}`,
			"BOOK NOW"
		);
	} else {
		displayModal(
			"Not Available!",
			"",
			"error",
			"OK"
		);
	}

	for (let [key] of formData.entries()) {
		if (
			key === `${prefixName}-start` ||
			key === `${prefixName}-end`
		) {
			suiteFormData.set(key, "");
		}
	}
}
