<template>
  <view class="container">
    <view class="header">
      <view class="header_address" @click="changeCommunity()" v-if="user.community===''||user.community===null"><u-icon name="map" color="#ffffff" size="38"></u-icon>地址▾</view>
      <view class="header_address" @click="changeCommunity()" v-else ><u-icon name="map" color="#ffffff" size="38"></u-icon>{{user.community}}▾</view>
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
import request from "../../api/request";
export default {

  components: { rest, service },

  onLoad(){
    console.log(this.user);
  },
  onShow(){
    this.$forceUpdate();
  },
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
      user: (state) => state.login.user,
      logined: (state) => state.login.logined
    }),
    ...mapGetters("test", ["getOld", "getOldThan"]),
  },

  methods: {
    ...mapMutations("test", ["increment", "decrement", "setMessage"]),
    ...mapMutations("login",['updateCommunity']),

    change(index) {
      this.current = index;
    },

    changeCommunity(){
      //未登录
      if(!this.logined){
        uni.showToast({title:"请先登录",icon:"none"});
        return;
      }
      var that = this;
      uni.showModal({
        title: '提示',
        content: '您确定要修改小区信息？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
            uni.chooseLocation({
              type: "wgs84",
              success:(res)=>{
                //修改vuex状态
                that.updateCommunity({community:res.name,community_longitude:res.longitude,community_latitude:res.latitude});
                //that.store_login(that.local_user);
                //调用接口修改小区信息
                request('POST','/user/updatelocation',
                    {community:res.name,community_longitude:res.longitude,community_latitude:res.latitude});
                console.log("更新位置信息");
                console.log(that.user);

                uni.showToast({
                  title: "选择成功",
                  icon: "success",
                  mask: true,
                });
              }
            });
          }
          if(res.cancel){
            return;
          }
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
