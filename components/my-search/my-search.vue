<template>
	<view class="container" :style="{'background-color': '#00aa00'}">
		<view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxClick">
			<uni-icons type='search' size='17'></uni-icons>
			<text class="searchtext">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
		  // 背景颜色
		  bgcolor: {
		    type: String,
		    default: '#00aa00'
		  },
		  // 圆角尺寸
		  radius: {
		    type: Number,
		    // 单位是 px
		    default: 18
		  }
		},
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods:{
			searchBoxClick(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.container{
	background-color:  #00aa00;
	height: 100rpx;
	padding: 100rpx;
	padding: 0 20rpx;
	display: flex;
	align-items: center;
}
.my-search-box{
	height: 72rpx;
	background-color: #ffffff;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.searchtext{
	font-size: 30rpx;
	margin-left: 10rpx;
}


</style>