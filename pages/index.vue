<template>
	<div>
		<div class="app-container">
			<v-table theme="dark">
				<thead>
					<tr>
						<th class="text-left">Name</th>
						<th class="text-left">Calories</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in desserts" :key="item.name">
						<td>{{ item.name }}</td>
						<td>{{ item.calories }}</td>
					</tr>
				</tbody>
			</v-table>
		</div>
	</div>
</template>
<script lang="ts">
	import { useRouter } from 'vue-router';
	import { authStore } from '@/store';
	export default {
		setup() {
			const router = useRouter();
			const useAuthStore = authStore();
			return {
				router,
				useAuthStore,
			};
		},
		head() {
			return {
				title: `Trang chủ`,
			};
		},
		data() {
			return {
				desserts: [
					{
						name: 'Frozen Yogurt',
						calories: 159,
					},
					{
						name: 'Ice cream sandwich',
						calories: 237,
					},
					{
						name: 'Eclair',
						calories: 262,
					},
					{
						name: 'Cupcake',
						calories: 305,
					},
					{
						name: 'Gingerbread',
						calories: 356,
					},
					{
						name: 'Jelly bean',
						calories: 375,
					},
					{
						name: 'Lollipop',
						calories: 392,
					},
					{
						name: 'Honeycomb',
						calories: 408,
					},
					{
						name: 'Donut',
						calories: 452,
					},
					{
						name: 'KitKat',
						calories: 518,
					},
				],
			};
		},
		methods: {
			redirect(url: string) {
				this.router.push(url);
			},
		},
	};
</script>
