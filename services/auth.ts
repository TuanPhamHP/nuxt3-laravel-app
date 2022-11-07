import { getCookie } from '@/helpers/customizeCookie';
import { response, userResponse } from '@/interface/apiResponse';
const authRepo = runtimeConfig => {
	const API_BASE_URL = runtimeConfig.public.API_BASE_URL;
	return {
		loginUser(payload = {}) {
			return new Promise<userResponse | response>((resolve, reject) => {
				fetch(`${API_BASE_URL}/api/login`, {
					method: 'POST', // *GET, POST, PUT, DELETE, etc.
					mode: 'cors', // no-cors, *cors, same-origin
					cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
					credentials: 'same-origin', // include, *same-origin, omit
					headers: {
						'Content-Type': 'application/json',
						// 'Content-Type': 'application/x-www-form-urlencoded',
					},
					redirect: 'follow', // manual, *follow, error
					referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
					body: JSON.stringify(payload), // body data type must match "Content-Type" header
				})
					.then(async response => {
						const status = response.status;
						const result = await response.json();
						const data: userResponse = { status, data: result };
						return data;
					})
					.then((data: userResponse): userResponse => {
						if (data.status >= 400) {
							resolve(data);
							return;
						}
						resolve(data);
						return;
					})
					.catch((error: response): response => {
						resolve({ status: -1, data: error });
						return;
					});
			});
		},
		getUserInfo() {
			const token = getCookie('token');
			return fetch(`${API_BASE_URL}/api/me`, {
				method: 'GET',
				mode: 'cors',
				credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json',
					authorization: `Bear ${token}`,
				},
				redirect: 'follow',
				referrerPolicy: 'no-referrer',
			})
				.then(response => {
					return { status: response.status, response: response.json() };
				})
				.then(data => {
					return {
						success: true,
						data,
					};
				})
				.catch(error => {
					return {
						success: false,
						data: error,
					};
				});
		},
	};
};

export default authRepo;
