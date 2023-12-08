<template>
  <view>
    <view class="address">
      <text class="title">收货地址</text>
      <view class="info">{{ orderInfo.orderInfo.consignee_addr }}</view>
    </view>
    <view class="order">
      <view class="num">订单号: {{ orderInfo._id }}</view>
      <view class="goods">
        <view class="goods-item" v-for="(item, i) in orderInfo.orderInfo.goods" :key="i">
          <view class="logo">
            <img :src="item.goods_logo" class="goods-image">
          </view>
          <view class="details">
            <view class="name">商品名称: {{ item.goods_name }}</view>
            <view class="nums">数量: {{ item.goods_number }}</view>
            <view class="price">单价: ￥{{ item.goods_price }}</view>
          </view>
        </view>
      </view>
      <view class="count">
        <view class="count-price">订单总价：￥{{ orderInfo.orderInfo.order_price }}</view>
        <view class="time">订单创建时间：{{ orderInfo.orderInfo.order_time }}</view>
        <view class="state">订单状态：{{ orderInfo.order_state ? '已支付' : '未支付' }}</view>
        <view class="pay" v-if="(!orderInfo.order_state  && !orderInfo.payafter)">
          <button type="primary" @click="pay" id=1>支付</button>
        </view>
		<view class="pay" v-if="(orderInfo.order_state  && !orderInfo.payafter)">
		  <button type="primary" @click="pay" id=2>确认收货</button>
		</view>
		<view class="pay" v-if="(orderInfo.order_state  && orderInfo.payafter)">
		  <button type="primary" open-type="contact">申请售后</button>
		</view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo:{}
			};
		},
		onLoad(options) {
			let db=uni.cloud.database().collection('order').where({_id:options._id})
			db.get({
				success :(res)=>{
					console.log(res.data[0])
					this.orderInfo=res.data[0]
					console.log(this.orderInfo)
				}
			})
		},
		methods:{
			pay(e){
				console.log(e)
				if(e.currentTarget.id==1){
					const db=wx.cloud.database()
					db.collection('order').where({
					      _id: this.orderInfo._id
					    })
					    .update({
					      data: {
					        order_state:true
					      },
						  success:(r)=>{
						  	wx.showToast({
						  		title: '支付成功',
						  		duration: 3000,
						  		success: function () {
						  			setTimeout(function () {
						  	        wx.navigateBack({
						  	          	 delta: 1
						  	        })
						  	            }, 1000);
						  	         }
						  	})
						  }
					})
					
				}else if(e.currentTarget.id==2){
					const db=wx.cloud.database()
					db.collection('order').where({
					      _id: this.orderInfo._id
					    })
					    .update({
					      data: {
					        payafter:true
					      },
						  success:(r)=>{
							  wx.showToast({
								title: '收货成功',
								duration: 3000,
								success: function () {
									setTimeout(function () {
							        wx.navigateBack({
							          	 delta: 1
							        })
							            }, 1000);
							         }
							})
						  }
					})
					
					
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
  .address {
    margin-bottom: 20px;
  }

  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .info {
    font-size: 16px;
    color: #333;
    margin-top: 10px;
  }

  .order {
    border: 1px solid #ccc;
    padding: 20px;
  }

  .num {
    font-size: 36rpx;
    font-weight: bold;
  }

  .goods-item {
    display: flex;
    align-items: center;
    margin-top: 15px;
  }

  .logo img {
    width: 80px; 
    height: 80px; 
  }

  .details {
    margin-left: 15px;
  }

  .name {
    font-size: 16px;
    color: #333;
	white-space: pre-wrap;
  }

  .nums,
  .price {
    font-size: 14px;
    color: #666;
	white-space: pre;
  }

  .count-price {
    font-size: 18px;
    font-weight: bold;
  }

  .time,
  .state {
    font-size: 16px;
    color: #666;
  }

  .pay {
    margin-top: 20px;
  }

  .pay button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
