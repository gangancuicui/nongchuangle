<template>
	<view>
		<view class="search">
			<uni-search-bar 
			@input="input" 
			:radius="100" 
			cancelButton="none">
			</uni-search-bar>
		</view>
		<view class="sug-list" v-if="searList.length !== 0">
			<view class="sug-item" v-for="(item,i) in searList" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>		
		</view>
		<view class="history" v-else>
			<view class="history-title">
				<text> 搜索历史</text>
				<uni-icons type="trash" size="17" @click="clear"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click='gotoGoodsList(item)'></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				keyWord:"",
				searList:[],
				b:{},
				historyList:[],
				
			};
		},
		
		onLoad() {
			this.historyList =JSON.parse(uni.getStorageSync('keyWord') || '[]' )
		},
		methods:{
			input(e){
				this.b=e
				console.log('this'+e)
				
				clearTimeout(this.timer)
				this.timer=setTimeout(() =>{
					this.keyWord=e
					this.getSearchList()
					console.log(this.keyWord)
				},500)
			
			},
			async getSearchList(){
				if(this.keyWord===''){
					this.searList=[]
					//this.gethistoryList()
					return
				}
				let db=uni.cloud.database().collection('goods').where({
					goods_name:{								//表示欲模糊查询数据所在列的名
					        $regex:'.*' + this.keyWord + '.*',		//表示欲查询的内容，‘.*’等同于SQL中的‘%’
					        $options: '1'							//$options:'1' 代表这个like的条件不区分大小写,详见开发文档
					      }
				})
				db.get({
					success :(test)=>{
						
						console.log(test)
						this.searList=test.data
					}
				})
				
				// const {data:res} =await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.keyWord})
				// if(res.meta.status !==200 )return uni.$$showMsg()
				
				// this.searList=res.message
			},
			gotoDetail(goods_id){
				console.log(goods_id)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods_id
				})
			},
			gethistoryList(){
				const set =new Set(historyList)
				set.delete(this.keyWord)
				set.add(this.keyWord)
				this.historyList =Array.from(set)
				uni.setStorageSync('keyWord',JSON.stringify(this.historyList))
			},
			clear(){
				this.historyList=[]
				uni.setStorageSync('keyWord','[]')
			},
			gotogoodList(word){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+word
				})
			}
			
		},
		computed: {
		  historys() {
		    // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
		    // 而是应该新建一个内存无关的数组，再进行 reverse 反转
		    return [...this.historyList].reverse()
		  }
		}
		
	}
</script>

<style lang="scss">
	.search{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	.sug-list{
		padding: 0 10rpx;
		
		.sug-item{
			font-size: 24rpx;
			padding: 26rpx;
			border-bottom: 2rpx solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			.goods-name{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 6rpx;
			}
		}
	}
	.history{
		padding: 0 5rpx;
		
		
		.history-title{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			font-size: 26rpx;
			border-bottom: 2rpx solid #efefef;
		}
		.history-list{
			 display: flex;
			 flex-wrap: wrap;
			 
			 .uni_tag{
				 margin-top: 10rpx;
				 margin-right: 10rpx;
			 }
		}
	}

</style>
