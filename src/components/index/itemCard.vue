<!--suppress ALL -->
<template>
<view class="card" @click="toDetails">
  <u-lazy-load threshold="0" border-radius="10" :image="img" :index="index"></u-lazy-load>
  <view class="under">
    <view class="under_left">
      <view class="demo-title">
        {{title}}
      </view>
      <view class="demo-price">
        {{price}}元
      </view>
      <view class="demo-shop">
        {{owner}}
      </view>
    </view>
    <view class="under_right">
      <u-lazy-load threshold="0" border-radius="10" :image="avatar" :index="index"></u-lazy-load>
    </view>
  </view>
</view>
</template>

<script>
export default {
  mounted() {
  },
  props:{
    goodsId:Number,
    img:String,
    title:String,
    price:String,
    owner:String,
    avatar:String
  },
  data(){
    return{
      id_:this.goodsId
    }
  },
  methods:{
    toDetails(){
      uni.navigateTo({url:"../../pages/product/product?id="+this.id_});
    }
  }
}
</script>

<style lang="scss" scoped>
.card{

}
.under{
  display: flex;
  flex-direction: row;
}
.under_left{
  width:75%;
}
.under_right{
  width:25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.demo-title {
  font-size: 30rpx;
  margin-top: 5px;
  color: $u-main-color;
}

//noinspection CssInvalidPropertyValue
.demo-price {
  font-size: 30rpx;
  color: $u-type-error;
  margin-top: 5px;
}

.demo-shop {
  font-size: 22rpx;
  color: $u-tips-color;
  margin-top: 5px;
}
</style>