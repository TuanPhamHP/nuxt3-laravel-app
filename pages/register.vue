<template>
	<div>
		<div class="login-container mx-auto mt-0 mt-lg-6" style="max-width: 600px">
			<v-form ref="form" v-model="valid" lazy-validation>
				<v-text-field v-model="name" :rules="nameRules" label="Name" required class="mb-3"></v-text-field>
				<v-text-field v-model="email" :rules="emailRules" label="E-mail" required class="mb-3"></v-text-field>
				<v-text-field
					v-model="password"
					:rules="passwordRules"
					type="password"
					label="Password"
					required
					class="mb-3"
				></v-text-field>
				<v-text-field
					v-model="confirm_password"
					:rules="passwordConfirmRules"
					type="password"
					label="Cofirm Password"
					required
					class="mb-3"
				></v-text-field>
				<v-btn
					color="primary"
					class="mx-auto d-block w-100"
					height="46px"
					dark
					@click="validate"
					:loading="loadingLogin"
					>Register</v-btn
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
			const name = ref<string>('');
			const email = ref<string>('');
			const password = ref<string>('');
			const confirm_password = ref<string>('');

			const submitForm = async () => {
				loadingLogin.value = true;
				const body = {
					name: name.value,
					email: email.value,
					password: password.value,
					password_confirmation: confirm_password.value,
				};
				const res = await useAuth.register(body);
				console.log(res);
				loadingLogin.value = false;

				if (res.status >= 400 || res.status === -1) {
					$snack(`Đăng ký thất bại: ${JSON.stringify(res.data)}`, 'error');
					return;
				}
				const token = res.data.access_token;
				setCookie('nuxt_app_token', token);

				useAuthStore.setAuth({
					user: res.data.user,
					isAuth: true,
					token: token,
				});
				$snack('Đăng ký thành công', 'success');
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
				name,
				password,
				confirm_password,
				submitForm,
				getUserInfo,
			};
		},
		data() {
			return {
				valid: true,
				nameRules: [
					(v: string) => !!v || 'Name is required',
					(v: string) => (v && v.length <= 20) || 'Name must be less than 20 characters',
				],
				emailRules: [
					(v: string) => !!v || 'E-mail is required',
					(v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
				],
				passwordRules: [
					(v: string) => !!v || 'Password is required',
					(v: string) => (v && v.length >= 6) || 'Password must be greater than 5 characters',
				],
				passwordConfirmRules: [
					(v: string) => !!v || 'Password is required',
					(v: string) => (v && v.length >= 6) || 'Password must be greater than 5 characters',
					(v: any) => v === this.password || 'Confirm Password must be match with Password',
				],
			};
		},
		head() {
			return {
				title: 'Đăng ký',
			};
		},
		methods: {
			redirect(url: string) {
				this.router.push(url);
			},
			async validate() {
				const { valid } = await this.$refs.form.validate();

				if (valid) this.submitForm();
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

<style></style>
