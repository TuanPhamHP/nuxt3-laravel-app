<template>
	<div>
		<Header />
		<slot />
		<div class="app-cloak" id="app-cloak">
			<img src="@/assets/images/app_logo.png" alt="" />
		</div>
	</div>
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
			const safeToView = ref<boolean>(false);
			const useAuth = auth(runtimeConfig);
			const useAuthStore = authStore();
			const checkAuth = async () => {
				if (!useAuthStore.authUser) {
					const token = getCookie('nuxt_app_token');
					if (token) {
						const res = await useAuth.getUserInfo();
						safeToView.value = true;
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
						if (route.name === 'login' || route.name === 'register') {
							router.push('/');
						}
						return;
					}
					safeToView.value = true;
					return;
				}

				safeToView.value = true;
			};
			watch(safeToView, () => {
				if (safeToView.value) {
					const target = document.querySelector('#app-cloak');
					if (target) {
						target.classList.add('fading');
						setTimeout(() => {
							target.remove();
						}, 1000);
					}
				}
			});
			onBeforeMount(() => {
				checkAuth();
			});
			return {
				checkAuth,
				safeToView,
			};
		},
	};
</script>
<style lang="scss">
	@import '/assets/styles/main.scss';
	.app-cloak {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		display: flex;
		align-content: center;
		justify-content: center;
		background-color: #012a35;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		img {
			max-height: 100%;
			max-width: 100%;
		}
		&.fading {
			img {
				animation: fading 1.2s forwards;
			}
		}
	}
	@keyframes fading {
		0% {
			opacity: 1;
			transform: scale(1);
		}
		100% {
			opacity: 0.8;
			transform: scale(1.2);
		}
	}
</style>
