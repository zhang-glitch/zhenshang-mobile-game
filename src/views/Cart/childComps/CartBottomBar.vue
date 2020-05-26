<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" :is-checked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="btnClick">去计算({{cartLength}})</span>
  </div>
</template>

<script>
  import CheckButton from './CheckButton'
  import { mapGetters } from 'vuex'

	export default {
		name: "BottomBar",
    components: {
		  CheckButton
    },
    computed: {
      ...mapGetters([
      	'cartList'
      ]),
		  totalPrice() {
        const cartList = this.cartList;
        return cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      cartLength() {
        return this.cartList.filter(item => {
          return item.checked === true
        }).length
      },
      isSelectAll() {
        if(this.cartList.length === 0) return false
        return !(this.cartList.find(item => !item.checked))
        // return !(this.cartList.filter(item => !item.checked).length);
      }
    },
    methods: {
      checkBtnClick() {
        // 则全部选中,点击时，改为false
        if (this.isSelectAll) {
          this.cartList.forEach(item => {
            item.checked = false;
          });
        } else {//有没有选中的，点击，则为全选
          this.cartList.forEach(item => {
            item.checked = true;
          });
        }

        // // 简化代码
        // this.cartList.forEach(item => item.checked = !this.isSelectAll)
      },
      btnClick() {
        const length = this.cartList.find(item => item.checked)
        //只要有一个选中，就不提醒
        if(!length)
        this.$toast.toastShow('亲，请选择要购买的商品', 2000)
      }
    }
	}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: #ff8198;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
