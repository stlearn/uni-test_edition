<!--suppress ALL -->
<template>
  <view class="container">
    <!--              无网络提示-->
    <u-no-network></u-no-network>
    <product-card father="favorites" v-for="good in goods" :product-id="good.goods_id" :goodss="good" :key="index"></product-card>
  </view>
</template>
<script>
import productCard from "../../../components/mine/productCard";
import request from "../../../api/request";
export default {
  components:{
    productCard
  },
  created() {
    request('GET','/favorites/getfavorites',{}).then((res)=>{
      console.log(res);
      this.goods = res;
    });
  },
  data(){
    return{
      goods:Object
    }
  },
};
</script>
<style>
.container {
  width: 750rpx;
  min-height: 100vh;
  background: #eceff1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>