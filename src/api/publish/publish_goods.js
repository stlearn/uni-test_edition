import request from '../request'

//没用
export default async (goods)=>{
    let response = await request('POST','/publish/addgoods',{data:goods});
    return response;
}