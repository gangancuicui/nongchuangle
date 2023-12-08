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
    <view class="news-list">
      <view class="news-item" v-for="(item, index) in newsList" :key="index" @click="goToDetail(item._id, item.title)">
        <view class="image">
          <image :src="item.img" mode="aspectFill" />
        </view>
			<view class="info">
				<text class="date">发布时间：{{ item.cTime}}</text>
				<text class="title">{{ item.title }}</text>
				<text class="author">作者：{{item.author}}</text>
			</view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				newsList:[],
				flag:'种植'
			};
		},
		onLoad(){
			this.getNewsList()
		},
		onPullDownRefresh(){
			wx.showLoading({
			      title: "更新中",
			      mask: true
			})
			this.refresh()
			wx.hideLoading()
			 wx.stopPullDownRefresh()
		},
		methods:{
			goToDetail(id,title){
				console.log(id)
				uni.navigateTo({
					url: '/subpkg/news-detail/news-detail?id='+id+'&title='+ title
					
				});
			},
			
			select(e){
			    console.log(e)
			    var id=e.currentTarget.id
				this.flag=e.currentTarget.id
			    const db =wx.cloud.database().collection('farmer').where({paperid:id})
			    db.get({
			      success: (res)=>{
			        console.log(res);
			          this.newsList=res.data
			        console.log('res')
			      }
			    })
			},
			getNewsList(){
				console.log('res')
				const db =uni.cloud.database().collection('farmer').where({paperid:"种植"})
				    db.get({
				      success: (res)=>{
				        console.log(res)
				          this.newsList=[...this.newsList,...res.data]
				        console.log(this.newsList)
						
				      }
				    })
			},
			refresh(){
				const db =wx.cloud.database().collection('farmer').where({paperid:this.flag})
				db.get({
				  success: (res)=>{
				    console.log(res);
				      this.newsList=res.data
				    console.log('res')
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
  text{
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
  background-color: rgb(0,170,0);
  color: #00aa00;
  text{
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
  position: relative; /* 添加这个 */
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
.author{
	font-size: 24rpx;
	color: #74c58e;
	position: absolute;
	bottom: 15rpx;
	left: 240rpx;
}

.title {
  font-size: 36rpx;
  margin-bottom: 10rpx;
  color: #333333;
}


</style>
