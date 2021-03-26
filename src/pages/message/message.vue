<!--suppress ALL -->
<template>
  <view class="container">
    <u-button @click="get()">
      获取位置
    </u-button>
    <u-button @click="getmore()">
      获取位置
    </u-button>
  </view>
</template>

<script>
export default {
  methods:{
    get(){
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log(res);
          console.log('当前位置的经度：' + res.longitude);
          console.log('当前位置的纬度：' + res.latitude);
        }
      });
    },
    getmore(){
      uni.chooseLocation({
        success: function (res) {
          console.log(res);
          console.log('位置名称：' + res.name);
          console.log('详细地址：' + res.address);
          console.log('纬度：' + res.latitude);
          console.log('经度：' + res.longitude);
        }
      });
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