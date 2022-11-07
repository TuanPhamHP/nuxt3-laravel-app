<template>
	<div>
		<div class="app-container">
			<h1>Welcome to the homepage</h1>
			<h2>{{ tab }}</h2>
			<p>
				{{ useCounterStore.count }}
			</p>
			<button @click="useCounterStore.increment">+</button>
		</div>
	</div>
</template>
<script lang="ts">
	import { ref } from 'vue';
	import { counterStore, authStore } from '@/store/index';
	export default {
		setup() {
			const useCounterStore = counterStore();
			const useAuthStore = authStore();
			const tab = ref('one');
			return {
				tab,
				// you can return the whole store instance to use it in the template
				useAuthStore,
				useCounterStore,
			};
		},
		head() {
			return {
				title: 'Chào bạn',
			};
		},
	};
</script>
