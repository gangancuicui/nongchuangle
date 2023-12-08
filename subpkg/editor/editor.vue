<template>
    <view class="container">
		<view class="title">
			<text>输入标题:</text>
			<view class="input">
				<input  type="text" focus placeholder="标题" @input="onKeyInput" >
				</input>
			</view>
		</view>
		
		<view class="uni-list-cell">
			<view class="uni-list-cell-left">文章类型:</view>
			<picker @change="bindPickerChange" :value="index" :range="array" class="uni-list-cell-right">
					<view class="uni-input">{{array[index]}}</view>
			</picker>
		</view>
		
		<view class="upimg">	
			<button class="share" type="primary" @click="upimg">上传封面图片</button>
			<button class="del" type="primary" @click="delImg" v-if="coverimg.length!=0">删除封面图片</button>
		</view>
		<view class="titleImg">
			<img :src="coverimg" alt="">
		</view>
		
		<view class="editor">
			<richText
			    ref="richText"
			    :readOnly="readOnly"
			    :placeholder="placeholder"
			    formatDate="YY/MM/DD"
			    buttonTxt="保存"
			    @clearBeforeEvent="clearBeforeEvent($event, { tagId: 'richText' })"
			    @clearSuccess="clearSuccess($event, { tagId: 'richText' })"
			    @undo="undo($event, { tagId: 'richText' })"
			    @restore="restore($event, { tagId: 'richText' })"
			    @onEditorReady="onEditorReady($event, { tagId: 'richText' })"
			    @bindfocus="bindfocus($event, { tagId: 'richText' })"
			    @bindblur="bindblur($event, { tagId: 'richText' })"
			    @bindinput="bindinput($event, { tagId: 'richText' })"
			    @insertImageEvent="insertImageEvent($event, { tagId: 'richText' })"
			    @getEditorContent="getEditorContent($event, { tagId: 'richText' })"
			></richText>
			<!--<view class="tip">
			    备注：
			    <view>1.改变图片大小，按住节点一小会儿再拖动。别问我为什么，谁还没遇到点难解决需求了。</view>
			    <view>2.预览内容中，图片仅支持网络url。</view>
			</view>-->
		</view>
		
		<view class="up-load-paper">
			<button class="share" type="primary" @click="uploadPaper">分享</button>
		</view>
		  
    </view>
</template>

<script>
import richText from '../../components/richText/richText';
import { mapState, mapMutations } from 'vuex'
const app = getApp();
//let richText = null; //富文本编辑器实例
export default {
    components: {
        richText
		//...mapState('m_user', ['userinfo'])
    },
    data() {
        return {
            readOnly: false,
			title:'',
			coverimg:"",
			userinfo:JSON.parse(uni.getStorageSync('userinfo') || '{}'),
            //编辑器是否只读
            placeholder: '开始编辑吧...',
			
            textTool: '',
			array: ['选种', '种植', '销售'],
			index: 0,
			
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		console.log(this.userinfo)
		console.log(this.getCurrDateStr())
		console.log(this.array[this.index])
	},
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {},
    methods: {
		
		getCurrDateStr() {
		  var date = new Date();  
		  var y = date.getFullYear();
		  var m = date.getMonth() + 1; 
		  m = m < 10 ? '0' + m : m;
		  var d = date.getDate();
		  d = d < 10 ? '0' + d : d;
		  return y + '-' + m + '-' + d;
		},
		
		async addData(){
			if(this.title==""){
				wx.showToast({
				  title: "请添加标题",
				  icon: "error"
				})
				return;
			}
			if(this.coverimg==""){
				wx.showToast({
				  title: "请添加头图",
				  icon: "error"
				})
				return;
			}
			wx.showLoading({
			      title: "插入中",
			      mask: true
			    })
			    const addRes = await uni.cloud.database().collection("farmer").add({
			        data:{
						author: this.userinfo.nickName,
						cTime:this.getCurrDateStr(),
						content:app.globalData.data.richTextContents,
						img:this.coverimg,
						paperid:this.array[this.index],
						title:this.title						
					}
			      })
			      .then(res => {
			        return res
			      })
			      .catch(err => {
			        return err
			      })
			    wx.hideLoading()
			    console.log(addRes._id)
			    if (!addRes._id) {
			      wx.showToast({
			        title: "插入失败",
			        icon: "error"
			      })
			      return
			    }
			    wx.showToast({
			      title: "插入成功",
			      icon: "success"
			    })
				wx.navigateBack({
				  delta: 1
				})
		},
		onKeyInput(e){
			this.title=e.detail.value
		},
		bindPickerChange(e){
			this.index=e.detail.value
		},
		uploadPaper(e){
			this.addData()
		},
		delImg(e){
			if(this.coverimg==""){
				wx.showToast({
				  title: "插入失败",
				  icon: "请先添加图片"
				})
				return;
			}
			wx.cloud.deleteFile({
			  fileList: [this.coverimg],
			  success: res => {
			    console.log(res.fileList);
				wx.showToast({
				  title: "删除成功",
				  icon: "success"
				})
				this.coverimg="";
				
			  },
			  fail: console.error
			})
			
		},
		upimg(e){
			console.log(this.userinfo)
			uni.chooseMedia({
				count:1,
				mediaType:['image'],
				sourceType:['album', 'camera'],
				camera:'back',
				success:(res) =>{
					console.log(res.tempFiles[0].tempFilePath)
					this.upImgToDB(res.tempFiles[0].tempFilePath)
				}
			})
		},
		upImgToDB(path){
			wx.cloud.uploadFile({
				cloudPath:"文章内容/"+Date.now()+"/"+this.userinfo.nickName+"-"+this.title+".jpg",
				filePath:path
			}).then(res=>{
				this.coverimg=res.fileID
				
				uni.showToast({
					title:"上传成功",
					icon:'success', 
					duration: 2000
				})
			}).catch(error => {
				uni.showToast({
					title:"失败",
					icon:'error', 
					duration: 2000
				})
			})
		},
        // 编辑器初始化完成时触发，可以获取组件实例
        onEditorReady(e, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log('[onEditorReady callback]');
            //console.log(this.zpSelectComponent('#richText'));
            richText =  this.createSelectorQuery('#richText'); //获取组件实例
        },

        //设置富文本内容
        setContents(rechtext) {
            this.editorCtx.setContents({
                html: rechtext,
                success: (res) => {
                    console.log('[setContents success]', res);
                }
            });
        },

        //撤销
        undo(e, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log('[undo callback]');
        },

        //恢复
        restore(e, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log('[restore callback]');
        },

        //清空编辑器内容
        clear() {
            this.editorCtx.clear({
                success: (res) => {
                    console.log('[clear success]', res);
                }
            });
        },

        //清空编辑器事件
        clearBeforeEvent(e, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log('[clearBeforeEvent callback]');
            uni.showModal({
                cancelText: '取消',
                confirmText: '确认',
                content: '确认清空编辑器内容吗？',
                success: (result) => {
                    if (result.confirm) {
                        this.$refs.richText.clear();
                    }
                },
                fail: (res) => {}
            });
        },

        //清空编辑器成功回调
        clearSuccess(e, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
            console.log('[clearSuccess callback]');
        },

        //清除当前选区的样式
        removeFormat() {
            this.editorCtx.removeFormat();
        },

        //插入图片
        insertImageEvent(e, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(e, _dataset);
            /* ---处理dataset end--- */
			console.log(1)
            uni.chooseImage({
                count: 1,
                success: (res) => {
                    
					//var _this=this
					//0.console.log(1)
					console.log(res);
                    let path = res.tempFilePaths[0];
                    //调用子组件方法，图片应先上传再插入，不然预览时无法查看图片。
					wx.cloud.uploadFile({
							cloudPath:"文章头图/"+Date.now()+"/"+this.userinfo.nickName+".jpg",
							filePath:path
						}).then(res=>{
							console.log(res.fileID)
							this.$refs.richText
							    .insertImageMethod(res.fileID)
							    .then((res) => {
							        console.log('[insert image success callback]=>', res);
							    })
							    .catch((res) => {
							        console.log('[insert image fail callback]=>', res);
							    });
						}).catch(error => {
							uni.showToast({
								title:"失败",
								icon:'error', 
								duration: 2000
							})
						})						

                }
            });
        },

        //保存，获取编辑器内容
        getEditorContent(res, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(res, _dataset);
            /* ---处理dataset end--- */
            let { value } = res.detail;
			console.log(res.detail.__args__[0].detail.value.html)
            uni.showToast({
                title: '获取编辑器内容成功',
                icon: 'none'
            });
            console.log('[getEditorContent callback]=>', value);
        },

        //show文本工具栏
        showTextTool() {
            this.setData({
                textTool: !this.textTool
            });
        },

        //编辑器聚焦时触发
        bindfocus(res, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(res, _dataset);
            /* ---处理dataset end--- */
            let { value } = res.detail;
            // console.log('[bindfocus callback]=>', value)
        },

        //编辑器失去焦点时触发
        bindblur(res, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(res, _dataset);
            /* ---处理dataset end--- */
            let { value } = res.detail;
            // console.log('[bindblur callback]=>', value)
        },

        //编辑器输入中时触发
        bindinput(res) {
            /* ---处理dataset begin--- */
            //this.handleDataset(res, _dataset);
            /* ---处理dataset end--- */
            let { value } = res.detail;
			console.log(1)
			console.log( app.globalData)
            app.globalData.data.richTextContents = res.detail.__args__[0].detail.value.detail.html;
			
        },

        //预览富文本
        preview() {
            uni.navigateTo({
                url: `../preview/preview`
            });
        }
    }
};
</script>
<style lang="scss">
.container {
    max-width: 600px;
	padding: 20rpx;
	
  }
  .upimg{
	  display: flex;
  }

  .title {
	display: flex;
	justify-content: left;
	align-items: center;
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 20px;
	.input{
		padding-left: 20rpx;
		input{
			  flex: 1;
			  width: 100%;
				padding-left: 20rpx;
			  border: none;
			  border-radius: 5rpx;
			  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
			  font-size: 16px;
			  
	}} 
  }

  .section {
    margin-bottom: 20px;
  }
  .uni-list-cell {
	  display: flex;
  }
  .uni-list-cell-left{
	  font-size: 36rpx;
	      font-weight: bold;
	      margin-bottom: 20px;
  }
  .uni-list-cell-right {
	  flex:1;
	  justify-content: left;
	  padding-left: 40rpx;
  }

  .label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .button1 {
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    background-color: #007aff;
    color: #fff;
    cursor: pointer;
	height: 80rpx;
	width: 500rpx;
	font-size: 30rpx;
	text-align: center;
	line-height: 80rpx;
  }
  .share .del{
	  height: 80rpx;
	  margin-bottom: 20rpx;
	  text-align: center;
	  line-height: 80rpx;
  }
  .titleImg img{
	  width: 100%;
	  height: 300rpx;
  }
  .titleImg{
	  height: 200rpx;
  }
</style>
