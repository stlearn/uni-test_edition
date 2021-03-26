<template>
  <view>
    瀑布流<br/>{{which}}---{{location}}---{{dis}}--{{sort}}--{{kind}}
  </view>
</template>

<script>
export default {
  //根据props获取要展示的内容
  props:{
    //服务还是物品
    which:String,
    //附近还是小区
    location:String,
    //距离.小区的时候无效
    dis:String,
    //排序方式
    sort:String,
    //物品类别
    kind:String
  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>

</style>