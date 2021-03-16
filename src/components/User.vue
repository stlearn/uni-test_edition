<template>
  <view class="container">
    <view class="header">
      <view class="header-item header-item-avator">
        <u-avatar :src="user.avatar" size="160" @click="logout"></u-avatar>
      </view>
      <view class="header-item header-item-other">
        <block v-if="logined">
          <text class="text">{{ user.name }}</text>
          <br />
          <u-button
            type="success"
            shape="square"
            plain
            @click="Login()"
            size="mini"
            >账户管理
          </u-button>
        </block>
        <block v-else>
          <text class="text">{{ default_name }}</text>
          <br />
          <u-button
            type="success"
            shape="square"
            plain
            @click="Login()"
            open-type="getUserInfo"
            size="mini"
            >登录
          </u-button>
        </block>
      </view>
    </view>
    <!-- <view class="content"> </view> -->
  </view>
  <!-- <view class="header">
      
    </view> -->
  <!-- <view class="buttun">
    </view> -->
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      default_name: "请点击登录",
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
      store_logout: "logout",
    }),
    Login: function () {
      var that = this;

      //登录状态下点击直接结束，每次点击，打印用户信息
      // console.log(that.local_user);
      // console.log("store:");
      // console.log(that.logined);
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
    logout: function () {
      this.store_logout();
    },
  },
};
</script>
<style>
.container {
  width: 750rpx;
  display: flex;
  flex-direction: column;
}
.header {
  width: 750rpx;
  height: 20vh;
  background-color: #6482e3;
  border-bottom-left-radius: 5vh;
  border-bottom-right-radius: 5vh;
  display: flex;
  flex-direction: row;
}
.content {
  width: 750rpx;
  height: 75vh;
  background-color: #6482e3;
  border-radius: 5vh;
}

.header-item {
  width: 20vw;
  flex-grow: 1;
  margin: 10px;
}
.header-item-avator {
  height: 15vh;
  background: #6482e3;
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-item-other {
  height: 15vh;
  background: #6482e3;
  flex-basis: 0;
  flex-grow: 3;
  align-self: center;
}
.buttun {
  margin-top: 10vh;
  text-align: center;
}
.text {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 20px;
  font-weight: bolder;
}
</style>