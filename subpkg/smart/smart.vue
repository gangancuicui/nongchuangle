<template>
	<view class="content">
		<view class="spacer"></view>
		<view class="top-info-box">
			<view class="time">
				<text>数据更新时间</text>
				<text>{{myTime}}</text>
			</view>
			<view class="address">
				{{city}}
			</view>
			<view class="temp">{{nowWeather.temp}}℃</view>
			<view class="condition">
				<image :src="imgicon" mode=""></image>
				<text>{{nowWeather.text}}</text>
			</view>
			<view class="wind">
				<text>风向：{{nowWeather.windDir}}</text>
				<text class="line">|</text>
				<text>风力：{{nowWeather.windScale}}</text>
			</view>
			<view class="water">
				<text>降水量：{{nowWeather.precip}}</text>
				<text class="line">|</text>
				<text>湿度：{{nowWeather.humidity}}%</text>
			</view>
		</view>
		<view class="spacer"></view>
		<view class="next7">	    
		      <view v-for="(item, i) in nextWeather" class="weather-card">
		          <view class="nextDate">{{myTimes(item)}}</view>
		          <view class="w">
		          	<image class='dayIcon' :src="'../../static/weather_icon/' + item.iconDay + '.svg'" mode="">
		          						  <view>{{item.textDay}}</view>
		          	</image>
					<view class="spacer"></view>
		          	<image class='nightIcon' :src="'../../static/weather_icon/' + item.iconNight + '.svg'" mode="">
		          						  <view>{{item.textNight}}</view>
		          	</image>
		          </view>
		          <view class="temps">
		          	<view class="highttemp">最高温{{item.tempMax}}℃</view>
					<view class="spacer"></view>
		          	<view class="lowtemp">最低温{{item.tempMin}}℃</view>
		          </view>						
		    </view>
		</view>
		
		<view class="warning">
			<view class="warning-item" v-for="(item, i) in warningList" :key="i" :style="{'background-color': item.severityColor === 'Blue' ? '#5772e6' : item.severityColor}">
				<view class="warning-title">{{item.title}}</view>
				<view class="waring-time">{{myTimess(item)}}</view>
				<view class="warning-content">{{item.text}}</view>
			</view>
		</view>
		
		<view class="advise">
			<view class="advise-content">
				<view class="advise-title">种植建议</view>
				<view class="advise-text">{{getAdvise()}}</view>
			</view>	
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude:0,
				longitude:0,
				city:"",
				nowWeather:{},
				imgicon:'',
				time:"",
				nextWeather:[],
				warningList:{}
				
			};
		},
		onPullDownRefresh(){
			wx.showLoading({
			      title: "更新中",
			      mask: true
			})
			this.getlocation()
			this.getWarning()
			wx.hideLoading()
			 wx.stopPullDownRefresh()
		},
		onLoad() {
			this.getlocation()
			//console.log(this.longitude)
			//this.getCity()
			this.getWarning()
		},
		onShow() {
			console.log(this.longitude)
			//this.getCity()
		},
		computed:{
			myTime(){
				return this.time.slice(0,10)+" "+this.time.slice(11,16)
			},
			// myTimes(item){
			// 	return item.fxDate.slice(6)
			// }
		},
		methods:{
			getlocation(){
				wx.getLocation({
				 type: 'gcj02',
				 success:(res) =>{
				   
				   this.latitude = res.latitude
				   this.longitude= res.longitude  
					this.getCity()
					this.getWeather()
					this.getNextWeather()
				 }
				})
			},
			getCity(){
				wx.request({
				        url: 'https://apis.map.qq.com/ws/geocoder/v1/',
				        data: {
				          "key": "HBMBZ-D77WG-2EAQG-QWMAI-IXBFQ-2YFT2",
				          "location":this.latitude+','+this.longitude

				        },
				        method: 'GET',
				        success: (r)=> {
				          console.log('用户位置信息',r);
						  this.city=r.data.result.address_component.city+r.data.result.address_component.district
						},
						fail:(res)=>{
							wx.showToast({
							  title: "获取位置信息失败",
							  icon: "error",
							  duration:3000
							})
						}
				         
				      })
			},
			getWeather(){
				wx.request({
				        url: 'https://devapi.qweather.com/v7/weather/now',
				        data: {
				          "key": "21f00d056624443aa66c9c3d625a1813",
				          "location":this.longitude+','+this.latitude
				
				        },
				        method: 'GET',
				        success: (r)=> {
				          console.log('天气',r);
						  this.nowWeather=r.data.now,
						  this.time=r.data.updateTime,
						  this.imgicon="../../static/weather_icon/"+r.data.now.icon+".svg"
						}
				         
				      }) 
			},
			getNextWeather(){
				wx.request({
				        url: 'https://devapi.qweather.com/v7/weather/7d',
				        data: {
				          "key": "21f00d056624443aa66c9c3d625a1813",
				          "location":this.longitude+','+this.latitude
				
				        },
				        method: 'GET',
				        success: (r)=> {
				          console.log('七天天气',r);
						  this.nextWeather=r.data.daily						  
						}
				         
				      })
					this.getWarning()
			},
			myTimes(item){
			 	return item.fxDate.slice(5)
			},
			myTimess(item){
				return item.pubTime.slice(0,10)+" "+item.pubTime.slice(11,16)
			},
			getWarning(){
				wx.request({
				        url: 'https://devapi.qweather.com/v7/warning/now',
				        data: {
				          "key": "21f00d056624443aa66c9c3d625a1813",
						  //"lang"="en",
				          "location":this.longitude+','+this.latitude,
						  
				
				        },
				        method: 'GET',
				        success: (r)=> {
				          console.log('预警',r);
						  this.warningList=r.data.warning					  
						}
				         
				      }) 
			},
			getAdvise(){
				console.log(this.warningList.length)
				if(this.warningList.length==0 ){
					return'今天是一个适合农业生产的日子'
				}
				else{
					return'有预警信息，注意做好防灾减灾措施'
				}
			}
		}
	}
</script>

<style lang="scss">
.spacer{
	height: 20rpx;
}
.content {
		display: flex;
		flex-direction: column;
		background: linear-gradient(to bottom, #66ccff, #ffffff);
		justify-content: center;
		align-items: center;
		//margin-bottom: 20rpx;
		
	}
	.top-info-box{
		width: 90%;
		padding:30rpx 30rpx 20rpx 30rpx;
		  background-color: rgba(234, 234, 234, 0.5);
		display: flex;
		flex-direction: column;
		align-items: center;
		color:#000000;
		font-size: 30rpx;
		position: relative;
		border-radius: 48rpx;
		.time{
			position: absolute;
			right: 10rpx;
			top: 10rpx;
			font-size: 24rpx;
			display: flex;
			flex-direction: column;
		}
		.line{
			margin: 0 10rpx;
		}
		.address{
			font-size: 40rpx;
		}
		.temp{
			font-size: 50rpx;
			margin-top: 20rpx;
		}
		.condition{
			margin: 20rpx 0;
			display: flex;
			image{
				margin-right: 10rpx;
				width: 50rpx;
				height: 50rpx;
			}
		}
	}
	
	
.next7 {
	width: 95%;
		position: relative;
		border-radius: 48rpx;
		background-color: rgba(234, 234, 234, 0.5);
	    //background: linear-gradient(to bottom, #66ccff, #ffffff);
	    color: #333;
	    font-family: Arial, sans-serif;
	    padding: 20rpx 10rpx; 
	    display: grid;
	    //flex-wrap: wrap; /* 这行确保卡片在一行填满后能移到下一行 */
		justify-content: space-between;  
		justify-content: center;
}

.weather-card {
	width: 600rpx;; /* Adjust the width to fit 4 cards per row with some spacing */
	height: 200rpx;
    background-color: #f9f9f9;
    border-radius: 48rpx;
    display: flex;
    // flex-direction: column;
    // align-items: center;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 10px 20px;
	position: relative;
  
}


.nextDate {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
   position: absolute;
   top: 100rpx;
}

.w{
	display: flex;
	flex-wrap: wrap;
	position: absolute;
	 top: 50rpx;
	 right: 250rpx;
	 width: 150rpx;
	 height: 70%;
	 
}
.temps{
	position: absolute;
	top: 60rpx;
	right: 30rpx;
	height: 100%;
	.spacer{
		height: 20rpx; 
	}
}

.nightIcon{
	width: 60rpx; /* 设置图片宽度为60rpx */
	  height: 60rpx; /* 设置图片高度为60rpx */
	  filter: brightness(120%) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}
.dayIcon{
	width: 60rpx; /* 设置图片宽度为60rpx */
	  height: 60rpx; /* 设置图片高度为60rpx */
	  filter: brightness(120%) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.temperature {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.highttemp,
.lowtemp {
  font-size: 40rpx;
  font-weight: bold;
  white-space: nowrap; 
}

.lowtemp {
  color: #888;
}

.warning {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 48rpx;
  //background: linear-gradient(to bottom, #ffffff, #66ccff);
  color: #333;
  font-family: Arial, sans-serif;
  //padding: 20rpx 10rpx; 
}  
.warning-item {
  border-radius: 48rpx;
  margin: 10rpx;
  padding: 15rpx;
   box-shadow: 0 2px 4px rgba(0,0,0,.1);
    background-color: #f5f5f5; 
}
.waring-time{
	font-size: 30rpx;
	color: #dadada;
}
.warning-title {
  font-size: 16px;
  font-weight: bold; 
}
.advise{
	width: 100%;
		position: relative;
		border-radius: 48rpx;
	    //background: linear-gradient(to bottom, #66ccff, #ffffff);
		background-color: rgba(234, 234, 234, 0.5);
	    color: #333;
	    font-family: Arial, sans-serif;
	    padding: 20rpx 10rpx; 
	    //display: flex;
		align-items: center;
		justify-content: center;
	
}
.advise-content{
	border-radius: 48rpx;
	margin: 10rpx;
	padding: 15rpx;
	 box-shadow: 0 2px 4px rgba(0,0,0,.1);
	background-color: #ffffff; 
}
.advise-title{
	font-weight: bold;
}
</style>
