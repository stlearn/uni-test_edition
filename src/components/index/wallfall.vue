<template>
  <view>
    <u-waterfall v-model="flowList" ref="uWaterfall">
      <template v-slot:left="{leftList}">
        <view class="demo-warter" v-for="(item, index) in leftList" :key="index">
          <item-card :goods-id="item.goods_id" :img="item.imageUrl" :title="item.name" :owner="item.owner" :avatar="item.avatar" :price="item.price"></item-card>
        </view>
      </template>
      <template v-slot:right="{rightList}">
        <view class="demo-warter" v-for="(item, index) in rightList" :key="index">
          <item-card :goods-id="item.goods_id" :img="item.imageUrl" :title="item.name" :owner="item.owner" :avatar="item.avatar" :price="item.price"></item-card>
        </view>
      </template>
    </u-waterfall>
    <u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" :icon-type="loadIconType" :load-text="loadText" @loadmore="addData"></u-loadmore>
  </view>
</template>

<script>
import itemCard from "./itemCard";
import request from "../../api/request";
import {mapState} from "vuex";
export default {
  //根据props获取要展示的内容
  props:{
    //服务还是物品
    which:String,
    //附近还是小区
    location:String,
    //距离.小区的时候无效
    dis:Number,
    //排序方式
    sort:String,
    //物品类别
    kind:String,
  },
  components:{
    itemCard
  },
  data(){
    return{
      //经纬度信息
      longitude:Number,
      latitude:Number,
      //要展示的数据，后端请求来放里面
      list:new Array(),
      //存放数据展示的
      flowList: [],

      //数据总量(从后台获取)
      data_count:0,
      //当前已经加载的个数
      load_index:0,
      //每次点击加载加载的个数
      load_max:4,
      //模拟数据
      // list: [
      //   {
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },
      //   {
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },
      //   {
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },
      //   {
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },{
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },{
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },
      //   {
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },
      //   {
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },
      //   {
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   },{
      //     price: 35,
      //     title: '键盘',
      //     owner: 'NovemberSnow',
      //     avatar:'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJibET8hib64cbJVKVhkw6XEIIibcqbQrTJFYCGRyMHeYe9T0vHqYtGjGxbPLqVANC3GFzQYJkt3zc1A/132',
      //     image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1732669690,3813182348&fm=11&gp=0.jpg',
      //   }
      // ],
      //loadmode组件
      loadStatus: 'loadmore',
      loadIconType: 'flower',
      loadText: {
        loadmore: '点击加载更多',
        loading: '努力加载中',
        nomore: '实在没有了'
      }
    }
  },
  computed:{
    ...mapState({
      logined: (state) => state.login.logined,
      user: (state) => state.login.user,
      community:(state) => state.login.user.community,
    })
  },
  mounted() {
    console.log("挂载前加载");
    this.loaddata();

    //加载位置
    if(this.location=='附近'){
      var that= this;
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          that.longitude = res.longitude;
          that.latitude = res.latitude;
          that.loaddata();
        },
        fail:()=>{
          uni.showToast({title:"获取位置失败",icon:"none"});
        }
      });
    }
  },
  watch:{
    //监听距离的变化
    dis:{
      handler(){
        this.loaddata();
      }
    },
    user:{
      handler(){
        this.loaddata();
      }
    },
    community:{
      handler(){
        if(this.location=='小区'){
          this.loaddata();
        }
      }
    }
  },
  methods: {
    addData() {
      //数据加载完了
      if(this.load_index>=this.data_count){
        this.loadStatus='nomore';
        return;
      }

      //数据没加载完
      this.loadStatus='loading';
      //长度不够
      let length;
      if(this.data_count-this.load_index<this.load_max){
        length = this.data_count-this.load_index;
        this.load_index = this.data_count;
      }else{
        length = this.load_max;
        this.load_index += this.load_max;
      }

      //模拟加载数据
      for(let i = 0; i < length; i++) {
        //调用api获取数据(根据下标)

        // 先转成字符串再转成对象，避免数组对象引用导致数据混乱
        let item = JSON.parse(JSON.stringify(this.list[this.load_index-length+i]));
        item.id = this.$u.guid();
        this.flowList.push(item);
      };
      this.loadStatus = 'loadmore';
    },
    //加载数据
    loaddata() {
      //清空展示
      var that = this;
      //物品
      this.$refs.uWaterfall.clear();
      //先清空列表
      this.list.splice(0, this.list.length);
      //加载数据
      if (this.which == "goods") {
        request('GET', '/goods/getgoods', {
          location: this.location,
          kind: this.kind,
          community: this.user.community,
          distance: this.dis,
          longitude: this.longitude,
          latitude: this.latitude
        }).then((res) => {
          console.log(res);
          if (res != 'Not Found') {
            that.list.push(...res);
            that.data_count = res.length;
            that.load_index = 0;
            that.addData();
          }
        })
      } else { //服务

      }
    }
  },
}
</script>

<style lang="scss" scoped>
.demo-warter {
  border-radius: 8px;
  margin: 5px;
  background-color: #ffffff;
  padding: 8px;
  position: relative;
}
</style>