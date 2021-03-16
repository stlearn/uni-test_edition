<template >
  <view class="container">
    <view class="flex-item">
      <u-button
        type="primary"
        shape="square"
        plain
        @click="Login()"
        open-type="getUserInfo"
        >微信一键登录
      </u-button>
    </view>
  </view>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      local_user: {
        id: null,
        name: "",
        avatar: "",
        gender: "",
      },
    };
  },
  computed: {
    ...mapState({
      logined: (state) => state.login.logined,
      user: (state) => state.login.user,
    }),
  },
  methods: {
    ...mapMutations("login", {
      store_login: "login",
    }),
    Login: function () {
      var that = this;

      if (that.logined) {
        return;
      }
      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          // 获取用户信息
          uni.getUserInfo({
            provider: "weixin",
            success: function (infoRes) {
              that.local_user.name = infoRes.userInfo.nickName;
              that.local_user.gender = infoRes.userInfo.gender;
              that.local_user.avatar = infoRes.userInfo.avatarUrl;
              that.store_login(that.local_user);
              uni.showToast({
                title: "登录中",
                icon: "loading",
                mask: true,
              });
              uni.set;
              setTimeout(that.backToMine, 1000);
            },
            fail: function (res) {
              uni.showToast({
                title: "获取信息失败",
                icon: "loading",
                mask: true,
              });
            },
          });
        },
      });
    },
    backToMine() {
      uni.navigateBack({ delta: 1 });
    },
  },
};
</script>
<style>
.container {
  width: 750rpx;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.flex-item {
  width: 750rpx;
  width: 100%;
  height: 30vh;
}
</style>