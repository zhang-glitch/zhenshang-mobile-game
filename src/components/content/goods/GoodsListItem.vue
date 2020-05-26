
<template>
  <div class="goods-item" @click="itemClick" :style="showTotall()">
    <!-- 由于better-scroll的滚动问题   需要时么个图片加载出来  计算高度 -->
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
    <div class="sall" :style="showWidth()">立即购买</div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      width1: '188px',
      width2: '100px',
      height1: '390px',
      height2: '200px'
    }
  },
  computed: {
    // 由于数据解析不一样  所以要在这定义方法判断
    showImage() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods: {
    imageLoad() {
      // 发射事件
      this.$bus.$emit('itemImageLoad');
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid);
      // console.log()
    },
     // 为sall设置宽度
    showWidth() {
      if(this.$route.path === '/home' || ('/detail/' + this.goodsItem.iid)) {
        return {width: this.width1}
      }
      // else if(this.$route.path === '/category') {
      //   return {width: this.width2}
      // }
      else {
        return {}
      }
    },
    showTotall() {
      if(this.$route.path === '/home' || ('/detail/' + this.goodsItem.iid)) {
        return {height: this.height1}
      }
      // else if(this.$route.path === '/category') {
      //   return {height: this.height2}
      // }
      else {
        return {}
      }
    }
  },
 
 
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    /* height: 360px; */
    /* height: 280px; */
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 46px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
  .sall {
    position: absolute;
    /* width: 166px; */
    height: 36px;
    line-height: 36px;
    border-radius: 10%;
    text-align: center;
    background: #ff577f;
    opacity: 0.8;
    bottom: 5px;
    left: 5px;
    color: #ffffff
  }
  /* .sall {
    position: absolute;
    width: 120px;
    height: 36px;
    line-height: 36px;
    border-radius: 10%;
    text-align: center;
    background: #ff577f;
    opacity: 0.8;
    bottom: 5px;
    left: 5px;
    color: #ffffff
  } */
  /* .sall {
    position: absolute;
    
    height: 36px;
    line-height: 36px;
    border-radius: 10%;
    text-align: center;
    background: #ff577f;
    opacity: 0.8;
    bottom: 5px;
    right: 5px;
    left: 5px;
    color: #ffffff
  } */
</style>