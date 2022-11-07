const createSnackbar = (msg: string, type: string, timeOff: number) => {
	const snackbar = document.createElement('div');
	snackbar.textContent = msg;
	snackbar.classList.add(`global-snackbar`, `snack-${type}`);
	document.querySelector('#snack-provider').appendChild(snackbar);
	setTimeout(() => {
		snackbar.remove();
	}, timeOff);
};

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('snack', (msg: string, type: string = 'success', timeOff: number = 5000) => {
		createSnackbar(msg, type, timeOff);
	});
});
