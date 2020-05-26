<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" 
    @titleClick="titleClick"
    ref="nav"/>
    <scroll class="content" 
    ref="scroll" 
    @scroll="contentScroll"
    :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <!-- 这里有问题 -->
      <detail-goods-info :images-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailBaseInfo from './childComps/DetailBaseInfo';
import DetailShopInfo from './childComps/DetailShopInfo';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamInfo from './childComps/DetailParamInfo';
import DetailCommentInfo from './childComps/DetailCommentInfo';
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList'
import {itemListenerMixin,backTopMixin} from 'common/mixin'


// 导入数据请求
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
import { debounce } from "common/utils";
export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  mixins: [itemListenerMixin,backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      //这里的数据再混入里面
      // isShowBackTop: false,
      // ItemImgListener: null
    }
  },
  created() {
    // 1. 保存传入的数据
    this.iid = this.$route.params.iid;
    // 2. 根据iid请求详细数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      // 1. 获取顶部的图片轮播图数据
      this.topImages = data.itemInfo.topImages;
       // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.创建店铺信息的对象
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        // 5.获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 6. 取出评论信息
        if(data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }
        // 错误一   此时拿到数据   但是页面渲染还要时间   所以这里的offsetTop是不对的
        // this.themeTopYs = [];
        //   this.themeTopYs.push(0);
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);

        // 错误二  
        // // 如果直接写，有可能页面还没渲染出来   获取为undefined  
        // // 页面渲染完后 会调用$nextTick中的函数
        // 这里拿到的offsetTop是图片还没加载完成的  所以也不正确
        this.$nextTick(() => {
          this.themeTopYs = [];
          this.themeTopYs.push(0);
          this.themeTopYs.push(this.$refs.params.$el.offsetTop);
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          // 额外加一个最大值  来解决联动问题
          this.themeTopYs.push(Number.MAX_VALUE);
          // console.log(this.themeTopYs);
        })
    })
    // 3. 请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })
    // 4. 给getThemeTopY赋值
    // this.getThemeTopY = debounce(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs)
    // },100)
  },
  // 到子组件检测到图片全部加载完成   然后我们刷新页面
  methods: {
    imageLoad() { 
      this.$refs.scroll.refresh();
      // 图片加载完成后获取offsetTop
      // this.getThemeTopY();
      
    },
    titleClick(index) {
      // console.log(index);
      // console.log(this.themeTopYs);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      // console.log(position);
      // 1. 获取y值
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      // 2. positionY和主题中的值进行对比
       for (let i = 0; i < length - 1; i++) {
        //  这样比较麻烦    额外再数组中加一个特别大的值即可
        // if (this.currentIndex != i && (i < length - 1 && positionY >= this.themeTopYs[i]
        // && positionY < this.themeTopYs[i+1] || (i == length - 1 && positionY >= this.themeTopYs[i])))
  
         if(positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) { 
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      // 3. 是否显示回到顶部   
      // 这样写是错误的
      //  if(-position.y > 1000){
      //     this.isShowBackTop = true;
      //   }
      this.isShowBackTop = (-position.y) > 1000
    },
    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;


      // 2. 将商品添加到购物车
      this.$store.dispatch('addCart',product).then(res => {
        this.$toast.toastShow(res, 2000)
      })
    }
  },
  // mounted() {
  //  // // 图片加载完的事件监听
  //   const refresh = debounce(this.$refs.scroll.refresh,100);
  //   //  // 接收发射的事件   （goodslistitem)
  //   this.ItemImgListener = () => {
  //     refresh()
  //   };
  //   this.$bus.$on('itemImageLoad', this.ItemImgListener);
  // },
  destroyed() {
    // 取消detail组件事件总线的监听
    this.$bus.$off('itemImageLoad', this.ItemImgListener);
  }
}
</script>

<style scoped>
    #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    /* % 是相对于父元素的 */
    height: calc(100% - 44px - 49px);
  }
</style>