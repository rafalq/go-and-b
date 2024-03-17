const selectorPrefix =
	generateRandomSelectorPrefix() || Date.now();

function createSelector(name) {
	if (name.includes("!")) {
		return name.substring(0, name.length - 1);
	}
	if (name.includes(" ")) {
		const selector = name.split(" ").join("-");
		return `${selectorPrefix}-${selector}`;
	}
	return `${selectorPrefix}-${name}`;
}

/* generateRandomSelectorPrefix can be use instead of Date.now() */

function generateRandomSelectorPrefix() {
	const characters =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	const length = 8; // You can adjust the length as needed
	let result = "";
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(
				Math.random() * characters.length
			)
		);
	}
	return result;
}
