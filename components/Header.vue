<template>
	<div class="header-container d-flex align-center justify-space-between">
		<img src="@/assets/images/app_logo.png" class="app-logo header-logo" alt=" header-logo" />

		<ul class="header-group-btns d-flex text-white px-3">
			<li v-if="useAuthStore.authUser" class="list-style-none d-block px-2">
				Xin chào,{{ useAuthStore.authUser.name }}
			</li>
			<li v-if="!useAuthStore.authUser" class="list-style-none d-block px-2">Đăng nhập</li>
			<li v-if="!useAuthStore.authUser" class="list-style-none d-block px-2">Đăng ký</li>
		</ul>
	</div>
</template>

<script lang="ts">
	import { authStore } from '@/store';
	import { auth } from '@/services/index';
	export default {
		setup() {
			const { $snack } = useNuxtApp();

			const runtimeConfig = useRuntimeConfig();
			const useAuthStore = authStore();
			return {
				useAuthStore,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.header-container {
		background-color: #012a35;
	}
	.header-logo {
		cursor: pointer;
		height: 62px;
	}
</style>
