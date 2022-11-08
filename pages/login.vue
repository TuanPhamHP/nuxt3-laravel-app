<template>
	<div>
		<v-btn color="primary" dark @click="setLogin" :loading="loadingLogin">Set login</v-btn>
		<v-btn color="primary" dark @click="getUserInfo" :loading="loadingLogin">get user</v-btn>
		<v-btn color="primary" dark @click="$snackError('Hehehe')">Click me</v-btn>
		<v-btn color="primary" dark @click="redirect('/')">Home</v-btn>
	</div>
</template>

<script lang="ts">
	import { authStore } from '@/store';
	import { useRouter, useRoute } from 'vue-router';
	import { getCookie, setCookie } from '@/helpers/customizeCookie';
	import { auth } from '@/services/index';
	export default {
		setup() {
			const { $snack } = useNuxtApp();

			const runtimeConfig = useRuntimeConfig();
			// router

			const router = useRouter();
			const route = useRoute();

			//
			const useAuth = auth(runtimeConfig);
			const useAuthStore = authStore();
			const loadingLogin = ref(false);
			const setLogin = async () => {
				loadingLogin.value = true;
				const body = {
					email: 'email@gmail.com',
					password: '1234567',
				};
				const res = await useAuth.loginUser(body);
				console.log(res);
				loadingLogin.value = false;

				if (res.status >= 400) {
					$snack(`Đăng nhập thất bại: ${JSON.stringify(res.data)}`, 'error');
					return;
				}
				const token = res.data.access_token;
				setCookie('token', token);

				useAuthStore.setAuth({
					user: res.data.user,
					isAuth: true,
					token: token,
				});
				$snack('Đăng nhập thành công', 'success');
			};
			const getUserInfo = async () => {
				await useAuth.getUserInfo().then(res => {
					console.log('done ----');
					console.log(res);
				});
			};

			return {
				loadingLogin,
				router,
				setLogin,
				getUserInfo,
			};
		},
		data() {
			return {};
		},
		head() {
			return {
				title: 'Đăng nhập',
			};
		},
		methods: {
			redirect(url: string) {
				this.router.push(url);
			},
		},
	};
</script>

<style></style>
