/***
 * vuex module测试模块文件
 */
const state = ()=>({
    id:0,
    name:"高云飞",
    message:"",
    todo:[
      {name:"高云飞",age:22},
      {name:"王五",age:21},
      {name:"张三",age:34},
      {name:"李四",age:33}
    ]
})

const  mutations = {
    setMessage(state,str){
        state.message = str;
    },
    increment(state){
      state.id++;
    },
    decrement(state){
      state.id--;
    }
}

const getters = {
    getOld:(state,getters)=>{
      return getters.getOldThan(30)
    },
    getOldThan:state=>(age)=>{
      return state.todo.filter(todo=>todo.age>age)
    }
}
const actions = {
    
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}