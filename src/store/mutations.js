import {
  ADD_COUNTER,
  ADD_TO_CART
} from './const_type'

export default {
  [ADD_COUNTER](state, oldProduce) {
    oldProduce.count += 1
  },
  [ADD_TO_CART](state, payload) {
    //第一次进来给count初始化一
    payload.count = 1
    // 添加商品时，让其为选中状态
    payload.checked = true
    state.cartList.push(payload)
  }
}