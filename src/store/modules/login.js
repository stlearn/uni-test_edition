/***
 * vuex管理登录状态
 */
 const state = ()=>({
    logined:false,
    user:{
        token:"",  //唯一性区分，暂时用openID,后面会使用自己生产的账户
        name:"",   //微信id
        avatar:"",
        gender:"",
        description:"",
        community:"",
        community_longitude:"",
        community_latitude:""
    },
    default_user:{
        token:"",
        name:"",
        avatar:"",
        gender:"",
        description:"",
        community:"",
        community_longitude:"",
        community_latitude:""
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
    },
    updateCommunity(state,community){
        console.log("user---------------")
        console.log(community);
        state.user.community = community.community;
        state.user.community_latitude = community.community_latitude;
        state.user.community_longitude = community.community_longitude;
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