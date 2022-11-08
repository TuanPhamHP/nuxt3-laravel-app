<template>
	<v-app>
		<Header />
		<slot />
	</v-app>
</template>
<script lang="ts">
	// import '@mdi/font/css/materialdesignicons.css';
	import Header from '@/components/Header.vue';
	export default {
		components: { Header },
	};
</script>
<style lang="scss">
	@import '/assets/styles/main.scss';
</style>
