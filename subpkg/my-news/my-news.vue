<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll" scroll-x="true">
				<view class="tabs">
					<view :class="flag === '选种' ? 'tab active' : 'tab'" id="选种" @click="select"><text>选种</text></view>
					<view :class="flag === '种植' ? 'tab active' : 'tab'" id="种植" @click="select"><text>种植</text></view>
					<view :class="flag === '销售' ? 'tab active' : 'tab'" id="销售" @click="select"><text>销售</text></view>
				</view>
			</scroll-view>
		</view>
		<view >
			<!-- <view class="news-list">
			<uni-swipe-action>
			    <view class="news-item" v-for="(item, index) in newsList" :key='index'>
			        <uni-swipe-action-item :right-options='options' @click='delById(item._id, item.paperid)'>
			            <view class="test" >
			                <view class="image">
			                    <image :src="item.img" mode="aspectFill" />
			                </view>
			                <view class="info">
			                    <text class="date">发布时间：{{ item.cTime}}</text>
			                    <text class="title">{{ item.title }}</text>
			                    <text class="author">作者：{{item.author}}</text>
			                </view>
						</view>
			        </uni-swipe-action-item>
			    
				</view>
			</uni-swipe-action>
			</view> -->
			<view class="news-list">
			      <view class="news-item" v-for="(item, index) in newsList" :key="index" >
					  <view class="test" @click="goToDetail(item._id, item.title)">
					  	<view class="image">
					  	  <image :src="item.img" mode="aspectFill"/>
					  	</view>
					  		<view class="info">
					  			<text class="date">发布时间：{{ item.cTime}}</text>
					  			<text class="title">{{ item.title }}</text>
					  			<text class="author">作者：{{item.author}}</text>
					  		</view>
					  </view>
						<button class="del" @click="delById(item._id,item.paperid)">删除</button>
						
			      </view>
			    </view>
		</view>
	</view>
</template>

<script>
	// import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		// mixins: [badgeMix],
		data() {
			return {
				newsList: [],
				flag: '种植',
				openid: '',

				options: [{
					text: '删除',
					style: {
						backgroundColor: '#c8cac9'
					}
				}]
			};
		},
		onLoad(opentions) {
			this.openid = opentions.openid
			this.getNewsList()
		},

		methods: {
			goToDetail(id, title) {
				console.log(id)
				uni.navigateTo({
					url: '/subpkg/news-detail/news-detail?id=' + id + '&title=' + title

				});
			},

			select(e) {
				console.log(e)
				var id = e.currentTarget.id
				this.flag = e.currentTarget.id
				const db = wx.cloud.database().collection('farmer').where({
					paperid: id,
					_openid: this.openid
				})
				db.get({
					success: (res) => {
						console.log(res);
						this.newsList = res.data
						console.log('res')
					}
				})
			},
			getNewsList() {
				console.log('res')
				const db = uni.cloud.database().collection('farmer').where({
					paperid: "种植",
					_openid: this.openid
				})
				db.get({
					success: (res) => {
						console.log(res);
						this.newsList = [...this.newsList, ...res.data]
						console.log('res')
					}
				})
			},
			selectByFlag() {
				const db = wx.cloud.database().collection('farmer').where({
					paperid: this.flag,
					_openid: this.openid
				})
				db.get({
					success: (res) => {
						console.log(res);
						this.newsList = res.data
						console.log('res')
					}
				})
			},
			delById(id, pid) {
				var _this = this;
				wx.showModal({
					title: '提示',
					content: '是否确认删除',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定')
							let db = wx.cloud.database() //设置数据库
							let userCollection = db.collection('farmer') //单引号里为刚刚新建的集合名
							userCollection.where({
								//先查询
								_id: id
							}).remove().then(res => {
								wx.showToast({
								  title: "删除成功",
								  icon: "success"
								});
								_this.selectByFlag();
							}).catch(err => {
								wx.showToast({
								  title: "删除失败",
								  icon: "error"
								}) //失败提示错误信息
							})
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})

			}
		}
	}
</script>

<style lang="scss">
	.container {
		padding: 10rpx;
		background-color: #f0f8f5;
	}

	.top {
		height: 88rpx;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.scroll {
		width: 100%;
		height: 60rpx;
	}

	.tabs {
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: center;
		height: 100%;
		padding-left: 20rpx;
	}

	.tab {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;

		text {
			color: black;
		}

		padding: 12rpx 0;
		border-radius: 20rpx;
		color: #ffffff;
		margin-right: 20rpx;
		background-color: transparent;
		transition: background-color 0.3s;
	}

	.tab.active {
		background-color: rgb(0, 170, 0);
		color: #00aa00;

		text {
			color: #fff;
		}
	}

	.news-list {
		display: flex;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.news-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 20rpx;
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		box-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.1);
		transition: transform 0.3s, box-shadow 0.3s;
		position: relative;
		/* 添加这个 */
	}

	.news-item:hover {
		transform: translateY(-5rpx);
		box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);
	}

	.image {
		width: 200rpx;
		height: 200rpx;
		margin-right: 20rpx;
		overflow: hidden;
		border-radius: 10rpx;
	}

	.image image {
		width: 100%;
		height: 100%;
		display: block;
		object-fit: cover;
	}

	.info {
		flex: 1;


	}

	.date {
		font-size: 24rpx;
		color: #74c58e;
		position: absolute;
		bottom: 15rpx;
		right: 20rpx;
	}

	.author {
		font-size: 24rpx;
		color: #74c58e;
		position: absolute;
		bottom: 15rpx;
		left: 240rpx;
	}

	.title {
		position: absolute;
		left: 250rpx;
		top: 10rpx;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
		color: #333333;
	}

	.del {
		position: absolute;
		color: #fff;
		left: 550rpx;
		top: 60rpx;
		background-color: #db7b7b;
		
		
	}
</style>