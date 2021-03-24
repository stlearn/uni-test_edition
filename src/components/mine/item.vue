<template>
  <view class="main">
    <view class="icon" @click="cl">
      <image class="img" :src="src_img" mode="scaleToFill" />
    </view>
    <view class="item-text">{{ title }}</view>
  </view>
</template>
<script>
export default {
  props: ["src_img", "title"],
  methods: {},
};
</script>
<style>
.main {
  height: 15vh;
  width: 20vw;
  margin: 4px;
  border-radius: 1vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon {
  height: 14vw;
  width: 14vw;
}
.img {
  height: 12vw;
  width: 12vw;
}
.item-text {
  height: 4vh;
  width: 18vw;
  text-align: center;
}
</style>