
<template>
  <div class="recommend">
    <!-- 每一个class的属性  div创建的标签都有 -->
    <div v-for="item in recommends" :key="item.image" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    justify-content: space-evenly;
    font-size: 14px;
    text-align: center;
    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  /* 设置图片宽度 */
  .recommend-item img {
    width: 76px;
    height: 76px;
    margin-bottom: 8px;
  }
</style>