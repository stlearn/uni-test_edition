/***
 * vuex module测试模块文件
 */
 const state = ()=>({
    logined:false,
    user:{
        id:null,  //唯一性区分，暂时不用
        name:"",   //微信id
        avatar:"",
        gender:""
    },
    default_user:{
        id:null,
        name:"",
        avatar:"",
        gender:""
    }
})

const  mutations = {
    login(state,user){
        state.logined=true;
        state.user = user;
    },
    logout(state){
        state.logined=false;
        state.user = state.default_user;
    }
}

const getters = {
    getCurrentUser:state=>{
        return state.user;
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