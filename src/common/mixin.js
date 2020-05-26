
import {debounce} from './utils'
import BackTop from 'components/content/backTop/BackTop'
export const itemListenerMixin = {
  data() {
    return {
      ItemImgListener: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,100);
      this.ItemImgListener = () => {
        refresh();
      }
      this.$bus.$on('itemImageLoad', this.ItemImgListener);
      // console.log('我是混入的内容')
  }
}

// 回到顶部的抽取
export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop, 
  },
  methods: {
    backClick() {
      // 拿到scroll对象   内部封装了一个scrollTo方法
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scrollTo(0, 0);
    },
  }
}