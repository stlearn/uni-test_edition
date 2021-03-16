<template lang="">
<view>
  <user/>
  <!-- <view class="text">
    <navigator
      url="/pages/login/login"
      open-type="navigate"
      hover-class="navigator-hover"
    >
    登录页面
    </navigator>
  </view> -->
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
</style>