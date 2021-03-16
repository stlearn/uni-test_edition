<template lang="">
<view class="contianer">
  <user/>
  <view class="content"> </view>
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
  display: flex;
  flex-direction: column;
}

.content {
  width: 750rpx;
  height: 75vh;
  background-color: #d3daf0;
  border-radius: 5vh;
}

.text {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 20px;
  font-weight: bolder;
}
</style>