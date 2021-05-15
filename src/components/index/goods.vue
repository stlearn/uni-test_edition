<!--suppress ALL -->
<template>
  <view class="content">
    <view class="option">
      <view class="option_choose">
        <u-dropdown title-size="35">
          <u-dropdown-item
            v-model="options_value"
            :title="options_value"
            :options="options"
            @change="optionChange()"
          ></u-dropdown-item>
        </u-dropdown>
      </view>
      <view class="option_search">
        <u-search
          placeholder="请输入关键词"
          :show-action="true"
          action-text="搜索"
          :animation="true"
          maxlength="5"
          @search="search"
          @custom="search"
        ></u-search>
      </view>
    </view>
    <view class="tab">
      <view class="tab_tabs">
        <u-tabs-swiper ref="uTabs" :list="kinds" :current="current" @change="tabsChange" :is-scroll="true" swiperWidth="550"></u-tabs-swiper>
      </view>
      <view class="tab_switch">
        <u-dropdown title-size="25">
          <u-dropdown-item
              v-model="sort_value"
              :title="sort_value"
              :options="sort_options"
              @change="sortOptionChange()"
          ></u-dropdown-item>
        </u-dropdown>
      </view>
    </view>
    <block v-if="options_value==='小区'">
      <view class="main">
        <swiper class="swiper" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
          <swiper-item v-for="(item, index) in kinds" :key="index">
            <scroll-view scroll-y style="height: 76vh;width: 100%;" @scrolltolower="onreachBottom">
              <!--物品代码-->
<!--              无网络提示-->
              <u-no-network></u-no-network>
              <wallfall :dis="dis[dis_index].label" :location="options_value"
                        which="goods" :kind="kinds[index].name" :sort="sort_value" :search_key="search_keyword"></wallfall>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
    </block>
    <block v-if="options_value==='附近'">
      <view class="main">
        <view class="distance">
          <u-select :list="dis" v-model="show" @confirm="dis_confirm"></u-select>
          <view class="distance_text"><view class="distance_text_m" @click="show=true">{{dis[dis_index].label}}▾</view></view>
        </view>
        <swiper class="swiper_near" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
          <swiper-item v-for="(item, index) in kinds" :key="index">
            <scroll-view scroll-y style="height: 70vh;width: 100%;" @scrolltolower="onreachBottom">
              <!--物品代码-->
              <!--              无网络提示-->
              <u-no-network></u-no-network>
              <wallfall :dis="dis[dis_index].distance" :location="options_value"
                        which="goods" :kind="kinds[index].name" :sort="sort_value" :search_key="search_keyword"></wallfall>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
    </block>
  </view>
</template>
<script>
import wallfall from "./wallfall";
import {kinds as ki} from "../../shared/kinds"
export default {
  components:{
    wallfall
  },
  //加载数据
  mounted() {
    this.kinds.push({name:'全部'});
    this.kinds.push(...ki.getGoodsKinds('name'));
    console.log(this.kinds)
  },
  data() {
    return {
      //搜索框的变量
      search_keyword: "",

      //地方选择框的变量
      options_value: "小区",
      options: [
        {
          label: "小区",
          value: "小区",
        },
        {
          label: "附近",
          value: "附近",
        },
      ],

      //排序选择框的变量
      sort_value:"时间降序",
      sort_options: [
        {
          label: "时间降序",
          value: "时间降序",
        },
        {
          label: "时间升序",
          value: "时间升序",
        },
        {
          label: "价格降序",
          value: "价格降序",
        },
        {
          label: "价格升序",
          value: "价格升序",
        },
      ],

      //品类选择种类定义
      kinds:new Array(),
      current: 0, //种类栏
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的

      //距离定义部分
      dis:[
        {
          value:1,
          label:"500m内",
          distance:500
        },{
          value:2,
          label:"1km内",
          distance:1000
        },{
          value:3,
          label:"2km内",
          distance:2000
        },{
          value:4,
          label:"3km内",
          distance:3000
        },
        {
          value:5,
          label:"5km内",
          distance:5000
        },
        {
          value:6,
          label:"10km内",
          distance:10000
        }
      ],
      dis_index:0,
      show:false
    };
  },
  methods: {
    //处理选项卡改变的函数
    optionChange() {
      console.log(this.options_value);
    },
    //排序选项卡改变
    sortOptionChange(){
      console.log(this.sort_value);
    },
    //处理搜索事件value就是搜索字符串
    search(value) {
      this.search_keyword=value;
      console.log(this.search_keyword)
    },


    //种类部分代码
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    //scrollview到底加载更多
    onreachBottom(){
      console.log("view到底");
      //行不通 太卡了
      // this.$root.$emit('addRandomData');
      // console.log("调用成功");
    },

    //距离列选择器确定
    dis_confirm(v){
      this.dis_index = v[0].value-1;
      console.log(this.dis[this.dis_index].distance);
      //修改数据
    },
  },
};
</script>
<style scoped>
.content {
  width: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
}
.option {
  width: 750rpx;
  height: 8vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.option_choose {
  width: 150rpx;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.option_search {
  width: 600rpx;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tab{
  width: 750rpx;
  height: 8vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tab_tabs{
  width: 550rpx;
  height: 8vh;
}
.tab_switch{
  width: 200rpx;
  height: 8vh;
}
.main{
  width: 750rpx;
  height: 76vh;
}
.swiper{
  display: flex;
  height: 76vh;
}
.swiper_near{
  display: flex;
  height: 72vh;
}
.distance{
  display: flex;
  height: 4vh;
  width: 750rpx;
  display: flex;
  align-items: center;
  background: #ffffff;
}
.distance_text{
  width: 750rpx;
  height: 4vh;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.distance_text_m{
  width: 20vw;
  height: 4vh;
  background: #eceff1;
  border-radius: 1vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>