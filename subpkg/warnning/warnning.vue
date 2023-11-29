<template>
	<view>
		<view class="img">
			<image src="/static/404.jpg" mode=""></image>
		</view>
		<view class="g"></view>
		
		<view class="text">
			页面开发中
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.img {
	//display: flex;
	
  width: 100%;
  height: 300rpx;
  margin-bottom: 20px;
  image{
	   width: 100%;
	   height: 500rpx;
  }

  // /* 添加一个简单的动画效果 */
  // animation: rotate 4s linear infinite;
}
.g{
	height: 220rpx;
}
.text {
  font-size: 24px;
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
}

// @keyframes rotate {
//   0% {
//     transform: rotate(0);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
</style>
