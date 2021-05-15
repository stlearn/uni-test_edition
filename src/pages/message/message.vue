<!--suppress ALL -->
<template>
  <view class="container">
    <message-card v-for="i in messages" :key="i" :message="i.message" :message_count="i.count" :avatar="i.avatar" @click.native="cli(i.sender)"></message-card>
  </view>
</template>

<script>
import getTestRes from "../../api/test/test";
import messageCard from "../../components/message/messageCard";
import request from "../../api/request";
import {mapState} from "vuex";
export default {
  components:{
    messageCard
  },
  computed:{
    ...mapState({
      logined: (state) => state.login.logined,
      user: (state) => state.login.user,
      community:(state) => state.login.user.community,
    })
  },
  data(){
    return{
      messages:[],
      flag:0
    }
  },
  onShow:function(){
    if(this.logined){
      this.getCount()
    }else{
      uni.showToast({title:"请先登录",icon:'loading'})
    }
  },
  methods:{
    getCount(){
      request('GET', '/getmessagecount', {})
          .then((res) => {
            this.messages = res;
            if(this.flag>0){
              this.messages[0].count = 0;
            }
            this.flag = this.flag+1;
            let count = 0;
            for(let m of this.messages){
              count = count+m.count;
              console.log(m)
            }
            wx.setTabBarBadge({
              index:2,
              text:`${count}`
            });
          });
      // setTimeout(this.getCount,10000)
    },
    cli(sender){
      this.messages[0].count = 0;
      uni.navigateTo({url:`/pages/message/talk?sender=${sender}`});
    }
  }
};
</script>
<style>
.container {
  width: 750rpx;
  height: 100vh;
  background: #eceff1;
}
</style>