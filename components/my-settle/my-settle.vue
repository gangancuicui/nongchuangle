<template>
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
        <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
      </label>
    
      <view class="amount-box">
        合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
      </view>
    
      <view class="btn-settle" @click="settlement">结算({{checkedCount}})</view>
	  
	  
  </view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
		 seconds: 3,
		 timer: null
	}
  },
  computed:{
	  ...mapGetters('m_cart', ['total', 'checkedCount', 'checkedGoodsAmount']),
	  ...mapGetters('m_user', ['addstr']),
	   ...mapState('m_user', ['token']),
	   ...mapState('m_cart', ['cart']),
	   isFullCheck() {
	        return this.total === this.checkedCount
	    },
  },
  methods:{
	  ...mapMutations('m_cart', ['updateAllGoodsState', 'removeGoodsById']),
	  ...mapMutations('m_user', ['updateRedirectInfo']),
	  changeAllState(){
		  this.updateAllGoodsState(!this.isFullCheck)
	  },
	  settlement(){
		  if (!this.checkedCount) return uni.$showMsg('请选择要结算的商品！')
		  if (!this.addstr) return uni.$showMsg('请选择收货地址！')
		  if (!this.token) return uni.$showMsg('请先登录！')
		  if (!this.token) return this.delayNavigate()
		  //uni.navigateTo({ url: '/subpkg/pay-result/pay-result' });
		   //uni.$showMsg('支付成功')
		  this.payOrder()
		  
	  },
	  
	  async payOrder(){
		  console.log(this.cart)
		  console.log(this.addstr)
		     const orderInfo = {
		       // 开发期间，注释掉真实的订单价格，
		       order_price: this.checkedGoodsAmount,
		       // 写死订单总价为 1 分钱
		       //order_price: 0.01,
		       consignee_addr: this.addstr,
		       goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_name: x.goods_name, 
			   goods_number: x.goods_count, 
			   goods_price: x.goods_price ,
			   goods_logo:x.goods_small_logo})),
			   order_time:this.getCurrentDateTime()
		     }
			 //console.log(orderInfo)
			 const addRes = await uni.cloud.database().collection("order").add({
			     data:{
			 		orderInfo:orderInfo,
					order_state:false,
					payafter:false
			 	}
			   })
			   .then(res => {
			     return res
			   })
			   .catch(err => {
			     return err
			   })
			   orderInfo._id=addRes._id
			   console.log(orderInfo)
			   uni.navigateTo({
			   	url: '/subpkg/order-detail/order-detail?_id='+ orderInfo._id
			   });
			   var delGoodsList=this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id}));
			   console.log(1)
			   console.log(delGoodsList)
			   for(var i=0;i<delGoodsList.length;i++){
				   this.removeGoodsById(delGoodsList[i].goods_id)
			   }
	  },
		  getCurrentDateTime() {
			const now = new Date();
			const year = now.getFullYear();
			const month = String(now.getMonth() + 1).padStart(2, '0');
			const day = String(now.getDate()).padStart(2, '0');
			const hours = String(now.getHours()).padStart(2, '0');
			const minutes = String(now.getMinutes()).padStart(2, '0');
			const seconds = String(now.getSeconds()).padStart(2, '0');
			
			return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		  },
	  delayNavigate(){
		 this.seconds = 3
		 this.showTips(this.seconds)
		 
		   this.timer = setInterval(() => {
		     this.seconds--
		 
		     if (this.seconds <= 0) {
		       clearInterval(this.timer)
		 
		       uni.switchTab({
		         url: '/pages/my/my',
				 success: () => {
				 	this,updateRedirectInfo({
						 openType: 'switchTab',
						 from: '/pages/cart/cart'
					})
				 }
		       })
		       return
		     }
		 
		     this.showTips(this.seconds)
		   }, 1000)
	  },
	  showTips(n) {
	    uni.showToast({
	      icon: 'none',
	      title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
	      mask: true,
	      duration: 1500
	    })
	  }
  }
}
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;

  .radio {
    display: flex;
    align-items: center;
  }

  .amount {
    color: #c00000;
  }

  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #00aa00;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>