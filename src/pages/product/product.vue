<!--suppress ALL -->
<template>
  <view class="container">
    <view class="images">
      <u-swiper :list="goods.images" mode="number" indicator-pos="bottomRight" height="500"></u-swiper>
    </view>
    <view class="price" style="color: red;font-family: 'Helvetica Neue', Helvetica, sans-serif;font-size: 25px">￥{{goods.price}}</view>
    <view class="title" style="font-family: 'Helvetica Neue', Helvetica, sans-serif;font-size: 18px">{{goods.title}}</view>
    <view class="kind">分类:{{goods.kind}}</view>
    <view class="description">物品介绍:<br/>{{goods.description}}</view>
    <view class="under">
      <view class="check">
        <view class="seller">
          <view class="avatar">
            <u-image width="100%" height="100%" shape="circle" :src="goods.owner.avatar"></u-image>
          </view>
          <view class="name">
            <view class="label">卖家:</view>
            <view class="nikename">{{goods.owner.name}}</view>
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
export default {
  data(){
    return{
      //产品id,onLoad传入
      id:Number,

      //商品信息，后台获取
      goods_:{
        title:"",
        description:"",
        price:"",
        kind:"",
        images:new Array(),
        ownerID:''
      },

      //收藏
      collected:false,

      //测试模拟数据
      goods:{
        title:"键盘",
        description: "这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！这是我的键盘，特别好！",
        price:"188.0",
        kind:"电脑配件",
        images: ["https://gss0.baidu.com/70cFfyinKgQFm2e88IuM_a/forum/w%3D580/sign=ab8d422bcf1349547e1ee86c664f92dd/5374b251f3deb48f79065b74f41f3a292cf578b8.jpg",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170829%2Fbe48d4659c614339a73766a642e5a554_th.png&refer=http%3A%2F%2Fimg.mp.sohu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619433557&t=b0a66e36e5b35335f5c3cc89e636eedc",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.alicdn.com%2Fbao%2Fuploaded%2Fi1%2FTB2AN0Nv_tYBeNjy1XdXXXXyVXa_%21%210-rate.jpg&refer=http%3A%2F%2Fimg.alicdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1619433611&t=8c3d6b12a62b9ef1687beb494fa013f8"],
        owner:{
          name:"骑猪上高速被拦了",
          avatar:"https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132"
        }
      }
    }
  },
  methods:{
    talk(){
      uni.showToast({title:"talk whith"+this.goods.owner.name,icon:"none"});
    },
    buy(){
      uni.showToast({title:"买了"+this.goods.title,icon:"none"});
    },
    collect(){
      this.collected=true;
      uni.showToast({title:"收藏了"+this.goods.title,icon:"none"});
    },
    uncollect(){
      this.collected=false;
      uni.showToast({title:"取消收藏了"+this.goods.title,icon:"none"});
    }
  },
  onLoad(options){
    this.id = options.id;
    console.log(options.id);
    //获取商品信息
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