export default{
	namespaced: true,
	state:() => ({
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addCart(state,goods){
			 const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
			  if (!findResult) {
				   state.cart.push(goods)
				} 
				else {
					findResult.goods_count++
				}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
		   uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateGoodsState(state, goods) {
		  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		  if (findResult) {
		    findResult.goods_state = goods.goods_state
		    this.commit('m_cart/saveToStorage')
		  }
		},
		updateGoodsCount(state, goods) {
		  
		  const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
		
		  if(findResult) {
		    
		    findResult.goods_count = goods.goods_count
		    
		    this.commit('m_cart/saveToStorage')
		  }
		},
		updateAllGoodsState(state, newState) {
		  state.cart.forEach(x => x.goods_state = newState)
		  this.commit('m_cart/saveToStorage')
		},
		removeGoodsById(state, goods_id) {
		  // 调用数组的 filter 方法进行过滤
		  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		  // 持久化存储到本地
		  this.commit('m_cart/saveToStorage')
		}
	},
	getters:{
		total(state){
			let c=0
			state.cart.forEach(goods => c+= goods.goods_count)
			return c
		},
		checkedCount(state) {
		  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
		  // 再使用 reduce 方法，将已勾选的商品总数量进行累加
		  // reduce() 的返回值就是已勾选的商品的总数量
		  return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount(state){
			return state.cart.filter(x => x.goods_state)
			                   .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
			                   .toFixed(2)
		}
	},
	
}