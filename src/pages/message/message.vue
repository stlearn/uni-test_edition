<!--suppress ALL -->
<template>
  <view class="container">
    <button @click="cli">跳转</button>
  </view>
</template>

<script>
import getTestRes from "../../api/test/test";
export default {
  methods:{
    cli(){
      wx.setTabBarBadge({
        index:2,
        text:'5'
      });
      uni.navigateTo({url:'/pages/message/talk'});
    }
  }
};
</script>
<style>
.container {
  width: 750rpx;
  height: 100vh;
  background: #eceff1;
}
</style>