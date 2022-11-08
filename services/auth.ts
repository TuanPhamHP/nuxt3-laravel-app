import { getCookie } from '@/helpers/customizeCookie';
import { response, userResponse } from '@/interface/apiResponse';
const authRepo = runtimeConfig => {
	const API_BASE_URL = runtimeConfig.public.API_BASE_URL;

	const apiCall = (url: string, method: string, payload = {}, tokenFlag: boolean = true) => {
		const headerConfig = {
			method: method, // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
		};
		if (method !== 'GET') {
			headerConfig.body = JSON.stringify(payload); // body data type must match "Content-Type" header
		}
		if (tokenFlag) {
			const token = getCookie('nuxt_app_token');
			headerConfig.headers.authorization = `Bearer ${token}`;
		}
		console.log(headerConfig);
		return new Promise<userResponse | response>((resolve, reject) => {
			fetch(url, headerConfig)
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
	};
	return {
		loginUser(payload = {}) {
			return apiCall(`${API_BASE_URL}/api/login`, 'POST', payload, false);
		},
		register(payload = {}) {
			return apiCall(`${API_BASE_URL}/api/register`, 'POST', payload, false);
		},
		getUserInfo() {
			const token = getCookie('token');
			return apiCall(`${API_BASE_URL}/api/me`, 'GET');
		},
	};
};

export default authRepo;
