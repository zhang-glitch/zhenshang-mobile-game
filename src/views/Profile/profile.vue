<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">臻尚品</div>
    </nav-bar>
    <scroll class="scroll-height">
      <register />
      <money />
      <div class="line"></div>
      <profile-list />
    </scroll>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Register from "./childComps/Register";
import Money from "./childComps/Money";
import ProfileList from "./childComps/ProfileList";
import Scroll from "@/components/common/scroll/Scroll";
export default {
  name: "profile",
  components: { 
    Scroll, 
    ProfileList, 
    Money, 
    Register, 
    NavBar 
  }
};
</script>

<style scoped>
.profile {
  width: 100%;
  height: 100%;
}
.nav-bar {
  font-weight: 600;
  color: white;
  background-color: #ff8198;
}
.line {
  width: 100%;
  height: 10px;
  background-color: #eeeeee;
}
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
}
</style>