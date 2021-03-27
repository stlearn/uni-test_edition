<!--suppress ALL -->
<template>
  <view class="container">
    <!--页面内容-->
    <view>
      <view class="title">
        <u-icon name="bookmark" color="#000000" size="40"></u-icon>标题:<u-input
          style="margin-left: 5vw"
          v-model="title"
          type="text"
          placeholder="请输入标题"
          maxlength="10"
        />
      </view>
      <view class="content">
        <view class="discription">
          <u-input
            height="15vh"
            v-model="description"
            type="textarea"
            placeholder="请输入对物品的描述~（100字以内）"
            maxlength="100"
            trim="true"
            auto-height="false"
            fixed="true"
          />
        </view>
        <view class="image">
          <u-upload
            width="12vh"
            height="12vh"
            :action="action"
            :file-list="fileList"
            max-count="3"
            autoupload="false"
            ref="uUpload"
            @on-success="uploadSuccess"
          >
          </u-upload>
        </view>
      </view>
      <view class="kind">
        <u-icon name="grid" color="#000000" size="40"></u-icon>分类
        <view class="right" @click="show=true" v-if="kind===null||kind===''">{{default_kind}}</view>
        <view class="right" style="margin-right: 10vw" @click="show=true" v-else>{{kind}}</view>
        <u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet>
      </view>
      <view class="line"></view>
      <view class="price">
        <u-icon name="rmb" color="#000000" size="40"></u-icon>价格
        <view class="right" @click="show_keyboard=true" v-if="price===null||price===''">{{default_price}}</view>
        <view class="right" style="color: red;margin-right: 10vw" @click="show_keyboard=true" v-else>￥{{price}}</view>
        <u-keyboard ref="uKeyboard" v-model="show_keyboard" :mask="false" :tooltip="false" @change="valChange" @backspace="backspace"></u-keyboard>
      </view>
      <view class="other">
        <u-button type="primary" @click="submit">发布</u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      //商品信息
      goods:{
        title:"",
        description:"",
        price:"",
        kind:"",
        images:new Array()
      },
      title: "",
      description: "",
      price:'',
      kind:'',
      images: new Array(),
      //分类变量
      show: false,
      default_kind:"请选择分类>",
      actionSheetList: [
        {
          text: "手机",
        },{
          text: "服饰",
        },
        {
          text: "家具",
        },{
          text: "日常用品",
        },
        {
          text: "玩具",
        }
      ],
      //存储照片
      action: "http://localhost:3000/upload",
      fileList: [],

      //价格控件控制
      show_keyboard:false,
      default_price:"请输入价格 >"
    };
  },
  methods: {
    // 点击actionSheet回调
    actionSheetCallback(index) {
      this.kind = this.actionSheetList[index].text;
    },
    //键盘
    // 按键被点击(点击退格键不会触发此事件)
    valChange(val) {
      // 将每次按键的值拼接到value变量中，注意+=写法
      let local = this.price;
      this.price += val;
      if(parseFloat(this.price)>99999999){
        uni.showToast({title:"不能大于99999999",icon:"none"});
        this.price = local;
      }
      if(this.price.length>10){
        uni.showToast({title:"长度不能大于10",icon:"none"});
        this.price = local;
      }
      console.log(this.price);
    },
    // 退格键被点击
    backspace() {
      // 删除value的最后一个字符
      if(this.price.length) this.price = this.price.substr(0, this.price.length - 1);
      console.log(this.price);
    },
    //上传成功的调用函数
    uploadSuccess(data, index, lists, name) {
      this.images.push(data);
      console.log("照片已添加"+data);
    },
    //提交以及验证函数
    submit(){
      uni.switchTab({url:'/pages/index/index'});
    }
  },
};
</script>

<style scoped>
.container {
  width: 750rpx;
  height: 100vh;
  background: #eceff1;
  display: flex;
  flex-direction: column;
}
.title {
  width: 750rpx;
  height: 8vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.content {
  width: 750rpx;
  height: 32vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.discription {
  width: 750rpx;
  height: 15vh;
  background: #ffffff;
  overflow: hidden;
}
.image {
  width: 750rpx;
  height: 15vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.kind {
  width: 750rpx;
  height: 8vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.line {
  width: 750rpx;
  height: 0.1vh;
  background: #000000;
}
.price {
  width: 750rpx;
  height: 8vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.other {
  width: 750rpx;
  height: 43.7vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.slot-btn {
  width: 14vh;
  height: 14vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(244, 245, 246);
  border-radius: 10rpx;
}

.slot-btn__hover {
  background-color: rgb(235, 236, 238);
}

.right{
  flex: 1;
  text-align: right;
  width: 300rpx;
}
</style>