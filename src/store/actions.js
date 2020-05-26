import {
  ADD_COUNTER,
  ADD_TO_CART
} from './const_type'

//这里只是数据改变的中转站，最终数据还是要在mutations中改变的
export default {
  addCart({state, commit}, payload) {
   return new Promise((resolve, reject) => {
      // 查找之前数组是否存在该商品
      let oldProduce = state.cartList.find(item => item.iid == payload.iid)
      
      //判断oldProduce
      if(oldProduce) {
        // oldProduce.count += 1
        commit(ADD_COUNTER, oldProduce)
        resolve('商品数量加1')
      }else {
        commit(ADD_TO_CART, payload)
        resolve('添加购物车成功')
      }
   })
  }
}