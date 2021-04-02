<!--suppress ALL -->
<template>
  <view class="container">
    <!--              无网络提示-->
    <u-no-network></u-no-network>
    <view class="images">
      <u-swiper :list="pictures" mode="number" indicator-pos="bottomRight" height="500"></u-swiper>
    </view>
    <view class="price" style="color: red;font-family: 'Helvetica Neue', Helvetica, sans-serif;font-size: 25px">￥{{goods.price}}</view>
    <view class="title" style="font-family: 'Helvetica Neue', Helvetica, sans-serif;font-size: 18px">{{goods.name}}</view>
    <view class="kind">分类:{{goods.kind}}</view>
    <view class="description">物品介绍:<br/>{{goods.description}}</view>
    <view class="under">
      <view class="check">
        <view class="seller">
          <view class="avatar">
            <u-image width="100%" height="100%" shape="circle" :src="owner.avatar"></u-image>
          </view>
          <view class="name">
            <view class="label">卖家:</view>
            <view class="nikename">{{owner.name}}</view>
          </view>
          <view class="collect">
            <u-icon name="star" color="#ff1744" size="50" v-if="collected===false" @click="collect"></u-icon>
            <u-icon name="star-fill" color="#ff1744" size="50" v-if="collected===true" @click="uncollect"></u-icon>
          </view>
        </view>
        <view class="option">
          <view class="talk" @click="talk">联系卖家</view>
          <view class="buy" @click="buy">购买</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import request from "../../api/request";
export default {
  onLoad(options){
    this.id = options.id;
    console.log(options.id);
    //加载数据
    request('GET','/goods/getgoodsdetail',{goods_id:this.id}).then((res)=>{
      this.goods=res.goods;
      this.pictures=res.pictures;
      this.owner= res.owner;
    });

  },
  data(){
    return{
      //产品id,onLoad传入
      id:Number,

      //后台返回的数据
      goods:null,
      pictures:null,
      owner:null,

      //收藏
      collected:false,

      //测试模拟数据

    }
  },
  methods:{
    talk(){
      uni.showToast({title:"talk whith"+this.owner.id,icon:"none"});
    },
    buy(){
      uni.showToast({title:"买了"+this.goods.name,icon:"none"});
    },
    collect(){
      this.collected=true;
      uni.showToast({title:"收藏了"+this.goods.name,icon:"none"});
    },
    uncollect(){
      this.collected=false;
      uni.showToast({title:"取消收藏了"+this.goods.name,icon:"none"});
    }
  }
}
</script>

<style scoped>
.container {
  width: 750rpx;
  height: 100vh;
  background: #eceff1;
  display: flex;
  flex-direction: column;
}
.images{
  width: 750rpx;
  height: 500rpx;
  background: #ffffff;
}

.title{
  width: 750rpx;
  height: 7vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  margin-top: 1vh;
}
.price{
  width: 750rpx;
  height: 7vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  margin-top: 1vh;
}
.description{
  width: 750rpx;
  height: 20vh;
  background: #ffffff;
  margin-top: 1vh;
  overflow: auto;
}
.kind{
  width: 750rpx;
  height: 5vh;
  background: #ffffff;
  display: flex;
  align-items: center;
  margin-top: 1vh;
}
.under{
  width: 750rpx;
  height: 10vh;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.check{
  width: 750rpx;
  height: 10vh;
  background: #ffffff;
  /*border-top-right-radius: 3vh;*/
  /*border-top-left-radius: 3vh;*/
  display: flex;
  flex-direction: row;
  align-items: center;
}
.seller{
  width: 400rpx;
  height: 10vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.option{
  width: 350rpx;
  height: 10vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-weight: bold;
}
.talk{
  width: 150rpx;
  height: 80rpx;
  background-color: #FFB74D;
  border-bottom-left-radius: 25rpx;
  border-top-left-radius: 25rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.buy{
  width: 150rpx;
  height: 80rpx;
  background-color: #1E88E5;
  border-bottom-right-radius: 25rpx;
  border-top-right-radius: 25rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.avatar{
  width: 100rpx;
  height: 100rpx;
  background: #ffffff;
}
.name{
  width: 220rpx;
  height: 10vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}
.label{
  width: 220rpx;
  height: 5vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  font-size: 13px;
}
.nikename{
  width: 220rpx;
  height: 5vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  font-size: 13px;
  white-space: nowrap;
  overflow: auto;
}
.collect{
  width: 80rpx;
  height: 10vh;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>