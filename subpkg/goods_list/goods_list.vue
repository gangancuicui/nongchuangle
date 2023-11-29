<template>
	<view>
		  <view class="goods-list">
		       <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(goods)">
		         <view class="goods-item">
		           <!-- 商品左侧图片区域 -->
		           <view class="goods-item-left">
		             <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
		           </view>
		           <!-- 商品右侧信息区域 -->
		           <view class="goods-item-right">
		             <!-- 商品标题 -->
		             <view class="goods-name">{{goods.goods_name}}</view>
		             <view class="goods-info-box">
		               <!-- 商品价格 -->
		               <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
		             </view>
		           </view>
		         </view>
		       </view>
		     </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList:[],
				total:0,
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pageSize:10
				}
			};
		},
		filters: {
		  tofixed(num) {
		    return Number(num).toFixed(2)
		  }
		},
		methods:{
			async getGoodsList(){
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				
				if(res.meta.status !==200 )return uni.$$showMsg()
				console.log(res)
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total=res.message.total
			},
			gotoDetail(item) {
			  uni.navigateTo({
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
			  })
			}
		},
		onReachBottom() {
			 if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			this.queryObj.pagenum += 1
			this.getGoodsList()
		},
		onLoad(opentions) {
			this.queryObj.query=opentions.query || ''
			this.queryObj.cid=opentions.cid || ''
			this.getGoodsList()
			console.log(this.goodsList)
		},
		onPullDownRefresh() {
			 this.queryObj.pagenum = 1
			  this.total = 0
			  this.isloading = false
			  this.goodsList = []
			  this.getGoodsList(() => uni.stopPullDownRefresh())
		}
		
	}
</script>


<style lang="scss">
	.goods-item {
	  display: flex;
	  padding: 10px 5px;
	  border-bottom: 1px solid #f0f0f0;
	
	  .goods-item-left {
	    margin-right: 5px;
	
	    .goods-pic {
	      width: 100px;
	      height: 100px;
	      display: block;
	    }
	  }
	
	  .goods-item-right {
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	
	    .goods-name {
	      font-size: 13px;
	    }
	
	    .goods-price {
	      font-size: 16px;
	      color: #c00000;
	    }
	  }
	}

</style>
