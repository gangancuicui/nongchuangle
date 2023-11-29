<template>
	<view>
		
		<view class="view1">
		  <view>
		    <view class="title">
		      <text>{{detail[0].title}}</text>
		    </view>
		    <view class="cTime">
		      <rich-text>{{detail[0].cTime}}</rich-text>
		    </view>
		    <view class="img">
		      <image class="image" :src="detail[0].img"></image>
		    </view>
		    <view>
		      <rich-text :nodes='detail[0].content'></rich-text>
		    </view>
		
		  </view>
		</view>
		
		<view class="pinglun">
			<view class="detail">评论详情
			<button class="commit" @click="commit" type="primary">发表评论</button>
			</view>
				<view class="pinglun-detail">
					<view class="pinglun-item" v-for="(item,i) in pinglunList" :key="i">
						<view class="head"><img :src="item.title"></view>
						<view class="name">{{item.authorname}}</view>
						<view class="time">{{item.cTime}}</view>
						<view class="detail"><rich-text :nodes="item.content"></rich-text></view>
					</view>
				</view>
			
		</view>
		
		
		
		
	</view>
</template>

<script>
	import { mapGetters, mapMutations, mapState } from 'vuex'
	export default {
		data() {
			return {
				detail:{},
				tile:{},
				pinglunList:[],
				id:''
			};
		},
		computed:{
			  ...mapState('m_user', ['token']),
		},
		onLoad(options) {
			console.log(options)
			    this.tile=options
				this.id=options.id
			    var id=options.id
			    const db =wx.cloud.database().collection('farmer').where({_id:id})
			    db.get({
			      success: (res)=>{
			        console.log(res);
			         this.detail=res.data
			        console.log('res')
			      }
			    })
				this.getpinglunList(id)
		},
		onReady() {
			uni.setNavigationBarTitle({
			      title: this.tile.title,
			    })
		},
		onPullDownRefresh(){
			wx.showLoading({
			      title: "更新中",
			      mask: true
			})
			this.getpinglunList(this.id)
			wx.hideLoading()
			 wx.stopPullDownRefresh()
		},
		methods:{
			getpinglunList(id){
				console.log(id);
				console.log(1);
				const db =wx.cloud.database().collection('pinglun').where({wzid:id})
				db.get({
				  success: (res)=>{
				    console.log(res);
					this.pinglunList=res.data
				  }
				})
			},
			commit(){
				if (!this.token) return uni.$showMsg('请先登录！')
				uni.navigateTo({
					url: '/subpkg/pl/pl?id='+this.id
				});
			}
		}
	}
</script>

<style lang="scss">
.view1 {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20rpx;
  font-size: 30rpx;
}

.title {
  text-align: center;
  padding: 20rpx;
  font-size: 50rpx;
  font-weight: bold;
}

.cTime {
  color: #aaa;
  margin-bottom: 10rpx;
}

.img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20rpx;
}

.img image {
  max-width: 100%;
  max-height: 300rpx;
  object-fit: contain;
}

.content {
  line-height: 1.6;
  margin-bottom: 20rpx;
}
.pinglun{
	position: relative;
}

.detail {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  
}
.commit {
  font-size: 14px;
  color: #fff;
  background-color: #007aff;
  border-radius: 5px;
  padding: 8px 12px;
  margin-left: 10px;
  width: 80px;
  position: absolute;
  right: 0;
  top:15rpx
}
.pinglun-item {
  
  margin-bottom: 20px;
}
.head img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.name {
  font-size: 16px;
  font-weight: bold;
  margin-left: 10px;
  color: #333;
}
.time {
  font-size: 12px;
  color: #999;
  margin-left: 10px;
}
.detail {
  font-size: 14px;
  color: #666;
  margin-top: 10px;
  line-height: 1.5;
}


</style>
