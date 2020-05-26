<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
}
</script>

<style scoped>
 .nav-bar {
   display: flex;
   height:44px;
   line-height: 44px;  /* 导航栏高度一般为这些 */
  text-align: center; /* 每部分文字都要居中 */
  box-shadow: 0 1px 1px rgba(100,100,100,0.2);
 }
  .left, .right{
    width: 60px;
  }
  .center {
    flex: 1;
  }
</style>>

