// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
	 env: 'nongchuangle-6g3o8yhz777d3ace',
	 traceUser: true
})
// 云函数入口函数
exports.main = async (event, context) => {
  //let { userInfo, a, b} = event
  let { OPENID, APPID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  //let sum = a + b
  return {
    OPENID,
    APPID
  }
}