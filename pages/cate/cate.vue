<template>
	<view>
		<my-search @click='search'></my-search>
		<view class="scroll-view-container">
			<scroll-view class='left-scroll-view' scroll-y :style="{height: wh+'px'}">
				<block v-for="(item,i) in cateList" :key="i">
					<view :class="['left-view-item',i=== active ? 'active' : '' ]"@click="activeChanged(i)">{{item.cat_name}}
					
					</view>
				</block>
			</scroll-view>
			<scroll-view class='right-scroll-view' scroll-y :style="{height: wh+'px'}" :scroll-top="scrollTop" >
				<view class="title">/ {{title}} /</view>
				<view class="cate2" >
						 <view class="cate2-item"@click="gotoList(item2)" v-for="(item2,i2) in cateList2" :key="i2">
							 <image :src="item2.icon"></image>
							 <text class="text">{{item2.goods_name}}</text>
						 </view>
					
				</view>
				
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		 mixins: [badgeMix],
		data() {
			return {
				wh: 0,
				cateList:[],
				active:0,
				cateList2:[],
				scrollTop:0,
				title:'新鲜蔬菜'
			};
		},
		onLoad() {
			const sysInfo=uni.getSystemInfoSync()
			this.wh= sysInfo.windowHeight-50
			this.getCateList()
		},
		methods:{
			async getCateList(){
				
				let db=uni.cloud.database().collection('cate')
				db.get({
					success :(test)=>{
						
						console.log(test.data)
						this.cateList=test.data
						this.cateList2= this.cateList[0].children
						 //this.scrollTop = 0
						
					}
				})
			},
			activeChanged(i){
				console.log(i)
				this.active=i
				this.title=this.cateList[i].cat_name
				this.cateList2 = this.cateList[i].children;	
				if(this.scrollTop==0){
					this.scrollTop=1
				}
				else{
					this.scrollTop=0
				}
			},
			gotoList(item){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			search(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		},
		
	}
</script>

<style lang="scss">
	.scroll-view-container{
		display: flex;
		
		.left-scroll-view{
			width: 120rpx;
			
			.left-view-item{
				line-height: 123rpx;
				background-color: #f7f7f7;
				text-align: center;
				font-size: 24rpx;
				
				&.active{
					background-color: #ffffff;
					position: relative;
					
					&::before{
						content: '';
						display: block;
						width: 6rpx;
						height: 60rpx;
						background-color: #00aa00;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}
	}
	.search{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.title{
		font-size: 24rpx;
		font-weight: bold;
		text-align: center;
		padding: 30rpx 0;
	}
	.cate2{
		display: flex;
		flex-wrap: wrap;
	}
.cate2-item{
			 width: 33.3%;
			 margin-bottom: 20rpx;
			 display: flex;
			 flex-direction: column;
			 align-items: center;
		}
		
		image{
			width: 120rpx;
			height: 120rpx;
			border-radius: 30rpx;
		}
		.text{
			padding-top: 10rpx;
			font-size:24rpx;
		}
</style>
