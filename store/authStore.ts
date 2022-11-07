import { defineStore } from 'pinia';
interface User {
	name: string;
	id: number;
	email: string;
}

interface Auth {
	isAuth: boolean;
	user: null | User;
	token: string | null;
}
let auth: Auth = {
	user: null,
	isAuth: false,
	token: null,
};
export default defineStore('authStore', {
	state: () => ({
		auth,
	}),
	getters: {
		authUser: state => state.auth.user,
		authToken: state => state.auth.token,
	},
	actions: {
		setAuth(auth: Auth) {
			this.auth = auth;
		},
	},
});
