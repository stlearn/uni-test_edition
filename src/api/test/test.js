import Server from "../../config/config";
import store from '../../store/index.js'
import request from '../request'
export default ()=>{

    request('POST','/test',{id:1});
    // let token = store.getters['login/getCurrentUser'].token;
    
    // uni.request({
    //     url: Server.host+'/test',
    //     data: {
    //         id:store.getters['login/getCurrentUser'].token,
    //     },
    //     header: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         'X-Requested-With': 'XMLHttpRequest',
    //         'authorization': "Bearer " + token
    //     },
    //     method: 'GET',
    //     sslVerify: true,
    //     success: ({ data, statusCode, header }) => {
    //         console.log(data);
    //         console.log(statusCode);
    //     },
    //     fail: (error) => {}
    // })
}