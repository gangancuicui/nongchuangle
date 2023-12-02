<template>
	<view class="con">
		<my-search @click="search"></my-search>
		<view>
			<swiper :indicator-dots='true' :autoplay="True" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,i) in swiperList" :key="i">
					<navigator class="swiper-item" :url="item.url">
						<image :src="item.image_src"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<view class="nav-list">
			<!-- <view class="nav_item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view> -->
			<view class="nav-item">
				<view class="cate" @click="cate"><text class="text">产品分类</text></view>
				<view class="weather" @click="weather"><text class="text">气象预报</text></view>
			</view>
		</view>
		
		<!-- <view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floot-img-box">
					<navigator class="floot-left-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" 
						:style="{width: item.product_list[0].image_width+'rpx'}" 
						mode="widthFix"></image>
					</navigator>
					<view class="floot-right-box">
						<navigator class="floot-right-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
							<image :src="item2.image_src" 
							:style="{width: item2.image_width+'rpx'}"
							mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view> -->
		
		<view class="temai">
			<!-- <text>特卖</text> -->
			<image src="/static/人气商品.png"></image>
		</view>
			
		<view class="lists">
			<view class="list" v-for="(item,i) in floorList" :key="i">
				<view class="item" @click="gotodetail(item.goods_id)">
				<view class="imgg"><image :src="item.pics[0].pics_big"></image></view>
				<view class="name">{{item.goods_name}}</view>
				<view class="price">￥{{item.goods_price}}<text>/500g</text></view>
				<button class="add" style="primary" @click="add(item)">添加进购物车</button>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	import { mapMutations } from 'vuex'
	import { mapGetters } from 'vuex'
	export default {
		mixins: [badgeMix],
		computed: {
			 ...mapState('m_cart', ['cart']),
			 ...mapGetters('m_cart', ['total']),
		},
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[],
				
				
			}
		},
		onLoad() {
			this.getSwiperList()
			// this.getNavList()
			this.getfloorList()
		},
		methods:{
			...mapMutations('m_cart', ['addCart']),
			async getSwiperList(){
				let db=uni.cloud.database().collection('swiper-list')
				db.get({
					success :(test)=>{
						//console.log(test)
						test=test.data[0]
						//console.log(test)
						this.swiperList =test.message
						
					}
				})
				// const {data:res} =await uni.$http.get('/api/public/v1/home/swiperdata')
				// //console.log(res)
				// if(res.meta.status !== 200){
				// 	return uni.$showMsg()
				// }
				// this.swiperList =res.message
			},
			// async getNavList() {
			//       const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
			//       if (res.meta.status !== 200) return uni.$showMsg()
			//       this.navList = res.message

			// },
			navClickHandler(item){
				if(item.name=='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			add(item){
				console.log(item)
				const good={
					goods_id: item.goods_id,
					goods_name:item.goods_name,
					goods_price:item.goods_price,
					goods_count:1,
					goods_small_logo:item.pics[0].pics_big,
					goods_state:true
				}
				this.addCart(good)
			},
			async getfloorList(){
				// let db=uni.cloud.database().collection('floor')
				// db.get({
				// 	success :(test)=>{
						
				// 		console.log(test.data)
				// 		this.floorList=test.data
				// 	}
				// })
				
				
				// const{data:res} =await uni.$http.get('/api/public/v1/home/floordata')
				// if(res.meta.status !==200 )return uni.$$showMsg()
				//  res.message.forEach(floor =>{
				// 	 floor.product_list.forEach(p =>{
				// 		 p.url= '/subpkg/goods_list/goods_list?'+p.navigator_url.split('?')[1]
				// 		 //console.log(p)
				// 	 })
				//  })
				//  //console.log(res.message)
				// this.floorList=res.message
				
				let db=uni.cloud.database().collection('goods').where({cate:"vegetable"})
				db.get({
					success :(test)=>{		
						console.log(test)
							this.floorList=test.data	
					}
				})
			},
			search(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			},
			async weather(){
				uni.navigateTo({
					url: '/subpkg/smart/smart'
				});
			},
			async cate(){
				uni.switchTab({
					url:'/pages/cate/cate'
				})
			},
			gotodetail(id){
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id='+id
				});
			}
		}
	}
</script>

<style lang="scss">
	.con{
		position: relative;
	}
	swiper{
		height: 340;
		border-bottom: 5rpx;
		
		.swiper-item,
		image{
			width: 100%;
			height: 100%;
			border-bottom: 5rpx;
		}
		
	}
.nav-list{
	width: 100%;
	border-top: 20rpx;
	padding-top: 20rpx;
	padding-bottom: 20rpx;
	border-bottom: 20rpx;
}
.nav-item{
	display: flex;
	.cate{
		width: 50%;
		height: 75rpx;
		background-color: rgb(0, 180, 0);
		float:left;
		margin-left: 10rpx;
		//border: 1px solid #ccc;
		border-top-left-radius: 36rpx; //左上角圆角
		border-bottom-left-radius: 36rpx; //左下角圆角
		color: #fff;
		.text{
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center; //垂直居中对齐
			justify-content: center; //水平居中对齐
			
		}
	}
	.weather{
		width: 50%;
		height: 75rpx;
		background-color: rgb(85, 132, 188);
		float:right;
		margin-right: 10rpx;
		//border: 1px solid #ccc;
		border-top-right-radius: 36rpx; //右上角圆角
		border-bottom-right-radius: 36rpx; //右下角圆角
		color: #fff;
		.text{
			 width: 100%;
			 height: 100%;
			  display: flex;
			  align-items: center;  
			  justify-content: center;  
		}
	}
}

// .temai image{
// 	  padding: 5rpx;
// 	  height: 40px;
// 	  width: 100px;
// }
// .fenge{
// 	height: 5rpx;
// 	background-color: #d0d0d0;
// }
.temai {
	image{
		//position: absolute;
		// top:400rpx;
		// right: 300rpx;
		height: 100rpx;
		width:200rpx;
	}
}
	


	// .nav-list{
	// 	display: flex;
	// 	justify-content: space-around;
	// 	margin: 15rpx 0;
		
	// 	.nav-img{
	// 		width: 128rpx;
	// 		height: 140rpx;
	// 	}
	// }
	// .floor-title{
	// 	height: 60rpx;
	// 	width: 100%;
	// 	display: flex;
	// }
	// .floot-right-box{
	// 	display: flex;
	// 	flex-wrap: wrap;
	// 	justify-content: space-around;
	// }
	// .floot-img-box{
	// 	display: flex;
	// 	padding-left: 10rpx;
	// }
	.lists {
	  display: flex;
	  flex-wrap: wrap;
	}
	
	
	.list {
	  width: 40%;
	  height: 320px;
	  padding: 10rpx;
	   border: 2rpx solid #e5e5e5;
	border-radius: 30rpx;
		 position: relative; 
		 margin: 0 20rpx 0 20rpx;
		 margin-bottom:20rpx;
	}
	
	
	.imgg {
		 height: 50%;
		 overflow: hidden; 
	}
	.image {
	  width: 50%;
	 
	  display: block;
	  //border-radius: 10px; /* 起作用 */
	}
	
	
	.price {
	  color: red;
	  text{
	  	font-size: 24rpx;
	  	color: #000000;
	  }
	}
	
	.name {
	  color: #666;
	}
	
	.add {
	   background: orange;  
	    color: #fff;  
	    border: none;  
	    padding: 5px 10px;
	    border-radius: 5px;  
	    position: absolute;    
	    bottom: 10rpx;
	    right: 10px;    
	    width: 200rpx;
	    height: 50rpx;
	    font-size: 24rpx;
	      
	    display: flex;
	    align-items: center; 
	    justify-content: center;
	}
	
</style>
