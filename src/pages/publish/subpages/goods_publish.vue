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
        <u-picker mode="selector" v-model="show"  :default-selector="[0]" :range="actionSheetList" @confirm="confirmKind"></u-picker>
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
import {kinds} from "../../../shared/kinds";
import publishGoods from "../../../api/publish/publish_goods"
import request from "../../../api/request";
export default {
  //加载数据
  mounted() {
    this.actionSheetList = kinds.getGoodsKinds('');
    console.log(this.actionSheetList);
  },
  data() {
    return {
      //防止提交按钮被多次点击
      click_count:0,
      //商品信息
      goods:{
        title:"",
        description:"",
        price:"",
        kind:"",
        images:new Array(),
        longitude:"",
        latitude:""
      },
      title: "",
      description: "",
      price:'',
      kind:'',
      images: new Array(),
      longitude:"",
      latitude:"",

      //分类变量
      show: false,
      default_kind:"请选择分类>",
      //mounted注入
      actionSheetList:null,
      //存储照片
      action: "http://localhost:3000/upload",
      fileList: [],

      //价格控件控制
      show_keyboard:false,
      default_price:"请输入价格 >",

    };
  },
  methods: {
    // 点击actionSheet回调
    confirmKind(index) {
      this.kind = this.actionSheetList[index[0]];
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

      //多次点击阻止
      if(this.click_count!==0){
        uni.showToast({title:"请勿连续点击提交",icon:"none"});
        return;
      }

      //表单验证
      if(this.title===''||this.title===null){
        uni.showToast({title:"请输入标题",icon:"none"});
        return;
      }
      if(this.description===''||this.description===null){
        uni.showToast({title:"请输入对商品的描述",icon:"none"});
        return;
      }
      if(this.images.length===0||this.images===null){
        uni.showToast({title:"请添加图片",icon:"none"});
        return;
      }
      if(this.price===''||this.price===null){
        uni.showToast({title:"请输入价格",icon:"none"});
        return;
      }
      if(this.kind===''||this.kind===null){
        uni.showToast({title:"请选择分类",icon:"none"});
        return;
      }
      this.goods.title = this.title;
      this.goods.description = this.description;
      this.goods.images = this.images;
      this.goods.price = this.price;
      this.goods.kind = this.kind;
      let that = this;

      //获取经纬度
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.goods.longitude = res.longitude;
          that.goods.latitude = res.latitude;

          //异步获取结果，并分析结果
          request('POST','/publish/addgoods',{data:that.goods}).then(
              (response)=>{
                console.log(response);
                that.click_count++;
                if(response.status===200){
                  //显示提示
                  uni.showToast({title:"发布成功",icon:"success"});
                  setTimeout(()=>{
                    //返回主页
                    uni.switchTab({url:'/pages/index/index'});
                  },2000);
                }else{
                  uni.showToast({title:"发布失败",icon:"none"});
                }
              }
          )
        },
        fail:(res)=>{
          uni.showToast({title:"请打开位置权限",icon:"none"});
        }
      });
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