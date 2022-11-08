<template>
	<v-app>
		<Header />
		<slot />
	</v-app>
</template>
<script lang="ts">
	import { getCookie, deleteCookie } from '@/helpers/customizeCookie';
	import { auth } from '@/services/index';
	import { authStore } from '@/store';
	import Header from '@/components/Header.vue';
	import { onBeforeMount } from 'vue';
	export default {
		components: { Header },
		setup() {
			const { $snack } = useNuxtApp();
			const runtimeConfig = useRuntimeConfig();
			// router

			const router = useRouter();
			const route = useRoute();
			//
			const useAuth = auth(runtimeConfig);
			const useAuthStore = authStore();
			const checkAuth = async () => {
				if (!useAuthStore.authUser) {
					const token = getCookie('nuxt_app_token');
					if (token) {
						const res = await useAuth.getUserInfo();
						if (res.status >= 400 || res.status === -1) {
							$snack(`Đăng nhập thất bại: ${JSON.stringify(res.data)}`, 'error');
							deleteCookie('nuxt_app_token');
							router.push('/login');
							return;
						}
						useAuthStore.setAuth({
							user: res.data.user,
							isAuth: true,
							token: token,
						});
						if (route.name === 'login') {
							router.push('/');
						}
					}
				}
			};

			onBeforeMount(() => {
				checkAuth();
			});
			return {
				checkAuth,
			};
		},
	};
</script>
<style lang="scss">
	@import '/assets/styles/main.scss';
</style>
