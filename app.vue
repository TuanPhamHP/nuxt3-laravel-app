<template>
	<v-app id="app">
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
		<div id="snack-provider"></div>
	</v-app>
</template>
<style lang="scss">
	#app {
		height: 100vh;
		max-height: 100vh;
		overflow-y: scroll;
		overflow-x: hidden;
		&::-webkit-scrollbar {
			width: 0px;
		}

		&::-webkit-scrollbar-track {
			background: #d6d6d600;
			border-radius: 5px;
		}
		&::-webkit-scrollbar-thumb {
			border-radius: 6px;
			background: #000;
		}
	}
</style>
