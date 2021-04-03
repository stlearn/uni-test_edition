<!--我的页面的商品展示卡片-->
<!--suppress ALL -->
<template>
  <view class="contain" @click="toDetails">
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
        <u-image :src="goods.imageUrl" width="100%" height="100%"></u-image>
      </view>
      <view class="other">
        <view class="title">
          {{goods.name}}
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
    productId:Number,
    father:String,
    goodss:Object
  },
  mounted() {
    console.log(this.goodss);
    this.goods = this.goodss;
  },
  data(){
    return{
      id_:this.productId,
      goods:{
        id:"",
        title:"",
        description:"",
        price:"",
        images:new Array(),
        owner:{
          id:"",
          name:"",
          avatar:""
        }
      }
    }
  },
  methods:{
    down(){
      uni.showToast({title:"下架了"+this.goods.name+this.productId,icon:"none"});
    },
    changePrice(){
      uni.showToast({title:"修改了价格："+this.goods.name+this.productId,icon:"none"});
    },
    toDetails(){
      //收藏页才跳转
      console.log("点击")
      if(this.father=='favorites'){
        uni.navigateTo({url:"/pages/product/product?id="+this.id_,fail:(res)=>{
            console.log(res);
        }});
      }
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