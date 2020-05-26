<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">臻尚</div>
    </nav-bar>
    <!-- 多加一个tabcontrol来做吸顶效果   偷梁换柱 -->
     <tab-control 
          :titles="['流行','新款','精选']"
          @getIndex="tabClick"
          ref="tabControl1"
          class="tab-control"
          v-show="isTabFixed"/>
    <!-- 需要滚动的 -->
       <scroll class="content" 
               ref="scroll" 
               :probe-type="3" 
               @scroll="contentScroll"
               :pull-up-load="true"
               @pullingUp="loadMore">
          <!-- 导入轮播图组件 -->
          <home-swiper :banners="banners" 
          @swiperImageLoad="swiperImageLoad"/>
          <!-- 推荐组件 -->
          <recommend-view :recommends="recommends"/>
          <!-- feature -->
          <feature-view/>
          <!-- tabcontrol -->
          <tab-control 
          :titles="['流行','新款','精选']"
          @getIndex="tabClick"
          ref="tabControl2"/>
          <!-- goodslist -->
          <goods-list :goods="showGoods"/>
       </scroll>
       <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
// 引入导航栏
import NavBar from 'components/common/navbar/NavBar';
// 导入轮播图组件
import HomeSwiper from './childComps/HomeSwiper'
//导入推荐模块
import RecommendView from './childComps/RecommendView'
// 导入feature
import FeatureView from './childComps/FeatureView'

// 导入tabcontrol
import TabControl from 'components/content/tabControl/TabControl'
// 导入goodslist
import GoodsList from 'components/content/goods/GoodsList'
// 导入scroll
import Scroll from 'components/common/scroll/Scroll'
// // 导入回到顶部
// import BackTop from 'components/content/backTop/BackTop'
// 导入home.js
import {getHomeMultidata, getHomeGoods} from "network/home";
// 导入防抖函数
import { debounce } from "common/utils";

// 导入混入代码
import {itemListenerMixin,backTopMixin} from 'common/mixin'
export default {
  name: 'home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data(){
    return {
      banners: [],
      recommends: [],
      // 保存商品数据
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType : 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      isShowBackTop: false,
      // ItemImgListener: null
    }
  },
  created(){
    // 请求轮番图数据
    this.getHomeMultidata()
    // 请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  // mounted() {
  //   // // 图片加载完的事件监听
  //   const refresh = debounce(this.$refs.scroll.refresh,100);
  //   //  // 接收发射的事件   （goodslistitem)
  //   this.ItemImgListener = () => {
  //     refresh()
  //   };
  //   this.$bus.$on('itemImageLoad', this.ItemImgListener);
    
  // },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // destroy(){
  //   console.log('xiaohui')
  // },
  // 获取离开时的位置
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件的监听
    this.$bus.$off('itemImageLoad', this.ItemImgListener);
  },
  // 回来的时候   依然是那个位置
  activated() {
    // 防止突然回到顶部
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
     // 获取子组件tabcontrol 传过来的数据  上面的自定义事件不需要传参数
      tabClick(index) {
        // console.log(index);
        switch(index) {
          case 0: 
            this.currentType = 'pop';
            break;
          case 1: 
            this.currentType = 'new';
            break;
           case 2: 
            this.currentType = 'sell';
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // // this.scroll &&
      // backClick() {
      //   // 拿到scroll对象   内部封装了一个scrollTo方法
      //   // console.log(this.$refs.scroll);
      //   this.$refs.scroll.scrollTo(0, 0);
      // },
      contentScroll(position) {
        // 判断backTop的高度   子极定的1000
        // if(-position.y > 1000){
        //   this.isShowBackTop = true;
        // }
        this.isShowBackTop = (-position.y) > 1000 
        // 判断tabcontrol的高度   吸顶  fixed
        this.isTabFixed = (-position.y) > this.tabOffsetTop;
      },
      // 上拉加在更多
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        // 获取tabcontrol的   offsetTop
        // 所有的组件都有一个$el来获取组建的挂载元素
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      // 吸顶

      /**
       * 网络请求相关的方法 
       */
    // 请求轮番图数据
    getHomeMultidata() { 
      getHomeMultidata().then(res => {
        // console.log(res);
        // 处理请求的数据    一抽到底   来直接处理数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    // 请求商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
      // console.log(res);
      this.goods[type].list.push(...res.data.list);
      this.goods[type].page = page;

      // 完成上拉加在更多
      this.$refs.scroll.finishPullUp();
    })
    }
  }
}
</script>
 
<style scoped>/* scoped是作用域的意思   这会对该组件起效果 */
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);/* css中设置的变量 */
    color: white;
    /* position: fixed; */
    /* top: 0;
    left: 0;
    right: 0;
    z-index: 1; */
  }
  /* .tab-control {
    position: sticky;
    top: 44px;
  } */
  /* 设置高度 */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .content {
     height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  /* .active {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  } */
  .tab-control {
    position: relative;
    z-index: 2;
  }
</style>