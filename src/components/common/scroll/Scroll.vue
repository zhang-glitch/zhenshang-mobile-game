<template>
  <div class="wrapper" ref="wrapper">
    <!-- 必须只有个直接后代 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script> 
// 引入better-scroll
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  props: {
    // 由于有些界面不需要获取滚动位置  所以要外界传入
    probeType: {
      type: Number,
      default: 0,
    },
    // 由于有些页面不需要上拉加在更多  所以要外界传入
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // 1. 此时不要直接拿到wrapper  有可能会有标签重复    所以要用ref  来获取  才不会重复
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 这里若为false  只能限制那些本身不能点击的标签  而可以点击的标签不可以限制
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })
    // 2. 监听滚动位置
    if(this.probeType == 2 || this.probeType == 3){
      this.scroll.on('scroll', position => {
        this.$emit('scroll',position);
      });
    }
    //监听是否滚到底部
    if(this.pullUpLoad){
      this.scroll.on("pullingUp", () => {
        this.$emit('pullingUp')
      })
    }
  
  },
  methods: {
    scrollTo(x,y,time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ?  this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>