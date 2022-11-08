import { deleteCookie } from '@/helpers/customizeCookie';
import { authStore } from '@/store';

export default defineNuxtPlugin(nuxtApp => {
	nuxtApp.provide('loggout', () => {
		deleteCookie('nuxt_app_token');
		const useAuthStore = authStore();
		useAuthStore.setAuth({
			user: null,
			isAuth: false,
			token: null,
		});
	});
});
