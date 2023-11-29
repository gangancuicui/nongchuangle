<template>

		<view>
			<button @click.native="showPop">点击</button>
			<view class="content" v-if="show">
				<view class="popup">
					<view>标题</view>
					<view>提示</view>
					<button class="avatar-wrapper" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">
						<image :src="avatar" ></image>
					</button> 
					<view>点击选择头像</view>
					<view>
						<view>昵称</view>
						<input type="nickname" class="weui-input" v-model="nickname" placeholder="请输入昵称"/>
					</view>
					<view class="btn">
						<button @click.native="close" class="btn">关闭</button>
						<button @click.native="submit" class="btn2">提交</button>
					</view>
				</view>
			</view> 
		</view>
	</template>


<script>
	export default {
		data() {
			return {
				show: false,
				avatar: '',
				nickname: ''
			};
		},
		methods: {
			showPop() {
				this.show = true;
				wx.login({
				  success (res) {
				    console.log(res),
					wx.cloud.callFunction({
						name:'getOpenID',
						success:(res)=>{
							console.log(res)
						}
					})
				  }
				})
			},
			close() {
				this.show = false;
			},
			onChooseAvatar(event) {
				// Update avatar with the chosen one
			},
			submit() {
				// Submit the form
			}
		}
	}
</script>

<style lang="scss">

</style>