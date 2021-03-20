<template>
  <view>
    <view class="test"></view>

    <view class="test"></view>
    <u-button type="primary" shape="square" plain @click="test_get()"
      >get测试
    </u-button>
    <u-button type="primary" shape="square" plain @click="test_post()"
      >post测试
    </u-button>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      news: [],
      localMessage: "",
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
    test_get: function () {
      uni.request({
        url: "http://localhost:3000/public/test",
        data: { id: 1, name: "mike" },
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "GET",
        sslVerify: true,
        success: ({ data, statusCode, header }) => {
          console.log(data);
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
    test_post() {
      uni.request({
        url: "http://localhost:3000/user/login",
        data: {
          id: 1,
          name: "mike",
        },
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
        method: "POST",
        sslVerify: true,
        success: ({ data, statusCode, header }) => {
          console.log(data);
        },
        fail: (error) => {
          console.log(error);
        },
      });
    },
  },
  onLoad: function () {
    // uni.request({
    //   url: "https://unidemo.dcloud.net.cn/api/news",
    //   method: "GET",
    //   data: {},
    //   success: (res) => {
    //     console.log(res);
    //     this.news = res.data;
    //   },
    // });
  },
  onReachBottom: function () {
    console.log("到底了");
  },
  onPullDownRefresh: function () {
    console.log("顶部");
  },
};
</script>

<style>
.test {
  height: 10vh;
  width: 750rpx;
  background: #6482e3;
  font-size: 50px;
  text-align: center;
  color: red;
}
.map {
  width: 750px;
  height: 80vh;
}
.font {
  font-size: 140px;
  text-align: center;
  color: #fa001a;
}
.buttun {
  width: 40vw;
  height: 10vh;
  background-color: #a8ccf5;
  margin-bottom: 5vh;
  margin-top: 5vh;
}
</style>
