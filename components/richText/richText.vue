<template>
    <view class="whole" id="richText">
        <view :style="'height:' + (textTool ? '200' : '100') + 'rpx;'"></view>
        <view class="page-body">
            <view class="wrapper">
				<view class="editor-toolbar" @tap="format">
				    <view class="toolbar-2" >
				        <view class="tool-item-cell">
				            <view class="tool-item-box">
				                <view class="cell-rg-shadow"></view>
				                <scroll-view scroll-x class="flex-sb" style="height: 70rpx; white-space: nowrap">
				                    <view class="tool-item">
				                        <i class="iconfont icon-charutupian" data-tool_name="insertImage" @tap.native="toolEvent($event, { tool_name: 'insertImage' })"></i>
				                    </view>
				                    <view class="tool-item">
				                        <i class="iconfont icon-font" data-tool_name="showTextTool" @tap.native="toolEvent($event, { tool_name: 'showTextTool' })"></i>
				                    </view>
				                    <view class="tool-item">
				                        <i
				                            :class="'iconfont icon-format-header-1 ' + (formats.header === 1 ? 'ql-active' : '')"
				                            data-tool_name="text_H1"
				                            data-name="header"
				                            :data-value="1"
				                            @tap.native="toolEvent($event, { tool_name: 'text_H1', name: 'header', value: 1 })"
				                        ></i>
				                    </view>
				                    <view class="tool-item">
				                        <i class="iconfont icon-date" data-tool_name="insertDate" @tap.native="toolEvent($event, { tool_name: 'insertDate' })"></i>
				                    </view>
				                    <view class="tool-item">
				                        <i class="iconfont icon-undo" data-tool_name="undo" @tap.native="toolEvent($event, { tool_name: 'undo' })"></i>
				                    </view>
				                    <view class="tool-item">
				                        <i class="iconfont icon-redo" data-tool_name="redo" @tap.native="toolEvent($event, { tool_name: 'redo' })"></i>
				                    </view>
				                    <view class="tool-item">
				                        <i class="iconfont icon-shanchu" data-tool_name="clear" @tap.native="toolEvent($event, { tool_name: 'clear' })"></i>
				                    </view>
				                </scroll-view>
				            </view>
				        </view>
				    </view>
				    <view class="toolbar-1" v-if="textTool">
				        <scroll-view scroll-x style="height: 70rpx; white-space: nowrap">
				            <view class="tool-item">
				                <i :class="'iconfont icon-zitijiacu ' + (formats.bold ? 'ql-active' : '')" data-name="bold"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-zitixieti ' + (formats.italic ? 'ql-active' : '')" data-name="italic"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-zitixiahuaxian ' + (formats.underline ? 'ql-active' : '')" data-name="underline"></i>
				            </view>
				            <view class="tool-item">
				                <i class="iconfont icon-fengexian" @tap.native="insertDivider"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-zuoduiqi ' + (formats.align === 'left' ? 'ql-active' : '')" data-name="align" data-value="left"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-juzhongduiqi ' + (formats.align === 'center' ? 'ql-active' : '')" data-name="align" data-value="center"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-youduiqi ' + (formats.align === 'right' ? 'ql-active' : '')" data-name="align" data-value="right"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-zuoyouduiqi ' + (formats.align === 'justify' ? 'ql-active' : '')" data-name="align" data-value="justify"></i>
				            </view>
				            <view class="tool-item">
				                <i class="iconfont icon--checklist" data-name="list" data-value="check"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-youxupailie ' + (formats.list === 'ordered' ? 'ql-active' : '')" data-name="list" data-value="ordered"></i>
				            </view>
				            <view class="tool-item">
				                <i :class="'iconfont icon-wuxupailie ' + (formats.list === 'bullet' ? 'ql-active' : '')" data-name="list" data-value="bullet"></i>
				            </view>
				        </scroll-view>
				    </view>
                <editor
                    id="editor"
                    class="ql-container"
                    :placeholder="placeholder"
                    showImgSize
                    showImgToolbar
                    showImgResize
                    @statuschange="onStatusChange"
                    :read-only="readOnly"
                    @ready="onEditorReady"
                    @focus="bindfocus"
                    @blur="bindblur"
                    @input="bindinput"
                ></editor>
				
            </view>
        </view>
        
        </view>
    </view>
</template>

<script>
const supportDateFormat = ['YY-MM', 'YY.MM.DD', 'YY-MM-DD', 'YY/MM/DD', 'YY.MM.DD HH:MM', 'YY/MM/DD HH:MM', 'YY-MM-DD HH:MM']; //支持的日期格式
export default {
    data() {
        return {
            formats: {
                header: 0,
                bold: false,
                italic: false,
                underline: false,
                align: '',
                list: ''
            },

            //样式集合
            //文本工具是否显示，默认隐藏
            textTool: false,

            appColorConfig: {
                check_color: ''
            }
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        //编辑器是否只读
        readOnly: {
            type: Boolean,
            default: false
        },
        //编辑器默认提示语
        placeholder: {
            type: String,
            default: '开始编辑吧...'
        },
        //插入的日期格式
        formatDate: {
            type: String,
            default: 'YY/MM/DD'
        },
        buttonTxt: {
            type: String,
            default: '保存'
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        /**
         * 组件生命周期函数-在组件布局完成后执行)
         */
        ready() {},

        //富文本工具点击事件
        toolEvent(res, _dataset) {
            /* ---处理dataset begin--- */
            //this.handleDataset(res, _dataset);
            /* ---处理dataset end--- */
            let { tool_name } = res.currentTarget.dataset;
            switch (tool_name) {
                case 'insertImage':
                    //插入图片
                    this.insertImageEvent();
                    break;
                case 'showTextTool':
                    //展示文字编辑工具
                    this.showTextTool();
                    break;
                case 'insertDate':
                    //插入日期
                    this.insertDate();
                    break;
                case 'undo':
                    //撤退（向前）
                    this.undo();
                    break;
                case 'redo':
                    //撤退（向后）
                    this.restore();
                    break;
                case 'clear':
                    //清除
                    this.clearBeforeEvent();
                    break;
            }
        },

        //编辑器初始化完成时触发
        onEditorReady() {
            console.log('编辑器初始化完成时触发');
            this.$emit('onEditorReady');
            // 返回一个 SelectorQuery 对象实例。在自定义组件或包含自定义组件的页面中，应使用this.createSelectorQuery()来代替。
            // https://developers.weixin.qq.com/miniprogram/dev/api/wxml/wx.createSelectorQuery.html
            uni.createSelectorQuery()
                .in(this)
                .select('#editor')
                .context((res) => {
                    console.log('createSelectorQuery=>', res);
                    this.editorCtx = res.context;
                    let rtTxt = '';
                    this.setContents(rtTxt); //设置富文本内容
                })
                .exec();
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
        undo() {
            this.editorCtx.undo();
            this.$emit('undo');
        },

        //恢复
        restore() {
            this.editorCtx.redo();
            this.$emit('restore');
        },

        /**
         * 修改样式，样式item点击事件
         * @param {String} name 样式名称
         * @param {String} value 样式值
         */
        format(res) {
            let { name, value } = res.target.dataset;
            if (!name) {
                return;
            }
            this.editorCtx.format(name, value);
        },

        // 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式
        onStatusChange(res) {
            const formats = res.detail;
            console.log('onStatusChange=>', res);
            
        },

        //在光标位置插入下换线
        insertDivider() {
            this.editorCtx.insertDivider({
                success: (res) => {
                    console.log('[insert divider success]', res);
                }
            });
        },

        //清空编辑器内容
        clear() {
            this.editorCtx.clear({
                success: (res) => {
                    this.$emit('clearSuccess');
                }
            });
        },

        //清空编辑器内容前的事件
        clearBeforeEvent() {
            this.$emit('clearBeforeEvent');
        },

        //清除当前选区的样式
        removeFormat() {
            this.editorCtx.removeFormat();
        },

        //插入日期
        insertDate() {
            if (supportDateFormat.indexOf(this.formatDate) < 0) {
                console.error(`Format Date ${this.formatDate} error \n It should be one of them [${supportDateFormat}]`);
                return;
            }
            let formatDate = this.getThisDate(this.formatDate);
            this.editorCtx.insertText({
                text: formatDate
            });
        },

        //插入图片事件
        insertImageEvent() {
            //触发父组件选择图片方法
            this.$emit('insertImageEvent', {
                detail: {}
            });
        },

        /**
         * 插入图片方法
         * @param {String} path 图片地址，仅支持 http(s)、base64、云图片(2.8.0)、临时文件(2.8.3)
         */
        insertImageMethod(path) {
            return new Promise((resolve, reject) => {
                this.editorCtx.insertImage({
                    src: path,
                    data: {
                        id: 'imgage'
                    },
                    success: (res) => {
                        resolve(res);
                    },
                    fail: (res) => {
                        reject(res);
                    }
                });
            });
        },

        //保存按钮事件，获取编辑器内容
        getEditorContent() {
            this.editorCtx.getContents({
                success: (res) => {
                    // console.log('[getContents rich text success]', res)
                    this.$emit('getEditorContent', {
                        detail: {
                            value: res
                        }
                    });
                }
            });
        },

        //show文本工具栏
        showTextTool() {
            
                this.textTool=!this.textTool

        },

        //编辑器聚焦时触发
        bindfocus(res) {
            this.$emit('bindfocus', {
                detail: {
                    value: res
                }
            });
        },

        //编辑器失去焦点时触发
        bindblur(res) {
            this.$emit('bindblur', {
                detail: {
                    value: res
                }
            });
        },

        //编辑器输入中时触发
        bindinput(res) {
            this.$emit('bindinput', {
                detail: {
                    value: res
                }
            });
        },

        /**
         * 返回当前日期
         * @format {String} 需要返回的日期格式
         */
        getThisDate(format) {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let h = date.getHours();
            let m = date.getMinutes(); //数值补0方法
            const zero = (value) => {
                if (value < 10) {
                    return '0' + value;
                }
                return value;
            };
            switch (format) {
                case 'YY-MM':
                    return year + '-' + zero(month);
                case 'YY.MM.DD':
                    return year + '.' + zero(month) + '.' + zero(day);
                case 'YY-MM-DD':
                    return year + '-' + zero(month) + '-' + zero(day);
                case 'YY.MM.DD HH:MM':
                    return year + '.' + zero(month) + '.' + zero(day) + ' ' + zero(h) + ':' + zero(m);
                case 'YY/MM/DD HH:MM':
                    return year + '/' + zero(month) + '/' + zero(day) + ' ' + zero(h) + ':' + zero(m);
                case 'YY-MM-DD HH:MM':
                    return year + '-' + zero(month) + '-' + zero(day) + ' ' + zero(h) + ':' + zero(m);
                default:
                    return year + '/' + zero(month) + '/' + zero(day);
            }
        }
    },
	
    mounted() {
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    created: function () {}
};
</script>
<style>
@import './assets/iconfont.css';
page {
    background: #f8f8f8;
}

.editor-toolbar i {
    display: flex;
    align-items: center;
    justify-content: center;
}

.toolbar-1 {
    padding: 5rpx 0;
    background: #e4e4e4;
}
.editor-toolbar .tool-item {
    display: inline-block;
}

.toolbar-2 {
    padding: 5rpx 20px 5rpx 10px;
    background: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.toolbar-2 .tool-item-cell {
   flex: 1; 

}
.toolbar-2 .tool-item-box {
     padding: 5px 10px;
}
.toolbar-2 .cell-rg-shadow {
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    z-index: 999;
    background: #dddddd;
}
.iconfont {
    display: inline-block;
    padding: 8px 8px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    font-size: 20px;
}

.toolbar {
    box-sizing: border-box;
    border-bottom: 0;
    font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
}

.ql-container {
    box-sizing: border-box;
    padding: 12px 15px;
    width: 100%;
    min-height: 30vh;
    height: auto;
    background: #fff;
    font-size: 16px;
    line-height: 1.5;
}

.ql-active {
    color: #06c;
}

/* .save-icon {
    padding: 200rpx 30rpx;
    font-size: 20rpx;
    background: #bf98d2;
    color: #fff;
} */
.flex {
    display: flex;
}
.flex-cc {
    display: flex;
    align-items: center;
    -ms-flex-item-align: center;
    justify-content: center;
}
.flex-sb {
    display: flex;
    align-items: center;
    -ms-flex-item-align: center;
    justify-content: space-between;
}
.flex-sa {
    display: flex;
    align-items: center;
    -ms-flex-item-align: center;
    justify-content: space-around;
}
</style>
