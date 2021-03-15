<template lang="">
<view class="container">
  <user/>
  <view class="text">
    <navigator
      url="/pages/login/login"
      open-type="navigate"
      hover-class="navigator-hover"
    >
    登录页面
    </navigator>
  </view>
</view>
</template>
<script>
import { mapState } from "vuex";
import user from "../../components/User";
export default {
  components: {
    user,
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
}
.avator {
  width: 750rpx;
  height: 200rpx;
  text-align: center;
  margin-top: 25vh;
}
.buttun {
  margin-top: 10vh;
  text-align: center;
}
.text {
  margin-top: 5vh;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-weight: bold;
  text-align: center;
  font-size: 20px;
}
</style>