<template>
	<div class="header-container d-flex align-center justify-space-between">
		<img src="@/assets/images/app_logo.png" class="app-logo header-logo" alt=" header-logo" />

		<ul class="header-group-btns d-flex text-white px-3">
			<li v-if="useAuthStore.authUser" class="list-style-none d-block px-2">
				Xin chào,{{ useAuthStore.authUser.name }}
			</li>
			<NuxtLink v-if="!useAuthStore.authUser" to="/login" class="header-nav-item text-white">
				<li class="list-style-none d-block px-2">Đăng nhập</li>
			</NuxtLink>
			<NuxtLink v-if="!useAuthStore.authUser" to="/register" class="header-nav-item text-white">
				<li class="list-style-none d-block px-2">Đăng ký</li>
			</NuxtLink>
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
	.header-nav-item {
		text-decoration: unset;
		height: 62px;
		line-height: 62px;
		min-width: 100px;
		text-align: center;
		transition: 0.25s ease;
		&:hover {
			background-color: #91969851;
		}
	}
</style>
