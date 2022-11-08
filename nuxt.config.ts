// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	// alias: {
	// 	'~~': '/',
	// 	'@@': '/',
	// 	'~': '/',
	// 	'@': '/',
	// 	assets: '/assets',
	// 	public: '/public',
	// },
	// ssr: false,
	publicRuntimeConfig: {
		API_BASE_URL: process.env.API_BASE_URL,
	},
	target: 'static',
	css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
	plugins: ['plugins/vuetify.js', 'plugins/snackbars.ts'],
	build: {
		transpile: ['vuetify'],
	},
	modules: [
		// ...
		'@pinia/nuxt',
	],
	app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					charset: 'utf-8',
				},
				{
					name: 'author',
					content: 'Phạm Anh Tuấn',
				},
			],
			script: [],
			link: [],
			style: [],
			noscript: [
				// <noscript>Javascript is required</noscript>
				{ children: 'Javascript is required' },
			],
		},
	},
	vite: {
		css: {
			preprocessorOptions: {
				scss: {},
			},
		},
	},
});
