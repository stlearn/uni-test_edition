<template>
  <view class="container">
    <view class="header">
      <view class="header_address" @click="getAddress()" v-if="address===''||address===null"><u-icon name="map" color="#ffffff" size="38"></u-icon>地址▾</view>
      <view class="header_address" @click="getAddress()" v-else ><u-icon name="map" color="#ffffff" size="38"></u-icon>{{address}}▾</view>
      <view class="header_tabs">
        <u-tabs
          :list="list"
          :is-scroll="false"
          :current="current"
          @change="change"
          font-size="40"
          bar-height="6"
          bar-width="60"
          active-color="#FFEB3B"
          inactive-color="#ffffff"
          bg-color="#82B1FF"
        ></u-tabs>
      </view>
    </view>
    <!--根据tab栏决定显示哪一个组件-->
    <rest v-if="current === 0"></rest>
    <service v-if="current === 1"></service>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import rest from "../../components/index/goods";
import service from "../../components/index/service";
export default {

  components: { rest, service },

  data() {
    return {
      list: [
        {
          name: "闲置",
        },
        {
          name: "服务",
        },
      ],
      current: 0,
      address:''
    };
  },

  computed: {
    message: {
      get() {
        return this.$store.state.test.message;
      },
      set(value) {
        this.$store.commit("test/setMessage", value);
      },
    },
    ...mapState({
      //message: (state) => state.test.message,
      id: (state) => state.test.id,
      name: (state) => state.test.name,
    }),
    ...mapGetters("test", ["getOld", "getOldThan"]),
  },

  methods: {
    ...mapMutations("test", ["increment", "decrement", "setMessage"]),
    change(index) {
      this.current = index;
    },
    getAddress(){
      let that=this;
      uni.chooseLocation({
        success: function (res) {
          console.log(res);
          that.address = res.name;
          console.log('位置名称：' + res.name);
          console.log('详细地址：' + res.address);
          console.log('纬度：' + res.latitude);
          console.log('经度：' + res.longitude);
        }
      });
    }
  },
  onPullDownRefresh: function () {
    console.log("顶部");
  },
};
</script>

<!--suppress CssInvalidPropertyValue -->
<style scoped>
.container {
  width: 750rpx;
  height: 100vh;
  background: #eceff1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header {
  width: 750rpx;
  height: 8vh;
  background: #82b1ff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom-left-radius: 2vh;
  border-bottom-right-radius: 2vh;
}
.header_address {
  width: 175rpx;
  height: 6vh;
  border-radius: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #ffffff;
  white-space: nowrap;
  overflow: auto;
}
.header_tabs {
  width: 400rpx;
}

.font {
  font-size: 140px;
  text-align: center;
  color: #fa001a;
}
.line {
  width: 730rpx;
  height: 0.2vh;
  background-color: #000000;
}
</style>
