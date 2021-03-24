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
import Server from "../../config/config";
export default {
  data() {
    return {
      local_user: {
        id: null,
        name: "",
        avatar: "",
        gender: "",
        description: "",
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

      //已经登录，重复点击直接返回
      if (that.logined) {
        return;
      }

      uni.login({
        provider: "weixin",
        success: function (loginRes) {
          //获取用户信息
          uni.getUserInfo({
            provider: "weixin",
            success: function (infoRes) {
              that.local_user.name = infoRes.userInfo.nickName;
              that.local_user.gender = infoRes.userInfo.gender;
              that.local_user.avatar = infoRes.userInfo.avatarUrl;
              //请求后端返回id
              uni.request({
                url: Server.host + "/user/login",
                data: {
                  code: loginRes.code,
                  name: that.local_user.name,
                  avatar: that.local_user.avatar,
                  gender: that.local_user.gender,
                },
                header: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "X-Requested-With": "XMLHttpRequest",
                },
                method: "POST",
                success: ({ data, statusCode, header }) => {
                  console.log(data);
                  that.local_user.id = data.id;
                  that.local_user.description = data.description;
                  console.log(that.local_user);
                  that.store_login(that.local_user);
                  uni.showToast({
                    title: "登录中",
                    icon: "loading",
                    mask: true,
                  });
                  uni.set;
                  setTimeout(that.backToMine, 1000);
                },
                fail: (error) => {
                  console.log(error);
                  uni.showToast({
                    title: "获取信息失败",
                    icon: "loading",
                    mask: true,
                  });
                },
              });
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
    //登录成功回到页面：mine
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