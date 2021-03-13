<template>
  <view>
    <view class="test"></view>
    <button class="buttun"  key="+" @click="increment"></button>
    <!-- write code here -->
    <view class="font">{{ id }}</view>

    <button class="buttun" @click="decrement"></button>
    <view class="test"></view>
    <!-- <view class="map"
      ><map
        enable-3D
        enable-satellite
        enable-traffic
        show-location
        style="width: 100%; height: 300px"
      ></map>
    </view> -->
    <!-- <view v-for="(i, index) in news" :key="index">{{ i.title }}</view> -->
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  components: {},
  data() {
    return {
      news: [],
    };
  },
  computed: {
    ...mapState(["id", "name"]),
    ...mapGetters(["getOld", "getOldThan"]),
  },
  methods: {
    ...mapMutations(["increment", "decrement"]),
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
  background: #7cc0f2;
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
