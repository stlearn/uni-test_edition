<!--suppress ALL -->
<template>
  <view class="container">
    <!--              无网络提示-->
    <u-no-network></u-no-network>
    <product-card product-id="123" father="onsale"></product-card>
    <product-card product-id="123" father="onsale"></product-card>
    <product-card product-id="123" father="onsale"></product-card>
    <product-card product-id="123" father="onsale"></product-card>
    <product-card product-id="123" father="onsale"></product-card>
  </view>
</template>
<script>
import productCard from "../../../components/mine/productCard";
export default {
  components:{
    productCard
  }
};
</script>
<style>
.container {
  width: 750rpx;
  background: #eceff1;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>