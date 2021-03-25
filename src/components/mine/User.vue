<template>
  <view class="header">
    <view class="header-item header-item-avator">
      <!-- mode="square" -->
      <u-avatar :src="user.avatar" size="140"></u-avatar>
    </view>
    <view class="header-item header-item-other">
      <block v-if="logined">
        <text class="text">{{ user.name }}</text>
        <br />
        <u-button type="error" shape="square" @click="logout" plain size="mini"
          >退出登录
        </u-button>
      </block>
      <block v-else>
        <text class="text">{{ default_name }}</text>
        <br />
        <u-button
          type="primary"
          shape="square"
          plain
          @click="Login()"
          size="mini"
          >登录
        </u-button>
      </block>
    </view>
  </view>
</template>
<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      default_name: "请点击登录",
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
      store_logout: "logout",
    }),
    Login: function () {
      if (this.logined) {
        return;
      }
      uni.navigateTo({ url: "/pages/login/login" });
    },
    logout: function () {
      this.store_logout();
    },
  },
};
</script>
<style>
.header {
  width: 750rpx;
  height: 20vh;
  background-color: #82b1ff;
  border-bottom-left-radius: 2vh;
  border-bottom-right-radius: 2vh;
  display: flex;
  flex-direction: row;
}
.content {
  width: 750rpx;
  height: 75vh;
  border-radius: 5vh;
}

.header-item {
  width: 20vw;
  flex-grow: 1;
  margin: 10px;
}
.header-item-avator {
  height: 15vh;
  flex-basis: 0;
  flex-grow: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.header-item-other {
  height: 15vh;
  flex-basis: 0;
  flex-grow: 3;
  align-self: center;
}
.text {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 20px;
  font-weight: bolder;
}
</style>