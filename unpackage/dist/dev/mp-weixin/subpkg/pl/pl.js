(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpkg/pl/pl"],{

/***/ 131:
/*!********************************************************************************!*\
  !*** D:/mini Program/heimayougou - 副本 (2)/main.js?{"page":"subpkg%2Fpl%2Fpl"} ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _pl = _interopRequireDefault(__webpack_require__(/*! ./subpkg/pl/pl.vue */ 132));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_pl.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 132:
/*!*************************************************************!*\
  !*** D:/mini Program/heimayougou - 副本 (2)/subpkg/pl/pl.vue ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pl.vue?vue&type=template&id=6ce0998c& */ 133);
/* harmony import */ var _pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pl.vue?vue&type=script&lang=js& */ 135);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 32);

var renderjs




/* normalize component */

var component = Object(_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "subpkg/pl/pl.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 133:
/*!********************************************************************************************!*\
  !*** D:/mini Program/heimayougou - 副本 (2)/subpkg/pl/pl.vue?vue&type=template&id=6ce0998c& ***!
  \********************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pl.vue?vue&type=template&id=6ce0998c& */ 134);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_template_id_6ce0998c___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 134:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/mini Program/heimayougou - 副本 (2)/subpkg/pl/pl.vue?vue&type=template&id=6ce0998c& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
try {
  components = {
    richText: function () {
      return __webpack_require__.e(/*! import() | components/richText/richText */ "components/richText/richText").then(__webpack_require__.bind(null, /*! @/components/richText/richText.vue */ 272))
    },
  }
} catch (e) {
  if (
    e.message.indexOf("Cannot find module") !== -1 &&
    e.message.indexOf(".vue") !== -1
  ) {
    console.error(e.message)
    console.error("1. 排查组件名称拼写是否正确")
    console.error(
      "2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"
    )
    console.error(
      "3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件"
    )
  } else {
    throw e
  }
}
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 135:
/*!**************************************************************************************!*\
  !*** D:/mini Program/heimayougou - 副本 (2)/subpkg/pl/pl.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../HBuilderX.3.8.7.20230703/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./pl.vue?vue&type=script&lang=js& */ 136);
/* harmony import */ var _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_HBuilderX_3_8_7_20230703_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_pl_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 136:
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!D:/mini Program/heimayougou - 副本 (2)/subpkg/pl/pl.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, wx) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 45));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 47));
var _vuex = __webpack_require__(/*! vuex */ 35);
var richText = function richText() {
  __webpack_require__.e(/*! require.ensure | components/richText/richText */ "components/richText/richText").then((function () {
    return resolve(__webpack_require__(/*! ../../components/richText/richText */ 272));
  }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
};
var app = getApp();
//let richText = null; //富文本编辑器实例
var _default = {
  components: {
    richText: richText
    //...mapState('m_user', ['userinfo'])
  },
  data: function data() {
    return {
      readOnly: false,
      title: '',
      coverimg: "",
      userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
      //编辑器是否只读
      placeholder: '开始编辑吧...',
      textTool: '',
      id: '',
      index: 0
    };
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(options) {
    console.log(this.userinfo);
    console.log(this.getCurrDateStr());
    //console.log(this.array[this.index])
    this.id = options.id;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {},
  methods: {
    getCurrDateStr: function getCurrDateStr() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      var d = date.getDate();
      d = d < 10 ? '0' + d : d;
      return y + '-' + m + '-' + d;
    },
    addData: function addData() {
      var _this = this;
      return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var addRes;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                wx.showLoading({
                  title: "插入中",
                  mask: true
                });
                _context.next = 3;
                return uni.cloud.database().collection("pinglun").add({
                  data: {
                    authorname: _this.userinfo.nickName,
                    cTime: _this.getCurrDateStr(),
                    content: app.globalData.data.richTextContents,
                    title: _this.userinfo.avatarUrl,
                    wzid: _this.id
                  }
                }).then(function (res) {
                  return res;
                }).catch(function (err) {
                  return err;
                });
              case 3:
                addRes = _context.sent;
                wx.hideLoading();
                console.log(addRes);
                if (addRes._id) {
                  _context.next = 9;
                  break;
                }
                wx.showToast({
                  title: "插入失败",
                  icon: "error"
                });
                return _context.abrupt("return");
              case 9:
                wx.showToast({
                  title: "插入成功",
                  icon: "success"
                });
                wx.navigateBack({
                  delta: 1
                });
              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    onKeyInput: function onKeyInput(e) {
      this.title = e.detail.value;
    },
    bindPickerChange: function bindPickerChange(e) {
      this.index = e.detail.value;
    },
    uploadPaper: function uploadPaper(e) {
      this.addData();
    },
    upimg: function upimg(e) {
      var _this2 = this;
      console.log(this.userinfo);
      uni.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'back',
        success: function success(res) {
          console.log(res.tempFiles[0].tempFilePath);
          _this2.upImgToDB(res.tempFiles[0].tempFilePath);
        }
      });
    },
    upImgToDB: function upImgToDB(path) {
      var _this3 = this;
      wx.cloud.uploadFile({
        cloudPath: "photo/" + Date.now() + "/" + this.userinfo.nickName + ".jpg",
        filePath: path
      }).then(function (res) {
        _this3.coverimg = res.fileID;
      }).catch(function (error) {
        uni.showToast({
          title: "失败",
          icon: 'error',
          duration: 2000
        });
      });
    },
    // 编辑器初始化完成时触发，可以获取组件实例
    onEditorReady: function onEditorReady(e, _dataset) {
      /* ---处理dataset begin--- */
      //this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log('[onEditorReady callback]');
      //console.log(this.zpSelectComponent('#richText'));
      richText = this.createSelectorQuery('#richText'); //获取组件实例
    },
    //设置富文本内容
    setContents: function setContents(rechtext) {
      this.editorCtx.setContents({
        html: rechtext,
        success: function success(res) {
          console.log('[setContents success]', res);
        }
      });
    },
    //撤销
    undo: function undo(e, _dataset) {
      /* ---处理dataset begin--- */
      //this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log('[undo callback]');
    },
    //恢复
    restore: function restore(e, _dataset) {
      /* ---处理dataset begin--- */
      //this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log('[restore callback]');
    },
    //清空编辑器内容
    clear: function clear() {
      this.editorCtx.clear({
        success: function success(res) {
          console.log('[clear success]', res);
        }
      });
    },
    //清空编辑器事件
    clearBeforeEvent: function clearBeforeEvent(e, _dataset) {
      var _this4 = this;
      /* ---处理dataset begin--- */
      //this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log('[clearBeforeEvent callback]');
      uni.showModal({
        cancelText: '取消',
        confirmText: '确认',
        content: '确认清空编辑器内容吗？',
        success: function success(result) {
          if (result.confirm) {
            _this4.$refs.richText.clear();
          }
        },
        fail: function fail(res) {}
      });
    },
    //清空编辑器成功回调
    clearSuccess: function clearSuccess(e, _dataset) {
      /* ---处理dataset begin--- */
      //this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log('[clearSuccess callback]');
    },
    //清除当前选区的样式
    removeFormat: function removeFormat() {
      this.editorCtx.removeFormat();
    },
    //插入图片
    insertImageEvent: function insertImageEvent(e, _dataset) {
      var _this5 = this;
      /* ---处理dataset begin--- */
      //this.handleDataset(e, _dataset);
      /* ---处理dataset end--- */
      console.log(1);
      uni.chooseImage({
        count: 1,
        success: function success(res) {
          //var _this=this
          //0.console.log(1)
          console.log(res);
          var path = res.tempFilePaths[0];
          //调用子组件方法，图片应先上传再插入，不然预览时无法查看图片。
          wx.cloud.uploadFile({
            cloudPath: "评论/" + Date.now() + "/" + _this5.userinfo.nickName + ".jpg",
            filePath: path
          }).then(function (res) {
            console.log(res.fileID);
            _this5.$refs.richText.insertImageMethod(res.fileID).then(function (res) {
              console.log('[insert image success callback]=>', res);
            }).catch(function (res) {
              console.log('[insert image fail callback]=>', res);
            });
          }).catch(function (error) {
            uni.showToast({
              title: "失败",
              icon: 'error',
              duration: 2000
            });
          });
          //console.log(path)
          // this.$refs.richText
          //                    .insertImageMethod(path)
          //                    .then((res) => {
          //                        console.log('[insert image success callback]=>', res);
          //                    })
          //                    .catch((res) => {
          //                        console.log('[insert image fail callback]=>', res);
          //                    });
        }
      });
    },
    //保存，获取编辑器内容
    getEditorContent: function getEditorContent(res, _dataset) {
      /* ---处理dataset begin--- */
      //this.handleDataset(res, _dataset);
      /* ---处理dataset end--- */
      var value = res.detail.value;
      console.log(res.detail.__args__[0].detail.value.html);
      uni.showToast({
        title: '获取编辑器内容成功',
        icon: 'none'
      });
      console.log('[getEditorContent callback]=>', value);
    },
    //show文本工具栏
    showTextTool: function showTextTool() {
      this.setData({
        textTool: !this.textTool
      });
    },
    //编辑器聚焦时触发
    bindfocus: function bindfocus(res, _dataset) {
      /* ---处理dataset begin--- */
      //this.handleDataset(res, _dataset);
      /* ---处理dataset end--- */
      var value = res.detail.value;
      // console.log('[bindfocus callback]=>', value)
    },
    //编辑器失去焦点时触发
    bindblur: function bindblur(res, _dataset) {
      /* ---处理dataset begin--- */
      //this.handleDataset(res, _dataset);
      /* ---处理dataset end--- */
      var value = res.detail.value;
      // console.log('[bindblur callback]=>', value)
    },
    //编辑器输入中时触发
    bindinput: function bindinput(res) {
      /* ---处理dataset begin--- */
      //this.handleDataset(res, _dataset);
      /* ---处理dataset end--- */
      var value = res.detail.value;
      //console.log(res.detail.__args__[0].detail.value.detail.html)
      // console.log('[bindinput callback]=>', value)
      console.log(1);
      console.log(app.globalData);
      app.globalData.data.richTextContents = res.detail.__args__[0].detail.value.detail.html;
    },
    //预览富文本
    preview: function preview() {
      uni.navigateTo({
        url: "../preview/preview"
      });
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"]))

/***/ })

},[[131,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpkg/pl/pl.js.map