<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			wx.cloud.init({
			    env: 'nongchuangle-6g3o8yhz777d3ace',
			    traceUser:true
			})
		},
		globalData: {
		    data: {}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
