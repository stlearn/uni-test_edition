<template>
  <view class="container">
    <view class="header">
      <u-avatar
        class="avator"
        :src="user.avatar"
        mode="square"
        size="large"
      ></u-avatar>
      <text class="text">{{ user.id }}</text>
    </view>
    <view class="buttun">
      <u-button
        type="primary"
        shape="square"
        plain
        @click="Login()"
        open-type="getUserInfo"
        >登录</u-button
      >
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      user: {
        id: "",
        avatar: "",
        gender: "",
      },
    };
  },
  methods: {
    Login: function () {
      var that = this;
      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          console.log(loginRes);
          // 获取用户信息
          uni.getUserInfo({
            provider: "weixin",
            success: function (infoRes) {
              that.user.id = infoRes.userInfo.nickName;
              that.gender = infoRes.userInfo.gender;
              that.user.avatar = infoRes.userInfo.avatarUrl;
            },
            fail: function (res) {
              uni.showToast({
                title: "获取信息失败",
                icon: "fail",
                mask: true,
              });
            },
          });
        },
      });
    },
  },
};
</script>
<style>
.container {
  width: 750rpx;
}
.header {
  width: 750rpx;
  height: 15vh;
  background-color: #6482e3;
  border-bottom-left-radius: 5vw;
  border-bottom-right-radius: 5vw;
}
.avator {
  margin-top: 40px;
  margin-left: 20px;
  text-align: center;
}
.buttun {
  margin-top: 10vh;
  text-align: center;
}
.text {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin-left: 10px;
  font-size: 15px;
}
</style>