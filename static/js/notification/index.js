// notie ----> https://github.com/jaredreich/notie?tab=readme-ov-file
// eslint-disable-next-line
function displayAlert(
	type,
	text,
	stay = false,
	time = 5,
	position = "top"
) {
	notie.alert({
		type, // optional, default = 4, enum: [1, 2, 3, 4, 5, 'success', 'warning', 'error', 'info', 'neutral']
		text,
		stay, // optional, default = false
		time, // optional, default = 3, minimum = 1,
		position, // optional, default = 'top', enum: ['top', 'bottom']
	});
}

// sweetalert2 ----> https://sweetalert2.github.io/
function displayModal(
	title,
	text,
	icon,
	confirmButtonText
) {
	Swal.fire({
		title,
		text,
		icon, // "warning", "error", "success", "info", "question"
		confirmButtonText,
	});
}

function displayModalWithLinkAndCancel(
	title,
	text,
	icon,
	linkHref,
	linkText
) {
	Swal.fire({
		title: title,
		text: text,
		icon: icon,
		showCancelButton: true,
		confirmButtonText: `<a href="${linkHref}">${linkText}</a>`,
	});
}

function displayToast(
	icon,
	title,
	position = "top-end",
	showConfirmButton = false,
	timer = 3000,
	timerProgressBar = true
) {
	const Toast = Swal.mixin({
		toast: true,
		position,
		showConfirmButton,
		timer,
		timerProgressBar,
		didOpen: (toast) => {
			toast.onmouseenter = Swal.stopTimer;
			toast.onmouseleave = Swal.resumeTimer;
		},
	});
	Toast.fire({
		icon, // "warning", "error", "success", "info","question"
		title,
	});
}
