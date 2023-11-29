import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from './cart.js'
import moduleUser from './user.js'


Vue.use(Vuex)
const store = new Vuex.Store({
  // TODO：挂载 store 模块
  modules: {
	   m_cart: moduleCart,
	   m_user: moduleUser,
  },
})

export default store