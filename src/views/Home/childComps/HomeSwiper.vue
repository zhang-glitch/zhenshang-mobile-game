<template>
     <swiper>
      <swiper-item v-for="item in banners" :key="item.image">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
// 导入轮番图的js文件
import {Swiper, SwiperItem} from 'components/common/swiper/index'
export default {
  name: 'HomeSwiper',
  // 拿到home.js中请求到的数据
  props: {
    banners: {
      type: Array,
      default() {
        return []//由于传递的是一个对象   所以默认值要写成一个函数的形式  并且返回空数组
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageLoad() {
      if(!this.isLoad){
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
}
</script>

<style>

</style>