import { authStore } from '@/store/index';
export default defineNuxtRouteMiddleware((to, from) => {
	const useAuthStore = authStore();
	const auth = useAuthStore.$state.auth;

	if (!auth.isAuth) {
		if (from.name === 'login') {
			return;
		}
		return navigateTo('/login');
	}
});
