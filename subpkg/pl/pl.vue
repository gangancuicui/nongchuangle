<template>
	<view>
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
		</view>
		
		<view class="up-load-paper">
			<button type="primary" @click="uploadPaper">分享</button>
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
			id:'',
			index: 0,
        };
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
		console.log(this.userinfo)
		console.log(this.getCurrDateStr())
		//console.log(this.array[this.index])
		this.id=options.id
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
			wx.showLoading({
			      title: "插入中",
			      mask: true
			    })
			    const addRes = await uni.cloud.database().collection("pinglun").add({
			        data:{
						authorname: this.userinfo.nickName,
						cTime:this.getCurrDateStr(),
						content:app.globalData.data.richTextContents,
						title:this.userinfo.avatarUrl,
						wzid:this.id												
					}
			      })
			      .then(res => {
			        return res
			      })
			      .catch(err => {
			        return err
			      })
			    wx.hideLoading()
			    console.log(addRes)
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
				cloudPath:"photo/"+Date.now()+"/"+this.userinfo.nickName+".jpg",
				filePath:path
			}).then(res=>{
				this.coverimg=res.fileID
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
							cloudPath:"评论/"+Date.now()+"/"+this.userinfo.nickName+".jpg",
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
            /* ---处理dataset end--- */
            let { value } = res.detail;
        },

        //编辑器失去焦点时触发
        bindblur(res, _dataset) {
            /* ---处理dataset begin--- */
            /* ---处理dataset end--- */
            let { value } = res.detail;
        },

        //编辑器输入中时触发
        bindinput(res) {
            /* ---处理dataset begin--- */
            /* ---处理dataset end--- */
            let { value } = res.detail;
			console.log(1)
			console.log( app.globalData)
            app.globalData.data.richTextContents = res.detail.__args__[0].detail.value.detail.html;
			
        },

       
    }
};
</script>

<style lang="scss">

</style>
