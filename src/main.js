import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)

App.mpType = 'app'

const store = new Vuex.Store({
  state:{
    id:0,
    name:"高云飞",
    todo:[
      {name:"高云飞",age:22},
      {name:"王五",age:21},
      {name:"张三",age:34},
      {name:"李四",age:33}
    ]
  },
  mutations:{
    increment(state){
      state.id++;
    },
    decrement(state){
      state.id--;
    }
  },
  getters:{
    getOld:(state,getters)=>{
      return getters.getOldThan(30)
    },
    getOldThan:state=>(age)=>{
      return state.todo.filter(todo=>todo.age>age)
    }
  }
})

const app = new Vue({
  ...App,
  store:store
})
app.$mount()
