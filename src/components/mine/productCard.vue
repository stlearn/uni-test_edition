<!--我的页面的商品展示卡片-->
<!--suppress ALL -->
<template>
  <view class="contain">
    <view class="header">
      <view class="avatar">
        <u-image :src="goods.owner.avatar" width="100%" height="100%" shape="circle"></u-image>
      </view>
      <view class="userId">
        {{goods.owner.name}}
      </view>
      <view class="status">待售</view>
    </view>
    <view class="content">
      <view class="image">
        <u-image :src="goods.images[0]" width="100%" height="100%"></u-image>
      </view>
      <view class="other">
        <view class="title">
          {{goods.title}}
        </view>
        <view class="price" style="color: red;font-family: 'Helvetica Neue', Helvetica, sans-serif;font-size: 18px">
          ￥{{goods.price}}
        </view>
      </view>
    </view>
    <view class="line"></view>
    <view class="footer">
      <view class="talk" v-if="father=='onsale'" @click="changePrice">改价</view>
      <view class="talk" v-if="father=='onsale'" @click="down">下架</view>
    </view>
  </view>
</template>

<script>
export default {
  props:{
    //父组件传递
    productId:String,
    father:String
  },
  data(){
    return{
      // goods:{
      //   id:"",
      //   title:"",
      //   description:"",
      //   price:"",
      //   images:new Array(),
      //   owner:{
      //     id:"",
      //     name:"",
      //     avatar:""
      //   }
      // }
      //模拟数据
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
  mounted() {
    console.log(this.productId);
  },
  methods:{
    down(){
      uni.showToast({title:"下架了"+this.goods.title,icon:"none"});
    },
    changePrice(){
      uni.showToast({title:"修改了价格："+this.goods.title,icon:"none"});
    }
  }
}
</script>

<style scoped>
.contain {
  width: 710rpx;
  height: 30vh;
  border-radius: 3vh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  margin-top: 2vh;
}
.header{
  width: 710rpx;
  height: 6vh;
  margin-top: 2vh;
  border-radius: 3vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.avatar{
  width: 6vh;
  height: 6vh;
  margin-left: 4vw;
}
.userId{
  width: 50vw;
  height: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 3vw;
}
.status{
  width: 20vw;
  height: 6vh;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 3vw;
}
.content{
  width: 710rpx;
  height: 16vh;
  border-radius: 3vh;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.image{
  width: 14vh;
  height: 14vh;
  margin-left: 5vw;
}
.other{
  width: 14vh;
  height: 14vh;
  margin-right: 5vw;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.title{
  width: 50vw;
  height: 7vh;
  flex: 1;
}
.price{
  width: 50vw;
  height: 7vh;
  flex: 1;
  display: flex;
  align-items: flex-end;
}
.line{
  width: 690rpx;
  margin-left: 10rpx;
  height: 0.05vh;
  background: #000;
}
.footer{
  width: inherit;
  height: 5.9vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.talk{
  width: 16vw;
  height: 3vh;
  background: #FFC107;
  margin-right: 5vw;
  border-radius: 2vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>