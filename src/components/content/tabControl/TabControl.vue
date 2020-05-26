
<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
    :key="item" class="tab-control-item"
    :class="{isActive: index == currentIndex}"
    @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      //子传父   自定义事件   带参数
      this.$emit("getIndex",index);
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    justify-content: space-evenly;
    height: 40px;
    line-height: 40px;
    background: whitesmoke;
  }
 .isActive {
   color: var(--color-high-text);
   
 }
 .isActive span {
   border-bottom: 2px solid var(--color-tint);
   padding: 5px;
 }
</style>