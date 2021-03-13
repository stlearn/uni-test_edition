<template>
  <view>
    <view class="test" @click="increment"> + </view>

    <!-- write code here -->
    <view class="font">{{ id }}</view>

    <view class="test" @click="decrement"> - </view>
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
    uni.request({
      url: "https://unidemo.dcloud.net.cn/api/news",
      method: "GET",
      data: {},
      success: (res) => {
        console.log(res);
        this.news = res.data;
      },
    });
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
  background: rgb(41, 138, 141);
  font-size: 50px;
  text-align: center;
  color: red;
}
.map {
  width: 750px;
  height: 80vh;
}
.font {
  font-size: 50px;
  text-align: center;
  color: rgb(41, 138, 141);
}
</style>
