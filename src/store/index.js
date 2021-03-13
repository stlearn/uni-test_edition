import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
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
  },
  actions:{
    
  }
})
