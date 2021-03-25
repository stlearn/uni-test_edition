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
          v-model="search_keyword"
          :show-action="true"
          action-text="搜索"
          :animation="true"
          maxlength="5"
          @search="search"
          @custom="search"
        ></u-search>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      //搜索框的关键词
      search_keyword: "",
      //选择框的结果
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
    };
  },
  methods: {
    //处理选项卡改变的函数
    optionChange() {
      console.log(this.options_value);
    },
    //处理搜索事件value就是搜索字符串
    search(value) {
      console.log(value);
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
</style>