export class kinds{
    static goods_kind=[
        '衣服',
        '日常用品',
        '手机',
        '电脑平板',
        '电器',
        '家具',
        '玩具',
        '零食',
        '图书',
        '交通工具',
        '电脑配件',
        '手机配件',
        '母婴用品',
        '奢侈品',
        '其他'
    ];
    static service_kind=[
        '家政',
        '教育培训',
        'IT服务',
        '维修',
        '带看孩童',
        '宠物寄养',
        '搬运',
        '用车',
        '其他'
    ];
    static getGoodsKinds=function(t){
        if(t===null||t===''){
            return this.goods_kind;
        }

        let res=new Array();

        if(t=='text'){
            for(let i=0;i<this.goods_kind.length;i++){
                res.push({text:this.goods_kind[i]});
            }
        }

        if(t=='name'){
            for(let i=0;i<this.goods_kind.length;i++){
                res.push({name:this.goods_kind[i]});
            }
        }

        return res;
    }
    static getServiceKinds=function(t){
        if(t===null||t===''){
            return this.service_kind;
        }

        let res=new Array();

        if(t=='text'){
            for(let i=0;i<this.service_kind.length;i++){
                res.push({text:this.service_kind[i]});
            }
        }

        if(t=='name'){
            for(let i=0;i<this.service_kind.length;i++){
                res.push({name:this.service_kind[i]});
            }
        }

        return res;
    }
}