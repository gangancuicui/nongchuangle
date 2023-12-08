<template>
  <view>
    <view>
    
      <!-- 选择收货地址的盒子 -->
      <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
        <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收货地址+</button>
      </view>

    
      <!-- 渲染收货信息的盒子 -->
     <view class="address-info-box" v-else @click="chooseAddress">
       <view class="row1">
         <view class="row1-left">
           <view class="username">收货人：<text>{{address.userName}}</text></view>
         </view>
         <view class="row1-right">
           <view class="phone">电话：<text>{{address.telNumber}}</text></view>
           <uni-icons type="arrowright" size="16"></uni-icons>
         </view>
       </view>
       <view class="row2">
         <view class="row2-left">收货地址：</view>
         <view class="row2-right">{{addstr}}</view>
       </view>
     </view>
    </view>
  </view>
</template>



<script>
	import { mapState, mapMutations, mapGetters } from 'vuex'
	export default {
		data() {
			return {

			};
		},
		computed:{
			 ...mapState('m_user', ['address']),
			 ...mapGetters('m_user', ['addstr']),
			
		},
		methods:{
			...mapMutations('m_user', ['updateAddress']),
			async chooseAddress(){
				console.log(1)
				
				const succ = await uni.chooseAddress()
				console.log(2)
				if(succ.errMsg === 'chooseAddress:ok'){
					this.updateAddress(succ)
				}
				 if (succ.errMsg === 'chooseAddress:fail auth deny'|| succ.errMsg === 'chooseAddress:fail authorize no response') {
				    this.reAuth() 
				}
				
				
			},
			async reAuth(){
				const [err2,confirmResult] =await uni.showModal({
					content:'检测到位置未打开，是否前去打开',
					confirmText:'确认',
					
					cancelText:'取消',
					
				})
				if(err2) return
				if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
				if(confirmResult.confirm) return uni.openSetting({
					success :(settingResult)=>{
						if(settingResult,authSetting['scope.address'])return uni.$showMsg('授权成功！请选择地址')
						if (!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了地址授权！')
					}
				})
				
			}
		}
	}
</script>

<style lang="scss">
	// 底部边框线的样式
	.address-border {
	  display: block;
	  width: 100%;
	  height: 5px;
	}
	
	// 选择收货地址的盒子
	.address-choose-box {
	  height: 90px;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	}
	
	.address-info-box {
	  font-size: 12px;
	  height: 90px;
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  padding: 0 5px;
	
	  .row1 {
	    display: flex;
	    justify-content: space-between;
	
	    .row1-right {
	      display: flex;
	      align-items: center;
	
	      .phone {
	        margin-right: 5px;
	      }
	    }
	  }
	  .row2 {
	    display: flex;
	    align-items: center;
	    margin-top: 10px;
	
	    .row2-left {
	      white-space: nowrap;
	    }
	  }
	}


</style>