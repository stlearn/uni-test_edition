<!--suppress ALL -->
<template>
  <view class="container">
    <u-popup v-model="show" mode="bottom" border-radius="30" height="250rpx" :mask="false">
      <view class="switch">
        <view class="switch_left">
          <u-button @click="toGoodsPublish" type="warning" size="default" shape="square" class="mybutton" plain :ripple="true" ripple-bg-color="#909399">发布商品</u-button>
        </view>
        <view class="switch_right">
          <u-button @click="toServicePublish" type="warning" size="default" shape="square" class="mybutton" plain :ripple="true" ripple-bg-color="#909399">发布服务</u-button>
        </view>
      </view>
    </u-popup>
    <u-button @click="show=true" type="success" size="default" shape="square">打开</u-button>
  </view>
</template>

<script>
export default {
  data(){
    return{
      //popup弹窗数据
      show:true
    }
  },
  onShow(){
    this.show=true;
    console.log("run")
  },
  methods:{
    toGoodsPublish(){
      console.log("run")
      uni.navigateTo({url:"./subpages/goods_publish"});
    },
    toServicePublish(){
      uni.navigateTo({url:"./subpages/service_publish"});
    }
  }
};
</script>
<style scoped>
.container {
  width: 750rpx;
  height: 100vh;
  background: #eceff1;
  display: flex;
  flex-direction:column;
  justify-content: flex-end;
}
.switch{
  width: 750rpx;
  height: 250rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.switch_left{
  width: 375rpx;
  height: 250rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.switch_right{
  width: 375rpx;
  height: 250rpx;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>