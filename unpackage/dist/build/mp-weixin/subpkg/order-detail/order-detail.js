(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["subpkg/order-detail/order-detail"],{1087:function(e,t,n){"use strict";var a=n("5fbb"),o=n.n(a);o.a},1912:function(e,t,n){"use strict";n.r(t);var a=n("9f68"),o=n("4a9a");for(var c in o)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(c);n("1087");var r=n("f0c5"),u=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=u.exports},"4a9a":function(e,t,n){"use strict";n.r(t);var a=n("e967"),o=n.n(a);for(var c in a)["default"].indexOf(c)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(c);t["default"]=o.a},"5fbb":function(e,t,n){},"9f68":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){}));var a=function(){var e=this.$createElement;this._self._c},o=[]},b0b9:function(e,t,n){"use strict";(function(e,t){var a=n("4ea4");n("fc87");a(n("66fd"));var o=a(n("1912"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},e967:function(e,t,n){"use strict";(function(e,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a={data:function(){return{orderInfo:{}}},onLoad:function(t){var n=this,a=e.cloud.database().collection("order").where({_id:t._id});a.get({success:function(e){console.log(e.data[0]),n.orderInfo=e.data[0],console.log(n.orderInfo)}})},methods:{pay:function(e){if(console.log(e),1==e.currentTarget.id){var t=n.cloud.database();t.collection("order").where({_id:this.orderInfo._id}).update({data:{order_state:!0},success:function(e){n.showToast({title:"支付成功",duration:3e3,success:function(){setTimeout((function(){n.navigateBack({delta:1})}),1e3)}})}})}else if(2==e.currentTarget.id){var a=n.cloud.database();a.collection("order").where({_id:this.orderInfo._id}).update({data:{payafter:!0},success:function(e){n.showToast({title:"收货成功",duration:3e3,success:function(){setTimeout((function(){n.navigateBack({delta:1})}),1e3)}})}})}}}};t.default=a}).call(this,n("543d")["default"],n("bc2e")["default"])}},[["b0b9","common/runtime","common/vendor"]]]);