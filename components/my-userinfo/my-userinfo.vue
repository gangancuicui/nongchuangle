<template>
	<view>
		<view class="container">
		
		    <view class="top-box">
		     <image :src="userinfo.avatarUrl" class="avatar"></image>
		       <view class="nickname">{{userinfo.nickName}}</view>
		    </view>
			<view class="panel-list">
			 
			
				<view class="panel">
				  <view class="panel-title">我的订单</view>
				  <view class="panel-body">
				    <view class="panel-item" @click="order1">
				      <image src="/static/待付款 (1).png" class="icon" ></image>
				      <text>待付款</text>
				    </view>
				    <view class="panel-item" @click="order2">
				      <image src="/static/待收货 (1).png" class="icon" ></image>
				      <text>待收货</text>
				    </view>
				    <view class="panel-item"@click="order3">
				      <image src="/static/无忧售后 (1).png" class="icon" ></image>
				      <text>退款/退货</text>
				    </view>
				    <view class="panel-item" @click="order4">
				      <image src="/static/全部订单 (1).png" class="icon" ></image>
				      <text>全部订单</text>
				    </view>
				  </view>
				</view>
			  <!-- 第三个面板 -->
			  <view class="panel">
			    <view class="panel-list-item" @click="chooseAddress">
			      <text>收货地址</text>
			      <uni-icons type="arrowright" size="15" ></uni-icons>
			    </view>
				<view class="panel-list-item" @click="addnews">
				  <text>发布文章</text>
				  <uni-icons type="arrowright" size="15" ></uni-icons>
				</view>
				<view class="panel-list-item" @click="myNews">
				  <text>我的文章</text>
				  <uni-icons type="arrowright" size="15" ></uni-icons>
				</view>
				<button open-type="contact" class='contacButton'>
			    <view class="panel-list-item">
					 <text>联系客服</text>
					 <button style="width:100%;border: none;position: absolute;" open-type="contact" plain="true"></button>
					 <uni-icons type="arrowright" size="15" ></uni-icons>
			    </view>
				</button>
			    <view class="panel-list-item" @click="loginout">
			      <text>退出登录</text>
			      <uni-icons type="arrowright" size="15"></uni-icons>
			    </view>
			  </view>
			</view>
		  </view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		name:"my-userinfo",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user', ['userinfo']),
		},
		methods:{
			 ...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateAddress']),
			async loginout(){
				  const succ= await uni.showModal({
				    title: '提示',
				    content: '确认退出登录吗？'
				  })
				  if (succ && succ.confirm) {
				     this.updateUserInfo({})
				     this.updateToken('')
				     this.updateAddress({})
				  }
			},
			async chooseAddress(){
				console.log(1)
				
				const succ = await uni.chooseAddress()
				console.log(2)
				if(succ.errMsg === 'chooseAddress:ok'){
					uni.showToast({
						title:"成功",
						icon:'success', 
						duration: 2000
					})
				}
				 if (succ.errMsg === 'chooseAddress:fail auth deny'|| succ.errMsg === 'chooseAddress:fail authorize no response') {
				   uni.showToast({
				   	title:"失败",
				   	icon:'error', 
				   	duration: 2000
				   })
				}
				
				
			},
			async myNews(){
				console.log(this.userinfo)
				uni.navigateTo({
					url: '/subpkg/my-news/my-news?openid='+this.userinfo.openid
					
				});
			},
			async addnews(){
				uni.navigateTo({
					url: '/subpkg/editor/editor'
				});
			},
			async warning(){
				uni.navigateTo({
					url: '/subpkg/warnning/warnning'
				});
			},
			order1(){
				uni.navigateTo({
					url: '/subpkg/my-order/my-order?query=1'
				});
			},
			order2(){
				uni.navigateTo({
					url: '/subpkg/my-order/my-order?query=2'
				});
			},
			order3(){
				uni.navigateTo({
					url: '/subpkg/my-order/my-order?query=3'
				});
			},
			order4(){
				uni.navigateTo({
					url: '/subpkg/my-order/my-order?query=4'
				});
			},
		}
	}
</script>

<style lang="scss">
.container {
  height: 100%;
  // 为整个组件的结构添加浅灰色的背景
  background-color: #f4f4f4;

  .top-box {
    height: 400rpx;
    background-color: #00aa00;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .avatar {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 45px;
      border: 2px solid white;
      box-shadow: 0 1px 5px black;
    }

    .nickname {
      color: white;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
.panel-list {
  padding: 0 10px;
  position: relative;
  top: -10px;

  .panel {
    background-color: white;
    border-radius: 3px;
    margin-bottom: 8px;

    .panel-title {
      line-height: 45px;
      padding-left: 10px;
      font-size: 15px;
      border-bottom: 1px solid #f4f4f4;
    }

    .panel-body {
      display: flex;
      justify-content: space-around;

      .panel-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        font-size: 13px;
        padding: 10px 0;

        .icon {
          width: 35px;
          height: 35px;
        }
      }
    }
  }
}
.panel-list-item {
  height: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  padding: 0 10px;
}
.contacButton {
  background-color: #FFF;
  padding: 0;
  margin: 0;
  font-size: inherit;
}
 
.contacButton::after {
  border: #FFF solid;
}

</style>