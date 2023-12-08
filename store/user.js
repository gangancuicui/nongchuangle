export default {
  namespaced: true,

  // state 数据
  state: () => ({
    // 收货地址
    
	address: JSON.parse(uni.getStorageSync('address') || '{}'),
	userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
	token: uni.getStorageSync('token') || '',
	 redirectInfo: null
  }),
  

  // 方法
  mutations: {
    // 更新收货地址
	
    updateAddress(state, address) {
      state.address = address
	  this.commit('m_user/saveAddressToStorage')
    },
	 saveAddressToStorage(state) {
	    uni.setStorageSync('address', JSON.stringify(state.address))
	},
	updateUserInfo(state, userinfo) {
	    state.userinfo = userinfo
	    // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
	    this.commit('m_user/saveUserInfoToStorage')
	  },
	saveUserInfoToStorage(state) {
	    uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
	  },
	updateToken(state, token){
		state.token = token
		this.commit('m_user/saveTokenToStorage')
	},
	saveTokenToStorage(state) {
	    uni.setStorageSync('token', state.token)
	},
	updateRedirectInfo(state, info) {
	    state.redirectInfo = info
	  }
	
  },

  // 数据包装器
  getters: {
	  addstr(state){
	  	if (!state.address.provinceName) return ''
	  	return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo	
	  }
  },
}