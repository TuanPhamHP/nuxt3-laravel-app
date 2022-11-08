<template>
	<div class="header-container d-flex align-center justify-space-between">
		<NuxtLink to="/">
			<img src="@/assets/images/app_logo.png" class="app-logo header-logo" alt=" header-logo" />
		</NuxtLink>

		<ul class="header-group-btns d-flex text-white px-3">
			<li v-if="useAuthStore.authUser" class="list-style-none d-block px-2">
				Xin chào,
				<v-menu>
					<template v-slot:activator="{ props }">
						<v-btn color="primary" v-bind="props">{{ useAuthStore.authUser.name }} </v-btn>
					</template>
					<v-list>
						<v-list-item class="px-0">
							<v-list-item-title>
								<div class="user-action pointer app-transition">Thông tin cá nhân</div>
							</v-list-item-title>
							<v-list-item-title>
								<div class="user-action pointer app-transition" @click="$loggout">Đăng xuất</div>
							</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</li>
			<NuxtLink v-if="!useAuthStore.authUser" to="/login" class="header-nav-item app-transition text-white">
				<li class="list-style-none d-block px-2">Đăng nhập</li>
			</NuxtLink>
			<NuxtLink v-if="!useAuthStore.authUser" to="/register" class="header-nav-item app-transition text-white">
				<li class="list-style-none d-block px-2">Đăng ký</li>
			</NuxtLink>
		</ul>
	</div>
</template>

<script lang="ts">
	import { authStore } from '@/store';
	export default {
		setup() {
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
		position: sticky;
		top: 0;
		z-index: 2;
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
		&:hover {
			background-color: #91969851;
		}
	}
	.user-action {
		padding: 8px 12px;
		font-weight: 500;
		font-size: 14px;
		&:hover {
			background-color: #91969851;
		}
	}
</style>
