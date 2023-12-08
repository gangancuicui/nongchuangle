<template>
	<view v-if="goodsInfo.goods_name" class="container">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
				<image class="img" :src="item.pics_big" @click="clickimg(i)"></image>
			</swiper-item>
		</swiper>
		<view class="goodsbox">
			
			<view class="name">{{goodsInfo.goods_name}}</view>
			
			<view class="body">
				<view class="price">￥{{goodsInfo.goods_price}}<text>/500g</text></view>
				
			</view>
			<view class="yunfei">快递：免运费</view>
		</view>
	
		<text>产品产地：{{chandi}}</text>
		<view class="location">
			 <map
			      id="myMap"
			      style="width: 100%; height: 300px;"
			      :latitude="latitude"
				  :longitude="longitude"
			      :markers="markers"
			      
			      show-location='true'
			    ></map>
		</view>
		<view class="nav">
			<uni-goods-nav :fill="true" :options='options'
			:buttonGroup="buttonGroup" 
			@click="onclick" @buttonClick='buttonClick'></uni-goods-nav>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { mapMutations } from 'vuex'
	import { mapGetters } from 'vuex'
	export default {
		 computed: {
			 ...mapState('m_cart', ['cart']),
			 ...mapGetters('m_cart', ['total']),
		},
		watch:{
			total:{
				handler(newVal){
					const rs=this.options.find((x) => x.text ==='购物车')
					  if (rs) {
						  rs.info = newVal
						}
				},
				immediate:true
				
			}
		},
		data() {
			return {
				latitude: '0',
				    longitude:'0',
				    markers:[],
					chandi:'',

				goodsInfo:{},
				options:[
				{
					icon:'cart',
					text:'购物车',
					info:2
				}],
				buttonGroup:[{
					text:'加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}]
			};
		},
		onLoad(opentions) {
			const goodsId= opentions.goods_id
			this.getGoodsDetail(goodsId)
			//this.getChanDi()
		},
		methods:{
			 ...mapMutations('m_cart', ['addCart']),
			async getGoodsDetail(goodsId){
				
				let db=uni.cloud.database().collection('goods').where({goods_id:goodsId})
				db.get({
					success :(test)=>{						
						console.log(test.data[0])
						this.goodsInfo=test.data[0]
						this.latitude=parseFloat(test.data[0].goods_latitude)
						this.longitude=parseFloat(test.data[0].goods_longitude)
						this.markers=[{
						  id: 1,
						  latitude: test.data[0].goods_latitude,
						  longitude: test.data[0].goods_longitude,
						 
						width: '20', // 标记点图标宽
						 height: '20' // 标记点图标高度
						
						}]
						this.getChanDi()
					}
				})
			},
			clickimg(i){
				uni.previewImage({
					current:i,
					urls:this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			onclick(e){
				console.log(e)
				if(e.content.text == '购物车'){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e){
				
				console.log(e)
				if(e.content.text == '立即购买'){
					
					wx.showToast({
					  title: "请添加到购物车",
					  icon: "error"
					})
				}
				if(e.content.text == '加入购物车'){
					const good={
						goods_id: this.goodsInfo.goods_id,
						goods_name:this.goodsInfo.goods_name,
						goods_price:this.goodsInfo.goods_price,
						goods_count:1,
						goods_small_logo:this.goodsInfo.pics[0].pics_big,
						goods_state:true
					}
					this.addCart(good)
				}
			},
			getChanDi(){
				wx.request({
				        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
				        data: {
				          "key": "HBMBZ-D77WG-2EAQG-QWMAI-IXBFQ-2YFT2",
				          "location":this.latitude+','+this.longitude
				
				        },
				        method: 'GET',
				        success: (r)=> {
				          console.log('用户位置信息',r);
						  this.chandi=r.data.result.address
						}
				         
				      })
			}
			
		}
	}
</script>

<style lang="scss">

swiper{
	height: 750rpx
	
}
.img{
		width: 100%;
		height: 100%;
	}
.goodsbox{
	padding: 20rpx;
	padding-right: 0;
	
	.price{
		color: #c00000;
		font-size: 36rpx;
		margin: 20rpx 0;
		text{
			font-size: 24rpx;
			color: #000000;
		}
	}
	.body{
		display: flex;
		justify-content: space-between;
	}
	.name{
		font-size: 50rpx;
		padding-right: 20rpx;
	}
	.fav{
		width: 240rpx;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		color: gray;
		justify-content: center;
		align-items: center;
		border-left: 2rpx solid #efefef;
	}
}
.yunfei{
	margin: 20rpx 0;
	font-size: 24rpx;
	color: gray;
	display: flex;
	justify-content: left;
}
.container{
	padding-bottom: 100rpx;
}
.nav{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}

</style>
