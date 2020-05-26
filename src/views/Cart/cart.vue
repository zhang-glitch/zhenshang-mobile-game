<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template #center>臻尚阁({{cartLength}})</template>
    </nav-bar>

    <!-- 商品列表 -->
     <cart-list :cart-list="cartList"/>
     
     <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import {mapGetters} from 'vuex'
export default {
  name: 'cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // cartLength() {
    //   return this.$store.getters.cartLength
    // }
    ...mapGetters([
      'cartList'
    ]),
    cartLength() {
        return this.cartList.filter(item => {
          return item.checked === true
        }).length
    }
  }
}
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
  
</style>