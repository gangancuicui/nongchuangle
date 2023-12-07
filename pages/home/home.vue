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

			<view class="nav-item">
				<view class="cate" @click="cate"><text class="text">产品分类</text></view>
				<view class="weather" @click="weather"><text class="text">气象预报</text></view>
			</view>
		</view>



		<view class="temai">
			<image class="imag" src="/static/人气商品.png"></image>
		</view>

		<!-- <view class="lists">
			<view class="list" v-for="(item,i) in floorList" :key="i">
				<view class="item" @click="gotodetail(item.goods_id)">
					<view class="imgg">
						<img :src="item.pic" alt="">
					</view>
					<view class="name">{{item.goods_name}}</view>
					<view class="price">￥{{item.goods_price}}<text>/500g</text></view>
					<button class="add" style="primary" @click="add(item)">添加进购物车</button>
				</view>
			</view>
		</view> -->
		<view class="Index" v-if="floorList.length!=0">
			<view class="pubuBox">
				<view class="pubuItem">
					<view class="item-masonry" v-for="(item, index) in floorList" :key="index">
						<image :src="item.pic" mode="widthFix" @click="gotodetail(item.goods_id)"></image>
						<view class="listtitle"> 
							<view class="listtitle1">{{ item.goods_name }}</view>
							<view class="listtitle2">
								<text class="listtitle2son">￥</text>
								{{ item.goods_price }}
								<button class="add" style="primary" @click="add(item)">添加进购物车</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		



	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState
	} from 'vuex'
	import {
		mapMutations
	} from 'vuex'
	import {
		mapGetters
	} from 'vuex'
	// import flowLayout from "@/components/eiml-flow/eiml-flow.vue"
	export default {
		mixins: [badgeMix],
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['total']),
		},
		// components:{
		//     'flowLayout':flowLayout
		// },
		data() {
			return {
				swiperList: [],

				floorList: [],


			}
		},
		onLoad() {
			this.getfloorList()
			this.getSwiperList()

			


		},
		methods: {
			...mapMutations('m_cart', ['addCart']),
			async getfloorList() {
				let db = uni.cloud.database().collection('goods').where({
					cate: "vegetable"
				})
				await db.get({
					success: (test) => {
						console.log(test)
						this.floorList = test.data
						console.log(this.floorList)
					}
				})
			},

			async getSwiperList() {
				let db = uni.cloud.database().collection('swiper-list')
				await db.get({
					success: (test) => {
						this.swiperList = test.data[0].message

					}
				})

			},

			navClickHandler(item) {
				if (item.name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			add(item) {
				console.log(item)
				const good = {
					goods_id: item.goods_id,
					goods_name: item.goods_name,
					goods_price: item.goods_price,
					goods_count: 1,
					goods_small_logo: item.pics[0].pics_big,
					goods_state: true
				}
				this.addCart(good)
			},

			search() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			},
			async weather() {
				uni.navigateTo({
					url: '/subpkg/smart/smart'
				});
			},
			async cate() {
				uni.switchTab({
					url: '/pages/cate/cate'
				})
			},
			gotodetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				});
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.con {
		position: relative;
	}

	swiper {
		height: 340;
		border-bottom: 5rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
			border-bottom: 5rpx;
		}

	}

	.nav-list {
		width: 100%;
		border-top: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 20rpx;
	}

	.nav-item {
		display: flex;

		.cate {
			width: 50%;
			height: 75rpx;
			background-color: rgb(0, 180, 0);
			float: left;
			margin-left: 10rpx;

			border-top-left-radius: 36rpx; //左上角圆角
			border-bottom-left-radius: 36rpx; //左下角圆角
			color: #fff;

			.text {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.weather {
			width: 50%;
			height: 75rpx;
			background-color: rgb(85, 132, 188);
			float: right;
			margin-right: 10rpx;

			border-top-right-radius: 36rpx;
			border-bottom-right-radius: 36rpx;
			color: #fff;

			.text {
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
		image {
			//position: absolute;
			// top:400rpx;
			// right: 300rpx;
			height: 100rpx;
			width: 200rpx;
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
		margin-bottom: 20rpx;
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

		text {
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

		// padding: 5px 10px;
		border-radius: 5px;
		// bottom: 10rpx;
		// right: 10px;
		width: 200rpx;
		height: 50rpx;
		font-size: 20rpx;

	}

	.pubuBox {
		padding: 22rpx;
	}

	.pubuItem {
		column-count: 2;
		column-gap: 20rpx;
	}

	.item-masonry {
		box-sizing: border-box;
		border-radius: 15rpx;
		overflow: hidden;
		background-color: #fff;
		break-inside: avoid;
		/*避免在元素内部插入分页符*/
		box-sizing: border-box;
		margin-bottom: 20rpx;
		box-shadow: 0px 0px 28rpx 1rpx rgba(78, 101, 153, 0.14);
	}

	.item-masonry image {
		width: 100%;
	}

	.listtitle {
		padding-left: 22rpx;
		font-size: 24rpx;
		padding-bottom: 22rpx;

		.listtitle1 {
			line-height: 39rpx;
			text-overflow: -o-ellipsis-lastline;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			min-height: 39rpx;
			max-height: 78rpx;
		}

		.listtitle2 {
			color: #ff0000;
			font-size: 32rpx;
			line-height: 32rpx;
			font-weight: bold;
			padding-top: 22rpx;
			display: flex;

			.listtitle2son {
				font-size: 32rpx;
			}
		}

		.listtitle3 {
			font-size: 28rpx;
			color: #909399;
			line-height: 32rpx;
			padding-top: 22rpx;
		}
	}
</style>