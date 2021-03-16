import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import login from "./modules/login"

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    //测试模块引入，使用时可以删除
    test,
    login
  },
  strict:process.env.NODE_ENV !== 'production'
})
