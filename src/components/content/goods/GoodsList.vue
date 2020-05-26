
<template>
  <div class="goods">
    <!-- <waterfall :line-gap="200" >
  <waterfall-slot
    :width="width"
    :height="height"  
  >
    <goods-list-item v-for="item in goods" :key="item.image" :goods-item="item" class="box"/>
  </waterfall-slot>
</waterfall> -->
    <goods-list-item 
                    v-for="item in goods" 
                    :key="item.image" 
                    :goods-item="item" 
                    class="box" 
                    :isSall="isSall"/>
  </div>
</template>

<script>
// 导入goodsitem  
import GoodsListItem from './GoodsListItem'
// // 导入瀑布流
// import Waterfall from 'vue-waterfall/lib/waterfall'
// import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
    // Waterfall,
    // WaterfallSlot
  },
  data() {
    return {
    
    }
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    },
    isSall: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
 /* .box {
  margin: 0;
  -webkit-column-count: 2;
  column-count: 2;
  -webkit-column-gap: 0;
  column-gap: 0;
}
.goods {
  padding: 7px;
  box-sizing: border-box; 
  width: 300px;
} */
</style>