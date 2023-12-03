<template>
  <!-- 最外层的容器 -->
  <view class="my-settle-container">
    <label class="radio" @click="changeAllState">
        <radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
      </label>
    
      <!-- 合计区域 -->
      <view class="amount-box">
        合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
      </view>
    
      <!-- 结算按钮 -->
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
	  // async papayOrder(){
		 //  // 1. 创建订单
		 //    // 1.1 组织订单的信息对象
			// console.log(this.cart.filter(x => x.goods_state))
		 //    const orderInfo = {
		 //      // 开发期间，注释掉真实的订单价格，
		 //      // order_price: this.checkedGoodsAmount,
		 //      // 写死订单总价为 1 分钱
		 //      order_price: 0.01,
		 //      consignee_addr: this.addstr,
		 //      goods: this.cart.filter(x => x.goods_state).map(x => ({ goods_id: x.goods_id, goods_number: x.goods_count, goods_price: x.goods_price }))
		 //    }
		 //    // 1.2 发起请求创建订单
		 //    const { data: res } = await uni.$http.post('/api/public/v1/my/orders/create', orderInfo)
		 //    if (res.meta.status !== 200) return uni.$showMsg('创建订单失败！')
		 //    // 1.3 得到服务器响应的“订单编号”
		 //    const orderNumber = res.message.order_number
		  
		 //     // 2. 订单预支付
			// const { data: res2 } = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder', { order_number: orderNumber })
			//   // 2.2 预付订单生成失败
			//   if (res2.meta.status !== 200) return uni.$showError('预付订单生成失败！')
			//   // 2.3 得到订单支付相关的必要参数
			//   const payInfo = res2.message.pay
		 //     // 3. 发起微信支付
			//  // 3.1 调用 uni.requestPayment() 发起微信支付
			//     const [err, succ] = await uni.requestPayment(payInfo)
			//     // 3.2 未完成支付
			//     if (err) return uni.$showMsg('订单未支付！')
			//     // 3.3 完成了支付，进一步查询支付的结果
			//     const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
			//     // 3.4 检测到订单未支付
			//     if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
			//     //3.5 检测到订单支付完成
			//     uni.showToast({
			//       title: '支付完成！',
			//       icon: 'success'
			//     })
				
	  // },
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
			   //order_state:false,
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
		 
		   // 1. 将定时器的 Id 存储到 timer 中
		   this.timer = setInterval(() => {
		     this.seconds--
		 
		     // 2. 判断秒数是否 <= 0
		     if (this.seconds <= 0) {
		       // 2.1 清除定时器
		       clearInterval(this.timer)
		 
		       // 2.2 跳转到 my 页面
		       uni.switchTab({
		         url: '/pages/my/my',
				 success: () => {
				 	this,updateRedirectInfo({
						 openType: 'switchTab',
						 from: '/pages/cart/cart'
					})
				 }
		       })
		 
		       // 2.3 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
		       return
		     }
		 
		     this.showTips(this.seconds)
		   }, 1000)
	  },
	  showTips(n) {
	    // 调用 uni.showToast() 方法，展示提示消息
	    uni.showToast({
	      // 不展示任何图标
	      icon: 'none',
	      // 提示的消息
	      title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
	      // 为页面添加透明遮罩，防止点击穿透
	      mask: true,
	      // 1.5 秒后自动消失
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
  // 将背景色从 cyan 改为 white
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