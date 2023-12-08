<template>
	<view>
		<view class="pay-result">
			<view class="pay-status">
				<t-icon class="text" name="check-circle-filled" size="60rpx" color="#47D368" />
				<text>支付成功</text>
			</view>
			<view class="btn-wrapper">
				
				<view class="status-btn"  @click="return1">返回</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			return1(e){
				console.log(e)
				wx.navigateBack({
						    delta: 2
						  })
			}
		}
	}
</script>

<style lang="scss">
.pay-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.pay-result .pay-status {
  margin-top: 100rpx;
  font-size: 48rpx;
  line-height: 72rpx;
  font-weight: bold;
  color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pay-result .pay-status text {
  padding-left: 12rpx;
}


.pay-result .btn-wrapper {
  margin-top: 48rpx;
  padding: 12rpx 32rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.pay-result .btn-wrapper .status-btn {
  height: 88rpx;
  width: 334rpx;
  border-radius: 44rpx;
  border: 2rpx solid #fa4126;
  color: #fa4126;
  font-size: 28rpx;
  font-weight: bold;
  line-height: 88rpx;
  text-align: center;
}
</style>
