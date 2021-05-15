<template>
  <view class="frame">
    <view class="line"></view>
    <view class="content">
      <view class="avatar">
        <u-image width="100%" height="100%" shape="square" border-radius="2vh" :src="avatar"></u-image>
      </view>
      <view class="message">{{message}}</view>
      <u-badge type="error" :count="message_count" :absolute="false"></u-badge>
    </view>
  </view>
</template>
<script>
export default {
  name: "messageCard",
  props:{
    message_count:Number,
    message:String,
    avatar:String
  },
  data(){
    return{
    }
  }
}
</script>

<style scoped>
.frame{
  width: 750rpx;
  height:13.3vh;
  background-color: #ffffff;
}
.line{
  width: 750rpx;
  height:0.3vh;
}
.content{
  width: 750rpx;
  height:13vh;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.avatar{
  width: 8vh;
  height: 8vh;
  margin-left: 3vh;
}
.message{
  width: 70vw;
  height: 5vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>