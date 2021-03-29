//自己封装的带token的request
import store from '../store/index.js'
import Server from "../config/config";

export default (method,url,data)=>{
    //获取token
    let token = store.getters['login/getCurrentUser'].token;

    //请求参数
    let DefaultOpts = {
		url: Server.host+url,
		data: data,
		method: method,
		header:  {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'authorization': "Bearer " + token
        },
        dataType: 'json',
	};

    let promise = new Promise((resolve, reject) => {
        uni.request(DefaultOpts).then(
            (res)=>{
                if(res[1].data.status=='401'){
                    uni.showToast({
						icon:'none',
					    title: '请先登录',
					    duration: 1500 
					}); 
                    return null;
                }
                resolve(res[1].data);
            }
        );
    });
    return promise;
}