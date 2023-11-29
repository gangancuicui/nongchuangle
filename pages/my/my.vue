<template>
	<view>
		<view class="container">
			 <my-login v-if="!token"></my-login>
			<my-userinfo v-else></my-userinfo>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed:{
			...mapState('m_user', ['token']),
		}
	}
</script>

<style>
page,
.container {
  height: 100%;
}
</style>
