<template lang="">
<view class="contianer">
  <user/>
  <view class="content-goods"> 
    <view class="content-goods-title">
      <text class="text-goods">我的交易</text>
    </view>
    <view class="line"></view>
    <view class="content-goods-content">
      <item src_img="../../static/images/on_sale.png" title="我在卖的"></item>
      <item src_img="../../static/images/saled.png" title="我卖出的"></item>
      <item src_img="../../static/images/buyed.png" title="我买到的"></item>
      <item src_img="../../static/images/favorites.png" title="我收藏的"></item>
    </view>
  </view>
  <view class="content-goods">
    <view class="content-goods-title">
      <text class="text-goods">我的服务</text>
      </view> 
    <view class="line"></view>
    <view class="content-goods-content">
      <item src_img="../../static/images/service.png" title="我提供的"></item>
      <item src_img="../../static/images/used.png" title="我用过的"></item>
      <item src_img="../../static/images/favorites.png" title="我收藏的"></item>
    </view>
  </view>
</view>
</template>
<script>
import { mapState } from "vuex";
import user from "../../components/mine/User";
import item from "../../components/mine/item";
export default {
  components: {
    user,
    item,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      id: (state) => state.test.id,
      message: (state) => state.test.message,
    }),
  },
  methods: {},
};
</script>
<style>
.container {
  width: 750rpx;
  display: flex;
  flex-direction: column;
}

.content-goods {
  margin-top: 2vh;
  margin-left: 10rpx;
  width: 730rpx;
  height: 26vh;
  background-color: #cce7ff;
  border-radius: 2vh;
  display: flex;
  flex-direction: column;
}
.content-goods-title {
  margin-top: 2vh;
  width: 730rpx;
  height: 3.8vh;
}
.content-goods-content {
  width: 730rpx;
  height: 20vh;
  border: #000000;
  border-radius: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.line {
  width: 730rpx;
  height: 0.2vh;
  background-color: #000000;
}
.text-goods {
  margin-left: 5vw;
  font-family: "Courier New", Courier, monospace;
  font-size: 18px;
}
</style>