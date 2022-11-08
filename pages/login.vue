<template>
	<div>
		<div class="login-container mx-auto mt-0 mt-lg-6" style="max-width: 600px">
			<v-form ref="form" :autofocus="true" v-model="valid" lazy-validation>
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required class="mb-3"></v-text-field>
				<v-text-field
					v-model="password"
					:rules="passwordRules"
					type="password"
					label="Password"
					@keyup.enter="validate"
					required
					class="mb-3"
				></v-text-field>
				<!-- <v-checkbox v-model="remember" label="Nhớ đăng nhập" color="primary" hide-details=""></v-checkbox> -->
				<v-btn
					color="primary"
					class="mx-auto d-block w-100"
					height="46px"
					dark
					@click="validate"
					:loading="loadingLogin"
					>Login</v-btn
				>
			</v-form>
		</div>
		<!-- 
		<v-btn color="primary" dark @click="getUserInfo" :loading="loadingLogin">get user</v-btn>
		<v-btn color="primary" dark @click="$snackError('Hehehe')">Click me</v-btn>
		<v-btn color="primary" dark @click="redirect('/')">Home</v-btn> -->
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
			// const remember = ref(true);
			const email = ref<string>('tuanp.fe.dev@gmail.com');
			const password = ref<string>('123qaz');

			const setLogin = async () => {
				loadingLogin.value = true;
				const body = {
					email: email.value,
					password: password.value,
				};
				const res = await useAuth.loginUser(body);
				console.log(res);
				loadingLogin.value = false;

				if (res.status >= 400 || res.status === -1) {
					$snack(`Đăng nhập thất bại: ${JSON.stringify(res.data)}`, 'error');
					return;
				}
				const token = res.data.access_token;
				setCookie('nuxt_app_token', token);

				useAuthStore.setAuth({
					user: res.data.user,
					isAuth: true,
					token: token,
				});
				$snack('Đăng nhập thành công', 'success');

				router.push('/');
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
				email,
				password,
				// remember,
				setLogin,
				getUserInfo,
			};
		},
		data() {
			return {
				valid: true,
				passwordRules: [(v: string) => !!v || 'Password is required'],
				emailRules: [(v: string) => !!v || 'E-mail is required', v => /.+@.+\..+/.test(v) || 'E-mail must be valid'],
			};
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
			async validate() {
				const { valid } = await this.$refs.form.validate();

				if (valid) this.setLogin();
			},
			reset() {
				this.$refs.form.reset();
			},
			resetValidation() {
				this.$refs.form.resetValidation();
			},
		},
	};
</script>

<style lang="scss"></style>
