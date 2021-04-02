<template >
  <view class="container">
    <!--              无网络提示-->
    <u-no-network></u-no-network>
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
import request from "../../api/request"
export default {
  data() {
    return {
      local_user: {
        token: null,
        name: "",
        avatar: "",
        gender: "",
        description: "",
        community:"",
        community_longitude:"",
        community_latitude:""
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
          // console.log(loginRes);
          // return;
          //获取用户信息
          uni.getUserInfo({
            provider: "weixin",
            success: function (infoRes) {
              that.local_user.name = infoRes.userInfo.nickName;
              that.local_user.gender = infoRes.userInfo.gender;
              that.local_user.avatar = infoRes.userInfo.avatarUrl;
              //请求后端返回id
              uni.request({
                url: Server.host + "/login",
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
                  //出现错误
                  if(!data.token){
                    return;
                  }
                  //返回表示首次登录，需要选择小区
                  console.log(data.up_location);
                  if(data.up_location){
                    that.local_user.token = data.token;
                    that.local_user.description = data.description;
                    uni.showModal({
                      title: '提示',
                      showCancel:false,
                      content: '请选择您的小区信息（尽量选择标准名称）',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定');
                          uni.chooseLocation({
                            type: "wgs84",
                            success:(res)=>{
                              that.local_user.community = res.name;
                              that.local_user.community_longitude = res.longitude;
                              that.local_user.community_latitude = res.latitude;
                              //存储登录状态到vuex
                              that.store_login(that.local_user);
                              //调用接口修改小区信息
                              request('POST','/user/updatelocation',
                                  {community:res.name,community_longitude:res.longitude,community_latitude:res.latitude});
                              console.log("更新位置信息");
                              console.log(that.local_user);

                              uni.showToast({
                                title: "选择成功",
                                icon: "success",
                                mask: true,
                              });
                              setTimeout(that.backToMine, 1000);
                            }
                          });
                        }
                      }
                    });
                  }else{
                    that.local_user.token = data.token;
                    that.local_user.description = data.user.description;
                    that.local_user.community = data.user.community;
                    that.local_user.community_longitude = data.user.community_longitude;
                    that.local_user.community_latitude = data.user.community_latitude;
                    console.log(that.local_user);
                    that.store_login(that.local_user);
                    uni.showToast({
                      title: "登录中",
                      icon: "loading",
                      mask: true,
                    });
                    setTimeout(that.backToMine, 1000);
                  }
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
  background: #eceff1;
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